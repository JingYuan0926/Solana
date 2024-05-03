import React, { useState, useEffect } from "react";
import { CollectionProfile, Filter, NFT, Title, Banner } from "../components";
import { useActiveAccount } from "thirdweb/react";
import { readContract, resolveMethod } from "thirdweb";
import { contract } from "../utils/constants";
import { ethers } from "ethers";

const Portfolio = () => {
  const [concerts, setConcerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState(null);

  const account = useActiveAccount();
  console.log(address);

  useEffect(() => {
    if (account) {
      setAddress(account.address);
    }
  }, [account]);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        if (address) {
          // Check if address is not null
          const data = await readContract({
            contract,
            method: resolveMethod("getConcertsByUser"),
            params: [address],
          });

          console.log(data);

          const formattedData = data.map((event) => ({
            ...event,
            date: new Date(parseInt(event.date, 10)).toLocaleDateString(),
            ticketPrice: ethers.formatEther(event.ticketPrice.toString()),
            ticketsSold: event.ticketsSold.toString(),
            totalSeats: event.totalSeats.toString(),
          }));

          setConcerts(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch concerts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (address) {
      fetchConcerts();
      
    }
  }, [address]); 

  return (
    <div className="bg-gray-100">
      <Banner />
      <CollectionProfile />
      <Title heading="NFT Collections" />
      <Filter />
      <NFT concerts={concerts} />
      <Title />
    </div>
  );
};

export default Portfolio;
