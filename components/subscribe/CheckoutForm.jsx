import { search_profile_action, stripe_action } from "@/app/lib/actions";
import { client_notification, client_routes } from "@/app/lib/helpers";
import { useStore } from "@/store/store";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CryptoJS from "crypto-js"
import { setCookie } from "nookies"
import { Alert, notification } from "antd";

const CheckoutForm = ({ selectedPaymentObj, setIsModalOpen, user }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [showError, setShowError] = useState(false);
    const { dispatch } = useStore()

    const [api, contextHolder] = notification.useNotification();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setShowError(false);

        const cardElement = elements.getElement("card");

        try {
            const { token, error } = await stripe.createToken(cardElement, { address_city: "Kakinada", name: "Tester" },)
            setIsLoading(true)
            if (token) {
                // const res = await stripe_action({ user_id: user.id, stripe_token: token.id, price_id: process.env.STRIPE_12_WEEKS })
                // console.log(token)
                let obj = {
                    "user_id": user.id,
                    "price_id": selectedPaymentObj.key,
                    "stripe_token": token.id, // tok_visa For Testing Token
                    "plan_type": selectedPaymentObj.value, // 4week, 6week, 12week
                    "plan_price": selectedPaymentObj.amount
                }
                console.log("obj ::", obj);
                const res = await stripe_action(obj);
                if (res.success) {
                    const userRes = await search_profile_action(user.id)
                    // const token = CryptoJS.AES.encrypt(JSON.stringify(userRes.data[0]), "SecretKey").toString()
                    // setCookie(null, "user", token, { maxAge: 36000, secure: true, path: '/' })
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
            } else {
                setShowError(true);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    };

    return (
        <div className="m-2 mt-4 flex justify-center items-center">
            {contextHolder}
            <form onSubmit={handleSubmit} className="bg-white w-full flex flex-col gap-5">
                {/* {/ <label>Card details</label> /} */}
                <CardElement />
                {isLoading
                    ? <div className="bg-secondary text-white py-2 rounded-[5px] pointer-events-none">
                        <div className="loader"></div>
                    </div>
                    : <div className="w-full">
                        {showError
                            ? <Alert message={"Please enter correct details."} type="warning" showIcon className="!mt-0 !px-0 !bg-transparent !text-primary text-[16px] !border-0 !rounded-[5px]" />
                            : <></>
                        }
                        <button type="submit" className="bg-secondary w-full text-white py-2 rounded-[5px]">Pay</button>
                    </div>
                }
            </form>
        </div>
    );
};

export default CheckoutForm;


