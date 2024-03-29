import { search_profile_action, stripe_action } from "@/app/lib/actions";
import { client_notification, client_routes } from "@/app/lib/helpers";
import { useStore } from "@/store/store";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CryptoJS from "crypto-js"
import { setCookie } from "nookies"
import { notification } from "antd";

const CheckoutForm = ({ selectedPaymentObj, setIsModalOpen }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const { state: { userState }, dispatch } = useStore()

    const [api, contextHolder] = notification.useNotification();

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        const cardElement = elements.getElement("card");

        try {
            const { token, error } = await stripe.createToken(cardElement, { address_city: "Kakinada", name: "Tester" },)
            setIsLoading(true)
            if (token) {
                // const res = await stripe_action({ user_id: userState.id, stripe_token: token.id, price_id: process.env.STRIPE_12_WEEKS })
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
                if (res.success) {
                    const userRes = await search_profile_action(userState.id)
                    const token = CryptoJS.AES.encrypt(JSON.stringify(userRes.data[0]), "SecretKey").toString()
                    setCookie(null, "user", token, { maxAge: 36000, secure: true, path: '/' })
                    client_notification(api, "topRight", "success", res.message, 2)
                    dispatch({ type: "Current_User", payload: userRes.data[0] })
                    setTimeout(() => {
                        setIsLoading(false)
                        navigate.push(client_routes.profile)
                    }, 2000);
                } else {
                    setIsLoading(false)
                }
                console.log("res ::", res);
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    };

    return (
        <div className="m-2 mt-4 flex justify-center items-center">
            {contextHolder}
            <form onSubmit={handleSubmit} className="bg-white w-full flex flex-col gap-6">
                {/* {/ <label>Card details</label> /} */}
                <CardElement />
                {isLoading
                    ? <div className="bg-secondary text-white py-2 rounded-[5px] pointer-events-none">
                        <div className="loader"></div>
                    </div>
                    : <button type="submit" className="bg-secondary text-white py-2 rounded-[5px]">Pay</button>
                }
            </form>
        </div>
    );
};

export default CheckoutForm;


