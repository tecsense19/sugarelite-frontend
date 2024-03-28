import Loader from "@/components/common/Loader";
import Home from "@/components/home/Index";
import { Suspense } from "react";

const Page = () => {
  // const router = useRouter()
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    </>
  );
}

export default Page