"use client"
import React from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "@/components/stripe/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_KEY);

const Page = () => {



    return (
        <Elements stripe={stripePromise} >
            <CheckoutForm />
        </Elements>
    );
}

export default Page