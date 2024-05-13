import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "@/components/subscribe/CheckoutForm";
import { loadStripe } from '@stripe/stripe-js';


const StripeModal = ({ selectedPaymentObj, setIsModalOpen, STRIPE_TEST_KEY, user }) => {
  const stripePromise = loadStripe(STRIPE_TEST_KEY);
  return (
    <>
      {/* <div>StripeModal</div> */}
      <Elements stripe={stripePromise} >
        <CheckoutForm selectedPaymentObj={selectedPaymentObj} setIsModalOpen={setIsModalOpen} user={user} />
      </Elements>
    </>
  )
}

export default StripeModal