import React, { useState } from 'react';
import { Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, Typography, Box, Tabs, Tab } from "@mui/material";
import ColData from "../datafile/col.json";

const Pay = ({ eventData }) => {

  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [isBNPL, setIsBNPL] = useState('full');
  const ticketPrice = 0.01; // Assuming a single price for all tickets

  const handleQuantityChange = (change) => {
    setTicketQuantity((prevQuantity) => Math.max(0, prevQuantity + change));
  };

  const totalPrice = (ticketQuantity * ticketPrice).toFixed(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = React.useState(0);

  return (
    <div className="bg-white p-6 shadow-lg rounded mx-auto my-12" style={{ maxWidth: '950px', width: '100%', minHeight: '650px', borderRadius: '15px' }}>
      <Tabs value={value} onChange={handleChange} aria-label="event-details-payment-tab" centered>
        <Tab label="Ticket" />
        <Tab label="Collectibles" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {/* Ticket */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <img src={eventData.img} alt={eventData.title} style={{ height: '250px', marginRight: '20px', borderRadius: '10px' }} />
            <div>
              <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'Georgia, serif' }}>
                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{eventData.title}</span>
                <br /><br /><br /><br />
                <span style={{ fontSize: '16px' }}>Date: {eventData.date}</span><br />
                <span style={{ fontSize: '16px' }}>Venue: {eventData.venue}</span>
              </Typography>
            </div>
          </div>
          <p className="text-center my-2">{ticketPrice.toFixed(2)} SOL per Ticket</p>
          <div className="flex items-center justify-center mt-4">
            <Button variant="outlined" onClick={() => handleQuantityChange(-1)}>-</Button>
            <TextField value={ticketQuantity} type="text" inputProps={{ readOnly: true }} style={{ margin: '0 10px', maxWidth: '50px', textAlign: 'center' }} />
            <Button variant="outlined" onClick={() => handleQuantityChange(1)}>+</Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}> {/* Added a container with flex and space-between */}
            <p className="text-center my-2">Total: {totalPrice} SOL</p> {/* Total price */}
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="payment option"
                name="payment-option"
                value={isBNPL}
                onChange={(e) => setIsBNPL(e.target.value)}
              >
                <FormControlLabel value="full" control={<Radio />} label="Full Payment" />
                <FormControlLabel value="bnpl" control={<Radio />} label="Buy Now, Pay Later" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="flex justify-between mt-4">
            <button
              style={{
                backgroundColor: '#a99fec', // Green when connected, red otherwise
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px'
              }}
            >Buy Tickets</button>
          </div>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        {/* Collectibles */}
        <div style={{
          display: 'flex',
          flexDirection: 'column', // Changed to column to stack items vertically
          justifyContent: 'space-between', // Ensure content is spread out vertically
          height: '100%', // Ensure the container takes up full height to justify content
          width: '100%', // Full width of the container
          margin: '0 auto', // Center the container if it's smaller than its parent
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row', // Align children in a row
            justifyContent: 'space-around', // Distribute extra space evenly around elements
            alignItems: 'center', // Align items vertically
            overflowX: 'auto', // Allow horizontal scrolling if content overflows
          }}>
            {ColData.map((collectible) => (
              <div key={collectible.id} style={{
                margin: '10px', // Space around each image
              }}>
                <img src={collectible.img} alt={`Collectible ${collectible.id}`} style={{
                  width: '180px', // Uniform width for all images
                  height: '230px', // Uniform height for all images
                  objectFit: 'cover', // Cover the area, cropping if necessary
                  borderRadius: '15px'
                }} />
                {/* Collectible image displayed here */}
              </div>
            ))}
          </div>
          {/* New line of text below images */}
          <div style={{ textAlign: 'left', marginTop: '8px', color: 'grey' }}>
            <p>*When you purchase the collectible, it's randomly selected.</p>
          </div>
          {/* Button Container */}
          <div className="flex justify-end mt-40" style={{ width: '100%' }}>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-xl"
            >Buy Now</button>
          </div>
        </div>
      </TabPanel>




    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`event-details-payment-tabpanel-${index}`}
      aria-labelledby={`event-details-payment-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}


export default Pay;