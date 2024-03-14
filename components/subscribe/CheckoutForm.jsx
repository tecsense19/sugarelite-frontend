import { stripe_action } from "@/app/lib/actions";
import { useStore } from "@/store/store";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ selectedPaymentObj, setIsModalOpen }) => {
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
                // console.log(token)
                let obj = {
                    "user_id": userState.id,
                    "price_id": selectedPaymentObj.key,
                    "stripe_token": token.id, // tok_visa For Testing Token
                    "plan_type": selectedPaymentObj.value, // 4week, 6week, 12week
                    "plan_price": selectedPaymentObj.amount
                }
                console.log("obj ::", obj);
                const res = await stripe_action(obj);
                console.log("res ::", res);
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="m-2 mt-4 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white w-full flex flex-col gap-6">
                {/* <label>Card details</label> */}
                <CardElement />
                <button type="submit" className="bg-secondary text-white py-2 rounded-[5px]">Pay</button>
            </form>
        </div>
    );
};

export default CheckoutForm;


