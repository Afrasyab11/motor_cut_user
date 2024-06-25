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
        "xs:w-[300px] mt-2  md:w-[400px] w-full 2xl:min-h-[40vh] 2xl:min-w-[40vh] flex flex-col  my-4 shadow-md bg-whitee p-4",
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
      <CardFooter className="flex flex-col mt-1">
        {showSocial && <Social socialBtnText={btnText} />}
        <p className=" text-sm text-center w-full py-3 text-mutedFields">
        {currentPage === "login"
          ? "Don't have an Account? "
          : "Already have an account? "}

        <button
          onClick={() =>
            router.push(
              currentPage === "login" ? "/auth/register" : "/auth/login"
            )
          }
        >
          {currentPage === "login" ? "Sign Up" : "Log in"}
        </button>
      </p>
      </CardFooter>

      
    </Card>
  );
};
