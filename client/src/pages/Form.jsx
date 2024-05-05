import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
const Form = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prevent any action if the Stripe.js has not fully loaded or if we are already submitting.
        if (!stripe || !elements || isSubmitting) {
            console.log('Stripe.js has not yet loaded or submission is in progress.');
            return;
        }

        setIsSubmitting(true); // Set the submitting state to true to prevent re-submission

        try {
            // Create the payment method from the card details entered by the user
            const cardElement = elements.getElement(CardElement);
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                throw new Error(`Payment error: ${error.message}`);
            }

            console.log('[PaymentMethod]', paymentMethod);

            // If payment method is created successfully, send its ID to the server
            const response = await fetch('http://localhost:3001/logPaymentInfo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentMethodId: paymentMethod.id })
            });

            if (!response.ok) {
                throw new Error('Failed to log payment info on the server.');
            }

            const data = await response.json(); // Parse the JSON data from the response
            console.log('Server response:', data);

            alert('Payment processed and logged successfully!');
        } catch (error) {
            console.error('Error during payment processing:', error);
            alert(error.message); // Provide feedback to the user about the failure
        } finally {
            setIsSubmitting(false); // Reset submission state regardless of the outcome
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || isSubmitting}>
                Pay
            </button>
        </form>
    );
};

export default Form;