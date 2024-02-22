"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import { BackButton } from "./back-button";
import { FormProgressBar } from "./form-progress-bar";
import { Header } from "./header";
import { Social } from "./social";
import { useRouter } from "next/navigation";
export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  showProgressBar,
  btnText,
  headerText,
  headerLogo,
  className,
  progressBarCount,
  headerPadding,
  currentPage,
}) => {
  const router = useRouter();
  return (
    
    <Card
    className={cn(
      "xs:w-[300px]  md:w-[400px] overflow-y-visible my-4 shadow-md bg-whitee p-4",
      className
    )}
  >
      
      {showProgressBar && (
        <FormProgressBar stepCount={progressBarCount}></FormProgressBar>
      )}
      <CardHeader>
        <Header
          label={headerLabel}
          headerText={headerText}
          headerPadding={headerPadding}
          headerLogo={headerLogo}
          progressBarCount={progressBarCount}
        />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {/* <BackButton label={backButtonLabel} href={backButtonHref} /> */}
      {showSocial && (
        <CardFooter>
          <Social socialBtnText={btnText} />
        </CardFooter>
      )}

      <p className=" text-sm text-center w-full py-3 text-mutedFields">
        {currentPage === "login"
          ? "You Don't have an Account? "
          : "You already have an account? "}
        {/* <a href={currentPage === "login" ? {"/auth/register"} : "/auth/login"}>
          {currentPage === "login" ? "Sign Up" : "Log in"}
        </a> */}
        <button
          onClick={() =>
            router.push(
              currentPage === "login" ? "/auth/register" : "/auth/login"
            )
          }
        // className="text-blue-600 hover:underline"
        >
          {currentPage === "login" ? "Sign Up" : "Log in"}
        </button>
      </p>
    </Card>
  );
};
