"use client";
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"

const AuthLayout = ({children} ) => {
    const  router= useRouter()
    const isloggedIn=getCookie("token")
    if(isloggedIn){
      router.push("/main/dashboard")
    }
    return (
      <div className="bg-primary flex items-center justify-center min-h-screen">
        <div className="flex items-centern justify-center font-Montserrat">{children}</div>
      </div>
    );
}

export default AuthLayout;