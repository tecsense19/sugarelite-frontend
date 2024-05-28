
import React, { Suspense } from "react";
import Index from "@/components/subscribe/Index";
import Loader from "@/components/common/Loader";
import { get_user_action } from "@/app/lib/actions";
import { getAllStrings } from "@/app/lib/allStrings";

const Page = async () => {
    const user = await get_user_action();
    const allStrings = await getAllStrings();
    const STRIPE_TEST_KEY = process.env.STRIPE_TEST_KEY;

    if (user && allStrings?.success) {
        const subscriptions = [
            { name: `4 ${allStrings.data["string_weeks"]}`, value: "4week", key: process.env.STRIPE_4_WEEKS, amount: 116 },
            { name: `6 ${allStrings.data["string_weeks"]}`, value: "6week", key: process.env.STRIPE_6_WEEKS, amount: 156 },
            { name: `12 ${allStrings.data["string_weeks"]}`, value: "12week", key: process.env.STRIPE_12_WEEKS, amount: 228 },
        ]
        return (
            <Suspense fallback={<Loader />}>
                <Index subscriptions={subscriptions} STRIPE_TEST_KEY={STRIPE_TEST_KEY} userData={user[0]} allStrings={allStrings.data} />
            </Suspense>
        );
    } else {
        return <div className="h-dvh w-full bg-primary text-white flex justify-center items-center">
            Fetch failed
        </div>
    }
}

export default Page