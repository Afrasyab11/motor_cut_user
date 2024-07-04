"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Logo from "../../public/logo.png";
import { Button } from "@/components/ui/button";
import { RxDashboard } from "react-icons/rx";
import { FaCarAlt } from "react-icons/fa";
import { PiListMagnifyingGlassBold } from "react-icons/pi";
import { IoImagesSharp } from "react-icons/io5";
import { MdUpload } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SupportTicketDialog } from "./modals/SupportTicketDialog";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/user/userSlice";
import { changeUserFirstTimeStatus, getUserFirstTimeStatus } from "@/store/user/userThunk";

// Dynamically import Joyride to ensure it only runs on the client
const Joyride = dynamic(() => import("react-joyride"), { ssr: false });

export default function Sidebar({ showSidebar, setShowSidebar }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const { user, firstTimeStatus } = useSelector((state) => state.user);
  console.log(firstTimeStatus, "firstTimeStatus"); // Log firstTimeStatus to debug
  const [activeLink, setActiveLink] = useState(0);
  const [run, setRun] = useState(false); // Initially don't run the Joyride
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    {
      target: ".step1",
      content: "You Can Upload Your Own Logo Here",
      disableBeacon: true,
    },
    {
      target: ".step2",
      content: "You can choose any Background Library from there",
      disableBeacon: true,
    },
    {
      target: ".step3",
      content: "You can select Half cut or Full cut from here",
      disableBeacon: true,
    },
  ];

  const categories = [
    {
      id: 1,
      icon: <RxDashboard size={20} />,
      name: "Dashboard",
      link: "/main/dashboard",
    },
    {
      id: 2,
      icon: <FaCarAlt size={20} />,
      name: "Create Advert",
      link: "/main/create-advert",
    },
    {
      id: 3,
      icon: <PiListMagnifyingGlassBold size={20} />,
      name: "Ad History",
      link: "/main/ad-history",
    },
    {
      id: 4,
      icon: <IoImagesSharp size={20} />,
      name: "Background Library",
      link: "/main/background-library",
    },
    {
      id: 5,
      icon: <MdUpload size={20} />,
      name: "Upload Logo",
      link: "/main/upload-logo",
    },
    {
      id: 6,
      icon: <BiSupport size={20} />,
      name: "Support Tickets",
      link: "",
    },
    {
      id: 7,
      icon: <FaUser size={20} />,
      name: "Account",
      link: "/main/account",
    },
  ];

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const logout = () => {
    dispatch(logoutUser());
    router.push("/auth/login");
  };

  const privacyChange = (name) => {
    if (name === "privacy") {
      router.push("/main/privacy-policy");
    } else {
      router.push("/main/terms-conditions");
    }
  };

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;
    const finishedStatuses = ["finished", "skipped", "close"];

    if (finishedStatuses.includes(status) || action === "close") {
      setRun(false);
      if (user?.UserId) {
        console.log("Updating user first-time status to false.");
        dispatch(changeUserFirstTimeStatus({ userId: user.UserId, status: false })); // Update the onboarding status once completed
      }
      return;
    }

    if (type === "step:after") {
      if (action === "next") {
        setStepIndex(index + 1);
      } else if (action === "prev") {
        setStepIndex(index - 1);
      }
    }
  };

  useEffect(() => {
    console.log("User effect running, checking user and firstTimeStatus:", user, firstTimeStatus);
    if (user?.UserId) {
      console.log(user?.UserId, "userId");
      dispatch(getUserFirstTimeStatus({ userId: user.UserId })).then((response) => {
        console.log("GetUserFirstTimeStatus response:", response);
        if (response.payload.detail === true) {
          console.log("Starting Joyride as user is a first-time visitor.");
          setRun(true); // Start Joyride if the user has not completed onboarding
        } else {
          console.log("User has already completed onboarding.");
        }
      });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (window.innerWidth < 1280) {
      setShowSidebar(true);
    }
  }, [setShowSidebar]);

  useEffect(() => {
    if (firstTimeStatus) {
      if (stepIndex === 0) {
        router.push("/main/upload-logo");
      } else if (stepIndex === 1) {
        router.push("/main/background-library");
      } else if (stepIndex === 2) {
        router.push("/main/create-advert");
      }
    }
  }, [stepIndex, router, firstTimeStatus]);

  return (
    <div
      className={`xl:h-[100vh] bg-site_secondary px-5 scrollbar-hide overflow-y-auto flex flex-col justify-between fixed top-[70px] right-0 bottom-0 xl:static gap-2 pt-5 pb-2 text-left border-r-slate-100 dark:bg-black dark:border-r-dark-400 transition duration-400 ease-in-out z-20 transform ${
        !showSidebar && "translate-x-full sm:translate-x-full xl:translate-x-0"
      }`}
    >
      <Joyride
        steps={steps}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        run={run}
        stepIndex={stepIndex}
        disableBeacon={true}
        styles={{
          options: {
            arrowColor: "#e3ffeb",
            backgroundColor: "#fff",
            overlayColor: "rgba(0, 0, 0, 0.2)",
            primaryColor: "#000",
            textColor: "#004a14",
            zIndex: 1000,
          },
        }}
        callback={handleJoyrideCallback}
      />
      <div className="h-fit overflow-y-scroll hide-scroll flex flex-col xl:gap-8 gap-4 ">
        <Image className="hidden xl:block" src={Logo} alt="" height={200} width={300} />
        {categories.map((category, index) =>
          category.name === "Support Tickets" ? (
            <div key={index}>
              <SupportTicketDialog name={category.name} icon={category.icon} />
            </div>
          ) : (
            <Link key={index} href={category.link}>
              <div
                className={`flex align-end rounded-xl pr-2 w-full items-center cursor-pointer hover:bg-light-100 dark:hover:bg-dark-400 text-dark-500 dark:text-white transition duration-200 ease-in-out ${
                  pathName === category?.link ? "text-primary-dark" : ""
                } ${category.name === "Upload Logo" ? "step1" : ""} ${category.name === "Background Library" ? "step2" : ""} ${
                  category.name === "Create Advert" ? "step3" : ""
                }`}
                onClick={() => handleLinkClick(index)}
              >
                <div className="p-[5px] rounded-xl w-8 h-8 grid place-items-center">
                  {category.icon}
                </div>
                <div className="text-[14px] font-medium pl-2">{category.name}</div>
              </div>
            </Link>
          )
        )}
      </div>
      <div className="mt-2">
        <div className="flex justify-center">
          <Button onClick={logout} variant="outline" className="w-3/6 lg:w-[200px] xl:w-[150px] 2xl:max-w-[200px] mb-2 rounded-full border-primary-dark">
            Log Out
          </Button>
        </div>
        <div className="flex justify-center gap-1 flex-wrap text-[10px] xl:text-[9px] 2xl:text-[13px]">
          <p
            className={`cursor-pointer hover:underline hover:font-semibold hover:text-primary-dark ${
              pathName === "/main/privacy-policy" ? "text-primary-dark" : ""
            }`}
            onClick={() => privacyChange("privacy")}
          >
            Privacy Policy
          </p>

          &amp;

          <p
            className={`cursor-pointer hover:underline hover:font-semibold hover:text-primary-dark ${
              pathName === "/main/terms-conditions" ? "text-primary-dark" : ""
            }`}
            onClick={() => privacyChange("terms")}
          >
            Terms and Conditions
          </p>
        </div>
      </div>
    </div>
  );
}
