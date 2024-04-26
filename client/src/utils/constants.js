import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// create the client with your clientId, or secretKey if in a server environment
export const client = createThirdwebClient({ 
  clientId: import.meta.env.VITE_CLIENT_ID
 });

 const contractABI = [
  {
    "type": "constructor",
    "name": "",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "Approval",
    "inputs": [
      {
        "type": "address",
        "name": "owner",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "approved",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "tokenId",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ApprovalForAll",
    "inputs": [
      {
        "type": "address",
        "name": "owner",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "operator",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "bool",
        "name": "approved",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "BatchMetadataUpdate",
    "inputs": [
      {
        "type": "uint256",
        "name": "_fromTokenId",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_toTokenId",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ConcertCreated",
    "inputs": [
      {
        "type": "uint256",
        "name": "concertId",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "name",
        "indexed": false,
        "internalType": "string"
      },
      {
        "type": "address",
        "name": "organizer",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "MetadataUpdate",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TicketPurchased",
    "inputs": [
      {
        "type": "uint256",
        "name": "concertId",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "ticketHolder",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "ticketId",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Transfer",
    "inputs": [
      {
        "type": "address",
        "name": "from",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "to",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "tokenId",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "function",
    "name": "approve",
    "inputs": [
      {
        "type": "address",
        "name": "to",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [
      {
        "type": "address",
        "name": "owner",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "buyTicket",
    "inputs": [
      {
        "type": "uint256",
        "name": "_id",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "concerts",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "string",
        "name": "name",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "description",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "ticketPrice",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "date",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "totalSeats",
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "imageURI",
        "internalType": "string"
      },
      {
        "type": "address",
        "name": "organizer",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "ticketsSold",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "createConcert",
    "inputs": [
      {
        "type": "string",
        "name": "_name",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "_description",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "_ticketPrice",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_date",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_totalSeats",
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "_imageURI",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getApproved",
    "inputs": [
      {
        "type": "uint256",
        "name": "tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getConcerts",
    "inputs": [],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "",
        "components": [
          {
            "type": "string",
            "name": "name",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "description",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "ticketPrice",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "date",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "totalSeats",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "imageURI",
            "internalType": "string"
          },
          {
            "type": "address",
            "name": "organizer",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "ticketsSold",
            "internalType": "uint256"
          }
        ],
        "internalType": "struct TicketWave.Concert[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getConcertsByUser",
    "inputs": [
      {
        "type": "address",
        "name": "user",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "",
        "components": [
          {
            "type": "string",
            "name": "name",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "description",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "ticketPrice",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "date",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "totalSeats",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "imageURI",
            "internalType": "string"
          },
          {
            "type": "address",
            "name": "organizer",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "ticketsSold",
            "internalType": "uint256"
          }
        ],
        "internalType": "struct TicketWave.Concert[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isApprovedForAll",
    "inputs": [
      {
        "type": "address",
        "name": "owner",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "operator",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "name",
    "inputs": [],
    "outputs": [
      {
        "type": "string",
        "name": "",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "numberOfConcerts",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "ownerOf",
    "inputs": [
      {
        "type": "uint256",
        "name": "tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "safeTransferFrom",
    "inputs": [
      {
        "type": "address",
        "name": "from",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "to",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "safeTransferFrom",
    "inputs": [
      {
        "type": "address",
        "name": "from",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "to",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "tokenId",
        "internalType": "uint256"
      },
      {
        "type": "bytes",
        "name": "data",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setApprovalForAll",
    "inputs": [
      {
        "type": "address",
        "name": "operator",
        "internalType": "address"
      },
      {
        "type": "bool",
        "name": "approved",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "supportsInterface",
    "inputs": [
      {
        "type": "bytes4",
        "name": "interfaceId",
        "internalType": "bytes4"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "symbol",
    "inputs": [],
    "outputs": [
      {
        "type": "string",
        "name": "",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "tokenURI",
    "inputs": [
      {
        "type": "uint256",
        "name": "tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "string",
        "name": "",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transferFrom",
    "inputs": [
      {
        "type": "address",
        "name": "from",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "to",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
]
// connect to your contract
export const contract = getContract({ 
  client, 
  chain: defineChain(11155111), 
  address: "0x18e1b73Be43F2286c6ABA4CC75C73dDcFbDFe7A9",
  abi: contractABI
});

export const chain = defineChain(11155111);


