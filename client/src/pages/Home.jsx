// Home.jsx in Project 2
import React, { useEffect, useState } from 'react'
import { EventCard, Slider } from '../components';
import { readContract, resolveMethod } from "thirdweb";
import { contract } from "../utils/constants";
import { ethers } from 'ethers';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // Assuming there's an API call
  const [events, setEvents] = useState([]);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await readContract({
          contract,
          method: resolveMethod("getConcerts"),
          params: []
        });
        const formattedData = data.map(event => ({
          ...event,
          //date: new Date(parseInt(event.date, 10)).toLocaleString(), for date and time
          date: new Date(parseInt(event.date, 10)).toLocaleDateString(),
          ticketPrice: ethers.formatEther(event.ticketPrice.toString()),
          ticketsSold: event.ticketsSold.toString(),
          totalSeats: event.totalSeats.toString()
        }));

        setEvents(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-gray-100">
      <Slider />
      {/* Pass isLoading and events as props */}
      <EventCard isLoading={isLoading} events={events} />
    </div>
  )
}

export default Home;
