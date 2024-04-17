import Loader from "@/components/common/Loader";
import Home from "@/components/home/Index";
import { Suspense } from "react";
import { decrypt_user } from "./lib/actions";

const Page = async () => {
  // const router = useRouter()
  const user = decrypt_user()
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Home user={user} />
      </Suspense>
    </>
  );
}

export default Page