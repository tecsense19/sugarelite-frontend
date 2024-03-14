import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "@/components/subscribe/CheckoutForm";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_KEY);

const StripeModal = ({ selectedPaymentObj, setIsModalOpen }) => {
  return (
    <>
      {/* <div>StripeModal</div> */}
      <Elements stripe={stripePromise} >
        <CheckoutForm selectedPaymentObj={selectedPaymentObj} setIsModalOpen={setIsModalOpen} />
      </Elements>
    </>
  )
}

export default StripeModal