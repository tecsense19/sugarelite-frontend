"use client"
import React, { Suspense } from "react";
import Index from "@/components/subscribe/Index";
import Loader from "@/components/common/Loader";

const Page = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Index />
        </Suspense>
    );
}

export default Page