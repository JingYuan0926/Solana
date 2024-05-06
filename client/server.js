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
            currency: 'myr',
            description: `${address}` ,
            //wechat,alipay,apple_pay,fpx
            payment_method_types: ["card","grabpay"],
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


app.post('/verifyPayment', async (req, res) => {
    const { paymentIntentId, description } = req.body;

    try {
        // Retrieve the payment intent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        console.log(paymentIntent);

        // Verify the payment status and metadata
        // Need to use metadata instead of description in the future but now for testing only
        if (paymentIntent.status === 'succeeded' && paymentIntent.metadata.address === description) {
            // Process successful payment here (e.g., update order status, notify user)
            res.json({ success: true, message: 'Payment verified successfully' });
        } else {
            // Handle errors or discrepancies
            throw new Error('Payment verification failed');
        }
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
