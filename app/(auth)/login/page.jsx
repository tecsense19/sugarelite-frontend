import { getAllStrings } from "@/app/lib/allStrings"
import AuthLoader from "@/components/common/AuthLoader"
import LoginIndex from "@/components/login/LoginIndex";
import { Suspense } from "react"

const Login = async () => {
  const allStrings = await getAllStrings();

  if (allStrings.success) {
    return (
      <>
        <Suspense fallback={<AuthLoader />}>
          <LoginIndex allStrings={allStrings.data} />
        </Suspense>
      </>
    )
  } else {
    return <>Fetch Failed</>
  }
}

export default Login