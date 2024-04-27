import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ isLoading, events }) => {
    const navigate = useNavigate();

    const handleLearnMore = (eventData) => {
        navigate(`/payment/${encodeURIComponent(eventData.name)}`, { state: eventData });
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold">Upcoming Events</h2>
                <div>
                    <button className="rounded-full border px-6 py-2 mr-6 text-lg bg-white">Concerts</button>
                    <button className="rounded-full border px-6 py-2 mr-6 text-lg bg-white">Sports</button>
                    <button className="rounded-full border px-6 py-2 text-lg bg-white">Festivals</button>
                </div>
            </div>
            <div className="flex flex-wrap justify-start -mx-2">
                {events.map((event, index) => (
                    <div key={index} className="px-4 mb-8 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform transition-all duration-300 ease-in-out hover:shadow-2xl">
                            <div className="w-full h-72 overflow-hidden">
                                {/* Use the imageURI from the event data */}
                                <img src={event.imageURI} alt={event.name} className="w-full h-full object-cover rounded-[15px]" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                                <p className="text-gray-600 mb-4">Price: {event.ticketPrice}ETH </p>
                                <p className="text-gray-600 mb-4">Concert Date: {event.date}</p>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                    onClick={() => handleLearnMore(event)}
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventCard;
