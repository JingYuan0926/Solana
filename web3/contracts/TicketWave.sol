// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract TicketWave is ERC721URIStorage {
    struct Concert {
        string name;
        string description;
        uint256 ticketPrice;
        uint256 date;
        uint256 totalSeats;
        string imageURI;
        address organizer;
        uint256 ticketsSold;
    }

    // Id mapping to all concert
    mapping(uint256 => Concert) public concerts;
    // Track total number of concert
    uint256 public numberOfConcerts = 0;
    // Used to assign a unique ID to each NFT
    uint256 private ticketIdCounter = 0;
    // Maps ticket ID to concert ID
    mapping(uint256 => uint256) private ticketToConcert;
    // Maps user address to list of ticket IDs
    mapping(address => uint256[]) private userTickets;

    event ConcertCreated(
        uint256 indexed concertId,
        string name,
        address indexed organizer
    );
    event TicketPurchased(
        uint256 indexed concertId,
        address indexed ticketHolder,
        uint256 ticketId
    );

    constructor() ERC721("TicketWave", "TW") {}

    function createConcert(
        string memory _name,
        string memory _description,
        uint256 _ticketPrice,
        uint256 _date,
        uint256 _totalSeats,
        string memory _imageURI
    ) public returns (uint256) {
        require(_date > block.timestamp, "Concert date must be in the future.");

        Concert storage concert = concerts[numberOfConcerts];
        concert.name = _name;
        concert.description = _description;
        concert.ticketPrice = _ticketPrice;
        concert.date = _date;
        concert.imageURI = _imageURI;
        concert.totalSeats = _totalSeats;
        concert.organizer = msg.sender;
        concert.ticketsSold = 0;

        emit ConcertCreated(numberOfConcerts, _name, msg.sender);

        numberOfConcerts++;
        return numberOfConcerts - 1;
    }

    function buyTicket(uint256 _id) public payable {
        Concert storage concert = concerts[_id];
        require(
            block.timestamp < concert.date,
            "Cannot buy tickets after the concert date."
        );
        require(
            msg.value >= concert.ticketPrice,
            "Payment must be equal to or greater than the ticket price."
        );
        require(
            concert.ticketsSold < concert.totalSeats,
            "All tickets have been sold."
        );

        uint256 ticketId = ticketIdCounter++;
        _safeMint(msg.sender, ticketId);
        _setTokenURI(ticketId, concert.imageURI);

        ticketToConcert[ticketId] = _id;
        userTickets[msg.sender].push(ticketId);

        concert.ticketsSold++;

        (bool sent, ) = payable(concert.organizer).call{value: msg.value}("");
        require(sent, "Failed to send money to organizer.");

        emit TicketPurchased(_id, msg.sender, ticketId);
    }

    function getConcerts() public view returns (Concert[] memory) {
        Concert[] memory allConcerts = new Concert[](numberOfConcerts);
        for (uint256 i = 0; i < numberOfConcerts; i++) {
            allConcerts[i] = concerts[i];
        }
        return allConcerts;
    }

    function getConcertsByUser(address user)
        public
        view
        returns (Concert[] memory)
    {
        uint256[] memory tickets = userTickets[user];
        Concert[] memory concertsByUser = new Concert[](tickets.length);

        for (uint256 i = 0; i < tickets.length; i++) {
            uint256 concertId = ticketToConcert[tickets[i]];
            concertsByUser[i] = concerts[concertId];
        }

        return concertsByUser;
    }
}
