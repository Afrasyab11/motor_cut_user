"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { logoutUser } from "@/store/user/userSlice";
import { getCookie } from "cookies-next";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  // const { rememberMe} = useSelector((state) => state.user);
   const dispatch=useDispatch()
   const  router= useRouter()
  const isloggedIn=getCookie("token")
  const rememberMe=getCookie("rememberMe")
  console.log('>>>  : ', rememberMe);

  if(!isloggedIn){
    router.push("/")  }
    useEffect(() => {
      if (rememberMe=="false") {
        setTimeout(() => {
          dispatch(logoutUser());
          alert("Session timeout...!")
          router.push("/auth/login")
        }, 8000000);
      } 
    }, [rememberMe, dispatch,router]);
  
  return (
    <>
    <div className={cn("overflow-hidden",inter.className)}>
      {/* Include Header component */}
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className="grid grid-cols-12  overflow-clip ">
        {/* Display the sidebar only on xl screens */}
        <div className={`xl:block col-span-2 ${showSidebar ? "" : "hidden"}`}>
          <Sidebar showSidebar={showSidebar} />
        </div>
        {/* Adjust the column span based on screen size */}
        <div className="col-span-12 xl:col-span-10">
          {/* Main content */}
          <div className="p-5 relative xl:top-0 top-[70px] h-screen overflow-auto" >
            {children}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
