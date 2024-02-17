"use client";
import Image from "next/image";
import { useState } from "react";

// import SignIn from "./SignIn";
// import SignUp from "./SignUp";
// import Search from "./Search";

export default function Header(props) {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="bg-white shadow fixed  xl:static left-0 top-0 right-0 h-[70px] w-full  xl:hidden flex justify-between items-center px-4 pr-4 z-10  dark:bg-black dark:border-b dark:border-b-dark-400">
      <a href="/">
        <Image alt="" src="/logo.png" height={200} width={200} className="rounded-lg" />
      </a>

      <div className="flex items-center justify-end">
        <button
          className="py-2 text-sm ml-2 text-black dark:text-white px-3 rounded-full block md:block lg:block xl:hidden"
          onClick={() => {
            props.setShowSidebar(!props.showSidebar);
          }}
        >
          {props.showSidebar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M3 9a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9zm0 6.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
