// Payment.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Pay2 } from "../components"; // Import Pay component
import { useState } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Loader from "../components/Loader";
import { useActiveAccount } from "thirdweb/react";

const Payment = () => {
  // const [clientSecret, setClientSecret] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  //const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  //const activeAccount = useActiveAccount();
  const location = useLocation();
  const { state: eventData } = location;

  const { index } = eventData;

  console.log(index);

  // useEffect(() => {
  //   const fetchClientSecret = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch('/api/createPaymentIntent', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ activeAccount })
  //       });
  //       const data = await response.json();
  //       setClientSecret(data.message.client_secret);
  //     } catch (error) {
  //       console.error("Failed to fetch client secret:", error);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchClientSecret();
  // }, []);


  return (
    <div className="relative flex-grow bg-gray-100 flex flex-col justify-between">
      {/* style bg image*/}
      <div
        className="absolute top-0 w-full h-[50vh] bg-cover bg-center "
        style={{
          backgroundImage: `url(${eventData.imageURI})`,
          backgroundSize: 600,
          filter: "blur(13px)",
        }}
      ></div>

      <div className="pt-[45vh] container mx-auto px-4 flex-grow">
        <Box
          style={{
            position: "relative",
            marginTop: -200,
            marginBottom: "50px",
            display: "flex",
          }}
        >
          <img
            src={eventData.imageURI}
            alt={eventData.name}
            style={{
              height: "290px",
              marginRight: "20px",
              borderRadius: "10px",
              marginLeft: "20px",
            }}
          />
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              fontFamily: "Georgia, serif",
              color: "white",
              marginLeft: "20px",
            }}
          >
            <br />
            <span style={{ fontWeight: "bold", fontSize: "30px" }}>
              {eventData.name}
            </span>
            <br />
            <span style={{ fontWeight: "bold", fontSize: "30px" }}>
              in {eventData.venue}
            </span>
            <br />
            <br />
            <span style={{ fontSize: "20px" }}>#{eventData.genre}</span>
            <br />
          </Typography>
        </Box>

        {/* {clientSecret && !isLoading ? (
          <Elements stripe={stripePromise} options={{
            clientSecret: clientSecret,
            appearance: { theme: "stripe" },
          }}>
            <Pay2 eventData={eventData} index={index} />
          </Elements>
        ) : (
          <Loader />
        )} */}

        <Pay2 eventData={eventData} index={index} />
      </div>
    </div>
  );
};

export default Payment;


