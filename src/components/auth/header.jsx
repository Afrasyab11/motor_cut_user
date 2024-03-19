import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../../assets/images/cutting.png"

export const Header = ({
  headerText,
  label,
  headerPadding,
  headerLogo,
  progressBarCount,
}) => {
  return (
    <div className="w-full flex flex-col pb-3">
      {headerLogo ? (
        <div className="flex justify-between items-center">
          <h1
            className={cn(
              "text-4xl tracking-wider font-Montserrat",
              headerPadding
            )}
          >
            {headerText}
          </h1>
          <Image src={logo} width={70} height={70} alt="logo" priority={false}/>
        </div>
      ) : (
        <h1
          className={cn(
            "text-4xl tracking-wider font-Montserrat p-5 pl-0 headerTextSize",
            headerPadding,
            progressBarCount === "5" ? "text-3xl" : ""
          )}
        >
          {headerText}
        </h1>
      )}
      <div
        className={cn(
          "text-muted-foreground text-sm",
          headerPadding,
          progressBarCount === "4" ? "text-justify pr-7" : ""
        )}
      >
        {label}
      </div>
    </div>
  );
};
