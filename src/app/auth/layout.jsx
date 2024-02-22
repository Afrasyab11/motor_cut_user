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
      <div className="bg-primary h-full">
        <div className="flex items-center justify-center bg-primary font-Montserrat">{children}</div>
      </div>
    );
}

export default AuthLayout;