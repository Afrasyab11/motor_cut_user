import React from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/store/user/userSlice";
import { useDispatch } from "react-redux";

export const LogoutInValidate = () => {
    const dispatch = useDispatch();
    
    const router = useRouter();
    const logoutOnValidate = () => {
        alert("thanks calling")
        dispatch(logoutUser());
    router.push("/auth/login");
  };
  return logoutOnValidate;
};
