import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import Loader from "../components/Loader";
import PaymentForm from "../components/PaymentForm";

const CardPayment = () => {
    const [clientSecret, setClientSecret] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    const activeAccount = useActiveAccount();

    useEffect(() => {

        const fetchClientSecret = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/createPaymentIntent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ address: activeAccount.address })
                });
                const data = await response.json();
                setClientSecret(data.message.client_secret);
            } catch (error) {
                console.error("Failed to fetch client secret:", error);
            }
            setIsLoading(false);
        };
        fetchClientSecret();

    }, []);


    return (
        <div>
            {clientSecret && !isLoading ? (
                <Elements stripe={stripePromise} options={{
                    clientSecret: clientSecret,
                    appearance: { theme: "stripe" },
                }}>
                    <PaymentForm />
                </Elements>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default CardPayment;