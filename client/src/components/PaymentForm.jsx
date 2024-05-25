import { CardElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';
const Form = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const activeAccount = useActiveAccount();


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || isSubmitting) {
            console.log('Stripe.js has not yet loaded or submission is in progress.');
            return;
        }


        setIsSubmitting(true);

        try {
            // Here, instead of creating a payment method, confirm the payment directly if needed
            const result = await stripe.confirmPayment({
                elements,
                redirect: 'if_required'
            });

            if (result.error) {
                throw new Error(`Payment error: ${result.error.message}`);
            } else {
                console.log('Payment successful', result.paymentIntent); // Log the paymentIntent or handle as needed
                await handlePaymentSuccess(result.paymentIntent);
                alert('Payment processed successfully!');
            }
        } catch (error) {
            console.error('Error during payment processing:', error);
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }

    };

    const handlePaymentSuccess = async (paymentIntent) => {
        console.log(paymentIntent.id, paymentIntent.status, paymentIntent.description)
        const response = await fetch('/api/verifyPayment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentIntentId: paymentIntent.id,
                status: paymentIntent.status,
                description: paymentIntent.description
            })
        });

        const verificationResult = await response.json();
        if (verificationResult.success) {
            console.log('Payment verified and processed successfully');
        } else {
            console.error('Payment verification failed', verificationResult.error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',  // This takes the full height of the viewport
            backgroundColor: '#f4f4f4'  // Light gray background
        }}>
            <div style={{
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',  // Adds subtle shadow
                borderRadius: '8px',  // Rounded corners
                backgroundColor: 'white',  // White background for the form area
                width: '100%',  // Responsive width up to a max width
                maxWidth: '400px'  // Maximum width of the form
            }}>
                <form onSubmit={handleSubmit}>
                    <PaymentElement />
                    <button type="submit" disabled={!stripe || isSubmitting} style={{
                        marginTop: '20px',  // Adds space above the button
                        width: '100%',  // Full width button
                        padding: '10px',  // Padding for better touch area
                        borderRadius: '5px',  // Rounded button corners
                        backgroundColor: '#0061f2',  // Brand color for button
                        color: 'white',  // Text color for the button
                        border: 'none',  // Removes default border
                        cursor: 'pointer',  // Cursor pointer on hover
                        fontSize: '16px'  // Larger font size for button text
                    }}>
                        Pay
                    </button>
                </form>
            </div>
        </div>
    );

};

export default Form;



// const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Prevent any action if the Stripe.js has not fully loaded or if we are already submitting.
//     if (!stripe || !elements || isSubmitting) {
//         console.log('Stripe.js has not yet loaded or submission is in progress.');
//         return;
//     }

//     setIsSubmitting(true); // Set the submitting state to true to prevent re-submission

//     try {
//         // Create the payment method from the card details entered by the user
//         const cardElement = elements.getElement(CardElement);
//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card: cardElement,
//         });

//         if (error) {
//             throw new Error(`Payment error: ${error.message}`);
//         }

//         console.log('[PaymentMethod]', paymentMethod);

//         // If payment method is created successfully, send its ID to the server
//         const response = await fetch('api/logPaymentInfo', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ paymentMethodId: paymentMethod.id })
//         });

//         if (!response.ok) {
//             throw new Error('Failed to log payment info on the server.');
//         }

//         const data = await response.json(); // Parse the JSON data from the response
//         console.log('Server response:', data);

//         alert('Payment processed and logged successfully!');
//     } catch (error) {
//         console.error('Error during payment processing:', error);
//         alert(error.message); // Provide feedback to the user about the failure
//     } finally {
//         setIsSubmitting(false); // Reset submission state regardless of the outcome
//     }
// };
