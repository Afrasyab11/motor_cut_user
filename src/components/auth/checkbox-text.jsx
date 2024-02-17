"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export function CheckboxWithText({mainText,name, className, setCheckBoxValue, onChange, check}) {
  return (
    // <div className="flex items-center space-x-2">
    //   <Checkbox id={name} 
    //      checked={check} 
    //      onCheckedChange={onChange} 
    //    className="w-5 h-5" name={name}/>
    //   <label
    //     htmlFor={name}
    //     className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-4", className)}
    //   >
    //     {mainText}
    //   </label>
    // </div>
    <div className="flex items-center space-x-2 ">
    <input
      id={name}
      type="checkbox"
      className="w-5 h-5"
      name={name}
      checked={check} // Controlled component
      onChange={onChange} // Notify parent component of changes
    />
    <label
      htmlFor={name}
      className={`text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-4 ${className}`}
    >
      {mainText}
    </label>
  </div>
  )
}
