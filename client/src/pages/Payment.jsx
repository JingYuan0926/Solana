// Payment.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import { Pay, Pay2 } from '../components'; // Import Pay component

const Payment = () => {
  const location = useLocation();
  const { state: eventData } = location;

  console.log(eventData);

  return (
    <div className="relative flex-grow bg-gray-100 flex flex-col justify-between">

      {/* style bg image*/}
      <div className="absolute top-0 w-full h-[50vh] bg-cover bg-center " style={{ backgroundImage: `url(${eventData.img})`, backgroundSize: 600, filter: 'blur(13px)' }}></div>


      <div className="pt-[45vh] container mx-auto px-4 flex-grow">
        <Box style={{ position: 'relative', marginTop: -200, marginBottom: '50px', display: 'flex' }}>
          <img src={eventData.img} alt={eventData.title} style={{ height: '290px', marginRight: '20px', borderRadius: '10px' }} />
          <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'Georgia, serif', color: 'white', marginLeft: '20px', }}>
            <br />
            <span style={{ fontWeight: 'bold', fontSize: '30px' }}>{eventData.title}</span><br />
            <span style={{ fontWeight: 'bold', fontSize: '30px' }}>in {eventData.venue}</span><br /><br/>
            <span style={{ fontSize: '20px' }}>#{eventData.genre}</span><br />
          </Typography>
        </Box>
        <Pay2 eventData={eventData} />
      </div>
    </div>
  );
};

export default Payment
