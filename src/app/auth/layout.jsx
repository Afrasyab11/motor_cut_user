"use client";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import ThreeAnimation from "@/components/threeJsAnimation/ThreeAnimation";
const AuthLayout = ({ children }) => {
  const router = useRouter();
  const isloggedIn = getCookie("token");
  if (isloggedIn) {
    router.push("/main/dashboard");
  }

  return (
    <ThreeAnimation>
      <div className="mx-2 flex items-center justify-center min-h-screen font-Montserrat">
        {children}
      </div>
    </ThreeAnimation>
  );
};

export default AuthLayout;
