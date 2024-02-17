import * as React from "react"
import { cn } from "@/lib/utils"
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-sm bg-primary-faded px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none  focus-visible:ring-slate-950 focus-visible:ring-offset-2  disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 border-b border-primary-dark",
        className
      )} 
      //focus-visible:ring-2 border-slate-200 border focus-visible:bg-primary-faded 
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"
export { Input }
