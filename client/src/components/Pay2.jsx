import React, { useState } from 'react';
import { Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, Typography, Box, Tabs, Tab } from "@mui/material";
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import ColData from "../datafile/col.json";

const Pay2 = ({ eventData }) => {

    const [ticketQuantity, setTicketQuantity] = useState(0);
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
        <div>
            <Box sx={{ display: 'flex', flexGrow: 1, height: '100%', ml: -5 }}> {/* This box acts as the flex container */} {/* flexGrow: 1 allows this container to grow */}
                {/* Vertical Tabs */}
                <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} aria-label="vertical-tab" sx={{ borderRight: 1, borderColor: 'divider' }}>
                    <Tab label="Info" />
                    <Tab label="Ticket" />
                    <Tab label="Collectibles" />
                </Tabs>

                <Box sx={{ flexGrow: 1 }}> {/* This box will contain all the TabPanel components and should grow to fill the remaining space */}
                    {/* Event details */}
                    <TabPanel value={value} index={0}>

                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '-15px', marginBottom: '70px' }}>
                                <div>
                                    <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'Georgia, serif' }}>
                                        <EventOutlinedIcon sx={{ fontSize: 30, mr: 1 }} />
                                        <span style={{ fontSize: '20px' }}>{eventData.date}</span><br /><br />
                                        <PinDropOutlinedIcon sx={{ fontSize: 33, mr: 1 }} />
                                        <span style={{ fontSize: '20px' }}>{eventData.venue}</span><br />
                                    </Typography>
                                </div>
                            </div>
                            {/* seat photos */}
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '70px' }}>
                                <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'ui-rounded' }}>
                                    <ArrowRightRoundedIcon sx={{ fontSize: 60, ml: -2, mr: -1, mb: 0.4 }} />
                                    <span style={{ fontSize: '25px', fontWeight: 'bold' }}>Photos</span>
                                </Typography>
                            </div>
                            {/* more info */}
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '70px' }}>
                                <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'ui-rounded' }}>
                                    <ArrowRightRoundedIcon sx={{ fontSize: 60, ml: -2, mr: -1, mb: 0.4 }} />
                                    <span style={{ fontSize: '25px', fontWeight: 'bold' }}>Event Details</span><br />
                                    <FiberManualRecordRoundedIcon sx={{ fontSize: 12, mr: 1 }} /><span style={{ fontSize: '21px' }}>Date : 2 - 4 September 2023</span><br />
                                    <FiberManualRecordRoundedIcon sx={{ fontSize: 12, mr: 1 }} /><span style={{ fontSize: '21px' }}>Time: 6.30pm</span><br />
                                    <FiberManualRecordRoundedIcon sx={{ fontSize: 12, mr: 1 }} /><span style={{ fontSize: '21px' }}>Address: *detailed adress</span><br />


                                </Typography>
                            </div>
                            {/* ticket info */}
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '70px' }}>
                                <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'ui-rounded' }}>
                                    <ArrowRightRoundedIcon sx={{ fontSize: 60, ml: -2, mr: -1, mb: 0.4 }} />
                                    <span style={{ fontSize: '25px', fontWeight: 'bold' }}>Ticketing Information</span><br />
                                    <FiberManualRecordRoundedIcon sx={{ fontSize: 12, mr: 1 }} />
                                    <span style={{ fontSize: '20px' }}>Price : (VVIP) MYR949 / (VIP) MYR899 / (PS1) MYR799 / (PS2) MYR699 / (PS3) MYR599 / (PS4) MYR499 / (PS5) MYR399</span><br />
                                    <FiberManualRecordRoundedIcon sx={{ fontSize: 12, mr: 1 }} /><span style={{ fontSize: '21px' }}>Each transaction is limited up to 4 tickets only</span><br />
                                    <FiberManualRecordRoundedIcon sx={{ fontSize: 12, mr: 1 }} /><span style={{ fontSize: '21px' }}>All seats are numbered</span><br />
                                    <FiberManualRecordRoundedIcon sx={{ fontSize: 12, mr: 1 }} /><span style={{ fontSize: '21px' }}>We offer two payment options: Full payment and Buy Now, Pay Later.</span><br />
                                    <FiberManualRecordRoundedIcon sx={{ fontSize: 0, mr: 3 }} /><span style={{ fontSize: '19px' }}>* Buy Now, Pay Later - Choose installment plans of 2, 3 or 4 months.</span><br />

                                </Typography>
                            </div>

                        </div>
                    </TabPanel>
                    {/* Tickets */}
                    <TabPanel value={value} index={1}>
                        <p className="text-center my-2">RM {ticketPrice.toFixed(2)}</p>
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
                    </TabPanel>
                    {/* Collectibles */}
                    <TabPanel value={value} index={2}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column', // Changed to column to stack items vertically
                            justifyContent: 'space-between', // Ensure content is spread out vertically
                            height: '100%', // Ensure the container takes up full height to justify content
                            width: '100%', // Full width of the container
                            marginLeft: 17
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row', // Align children in a row
                                justifyContent: 'space-evenly', // Distribute extra space evenly around elements
                                alignItems: 'center', // Align items vertically
                                overflowX: 'auto', // Allow horizontal scrolling if content overflows
                            }}>
                                {ColData.map((collectible) => (
                                    <div key={collectible.id} style={{
                                        margin: '7px', // Space around each image
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
                </Box>
            </Box>
        </div>
    );
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


export default Pay2;