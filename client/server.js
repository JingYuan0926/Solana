// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from 'stripe';

dotenv.config();

const app = express();
const port = 3001;  // Default to port 3001 if not specified in .env
app.use(cors());              // Enable CORS for all routes
app.use(bodyParser.json());      // Parse JSON bodies

// Stripe configuration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10',  // Optional: specify API version
});

// POST endpoint to create a PaymentIntent
app.post('/createPaymentIntent', async (req, res) => {
    const { address } = req.body;
    console.log('Received address:', address);
    try {
        // Create a PaymentIntent with the specified amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000,
            currency: 'usd',
            description: 'Example payment',
            payment_method_types: ['card'],
            metadata: { address: address },
        });
        // console.log(`${paymentIntent.id}_secret_${paymentIntent.client_secret}`);

        // res.json({ message:`${paymentIntent.id}_secret_${paymentIntent.client_secret}` });
        console.log(paymentIntent);
        res.json({ message: paymentIntent });

    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).send({ error: error.message });
    }
});

// server.js
app.post('/logPaymentInfo', (req, res) => {
    const { paymentMethodId } = req.body;
    console.log('Received payment method ID:', paymentMethodId);

    // Additional logging or processing can be done here
    // For example, you could store these details in a database

    res.json({ message: 'Payment info logged successfully' });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
