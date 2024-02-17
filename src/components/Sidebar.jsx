"use client"
import Image from "next/image";
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
import { use, useState } from "react";
import { usePathname,useRouter } from "next/navigation";
import { SupportTicketDialog } from "./modals/SupportTicketDialog";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/user/userSlice";
export default function Sidebar(props) {
  const dispatch=useDispatch()
  const router=useRouter()
  const pathName = usePathname();
  const [activeLink, setActiveLink] = useState(0);
  const categories = [
    {
      id: 1,
      icon: <RxDashboard size={20} />,
      name: "DashBoard",
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
    // {
    //   id: 8,
    //   icon: <FaUser size={20} />,
    //   link: "/main/view-advert/:id",
    // },
  ];
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };
  const logout = () => {
     dispatch(logoutUser())
   router.push("/auth/login");
  };
  return (
    <div
      className={`xl:h-[100vh] h-[92vh] bg-site_secondary px-5 scrollbar-hide overflow-y-auto flex flex-col justify-between fixed top-[70px] right-0 bottom-0 xl:static gap-2 pt-5 pb-2 text-left border-r-slate-100 dark:bg-black dark:border-r-dark-400 transition duration-400 ease-in-out z-20 transform ${!props.showSidebar &&
        "translate-x-full sm:translate-x-full xl:translate-x-0"
        }`}
    >
      <div className="h-[60vh] flex flex-col lg:justify-between ">
        <Image src={Logo} alt=""  height={200} width={300}></Image> 
        {categories.map((category, index) => (
          category.name === "Support Tickets" ? (
            <div key={index}>
              <SupportTicketDialog
                key={index}
                name={category.name}
                icon={category.icon}
              />
            </div>
          ) : (
            <Link key={index} href={category.link}>
              <div className={`flex align-end rounded-xl pr-2 w-full items-center cursor-pointer hover:bg-light-100 dark:hover:bg-dark-400 text-dark-500 dark:text-white transition duration-200 ease-in-out ${pathName === category?.link ? "text-primary-dark" : ""}`} onClick={() => handleLinkClick(index)}>
                <div className="p-[5px] rounded-xl w-8 h-8 grid place-items-center">
                  {category.icon}
                </div>
                <div className="text-[14px] font-medium  pl-2">{category.name}</div>
              </div>
            </Link>
          )
        ))}
      </div>
      <div className="footer mt-2">
        <Button
          variant="outline"
          className="w-full mb-2 rounded-full border-primary-dark"
          onClick={logout}
        >
          Log Out
        </Button>
        <p className="text-[10px] ">
          Privacy Policy Cookies Term and condition
        </p>
      </div>
    </div>
  );
}
