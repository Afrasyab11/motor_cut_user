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
  const dispatch = useDispatch();
  const router = useRouter();
  const isloggedIn = getCookie("token");
  const rememberMe = getCookie("rememberMe");

  useEffect(() => {
    if (!isloggedIn) {
      router.push("/");
    }
  }, [isloggedIn]);

  useEffect(() => {
    if (rememberMe == "false") {
      setTimeout(() => {
        dispatch(logoutUser());
        alert("Session timeout...!");
        router.push("/auth/login");
      }, 8000000);
    }
  }, [rememberMe]);

  return (
    <div className={cn("overflow-hidden", inter.className)}>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="grid grid-cols-12">
        <div className={`xl:block col-span-2 ${showSidebar ? "" : "hidden"}`}>
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </div>
        <div className="col-span-12 xl:col-span-10">
          <div className="sm:p-1 sm:pt-20 md:p-5 relative xl:py-4 pt-20  h-screen overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
