
import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import sliderData from "../datafile/slider-data.json"; 

const Slider = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = sliderData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [activeStep, maxSteps]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  return (
    <Box sx={{ width: '100%', height: '60vh', position: 'relative', overflow: 'hidden', mt:0}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: `${100 * maxSteps}%`,
          transform: `translateX(-${activeStep * (100 / maxSteps)}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {sliderData.map((slide, index) => (
          <Box
            key={slide.id}
            sx={{
              width: `${100 / maxSteps}%`,
              height: '100%',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            <img
              src={slide.img}
              alt={slide.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Arrow and Pagination Controls */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '2%', // placement of arrows and dots
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        {/* Arrow left */}
        <Button size="small" onClick={handleBack} sx={{ marginRight: '1rem', color: 'white' }}>
          <KeyboardArrowLeft />
        </Button>
  
        {/* Pagination dots */}
        {sliderData.map((_, index) => (
          <span
            key={index}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: index === activeStep ? 'white' : 'rgba(255, 255, 255, 0.5)',
              margin: '0 4px',
              cursor: 'pointer',
            }}
            onClick={() => setActiveStep(index)}
          />
        ))}
  
        {/* Arrow right */}
        <Button size="small" onClick={handleNext} sx={{ marginLeft: '1rem', color: 'white' }}>
          <KeyboardArrowRight />
        </Button>
      </Box>
    </Box>
  );
};

export default Slider;