"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import { BackButton } from "./back-button";
import { FormProgressBar } from "./form-progress-bar";
import { Header } from "./header";
import { Social } from "./social";

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
  currentPage
}) => {
  return (
    <Card
      className={cn(
        "w-[300px] md:w-[400px] m-2 mt-10 mb-10 shadow-md bg-whitee p-4",
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

      <p className="font-bold text-sm text-center w-full py-3 text-mutedFields">
        {currentPage === "login"
          ? "You Don't have an Account? "
          : "You already have an account? "}
        <a href={currentPage === "login" ? "/auth/register" : "/auth/login"}>
          {currentPage === "login" ? "Sign Up" : "Log in"}
        </a>
      </p>

    </Card>
  );
};
