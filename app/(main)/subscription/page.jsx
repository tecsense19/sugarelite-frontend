
import React, { Suspense } from "react";
import Index from "@/components/subscribe/Index";
import Loader from "@/components/common/Loader";

const Page = () => {
    const subscriptions = [
        { name: "4 Weeks", value: "4week", key: process.env.STRIPE_4_WEEKS, amount: 116 },
        { name: "6 Weeks", value: "6week", key: process.env.STRIPE_6_WEEKS, amount: 156 },
        { name: "12 Weeks", value: "12week", key: process.env.STRIPE_12_WEEKS, amount: 228 },
    ]
    const STRIPE_TEST_KEY = process.env.STRIPE_TEST_KEY;
    return (
        <Suspense fallback={<Loader />}>
            <Index subscriptions={subscriptions} STRIPE_TEST_KEY={STRIPE_TEST_KEY} />
        </Suspense>
    );
}

export default Page