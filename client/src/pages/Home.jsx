// Home.jsx in Project 2
import React, { useEffect, useState } from 'react'
import { EventCard, Slider } from '../components';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // Assuming there's an API call
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(Data); // Replace this with your actual API call
      setIsLoading(false);
    }, 1000);
  }, []); // Empty dependency array means this effect runs once after the first render

  return (
    <div className="bg-gray-100">
      <Slider />
      {/* Pass isLoading and events as props */}
      <EventCard isLoading={isLoading} events={events} />
    </div>
  )
}

export default Home;
