import { stripe_action } from "@/app/lib/actions";
import { useStore } from "@/store/store";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { state: { userState } } = useStore()

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        const cardElement = elements.getElement("card");

        try {
            const { token, error } = await stripe.createToken(cardElement, { address_city: "Kakinada", name: "Tester" },)
            if (token) {
                // const res = await stripe_action({ user_id: userState.id, stripe_token: token.id, price_id: process.env.NEXT_PUBLIC_STRIPE_12_WEEKS })
                console.log(token)
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white w-[80%] flex flex-col gap-6">
                <label>Card details</label>
                <CardElement />
                <button type="submit">Pay</button>
            </form>
        </div>
    );
};

export default CheckoutForm;


