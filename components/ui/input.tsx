import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-2xl border-2 border-teal-300 bg-gradient-to-r from-cyan-50 to-teal-50 px-3 py-1 text-sm",
          "text-green-600", 
          "placeholder:text-teal-400 placeholder:italic",
          "shadow-sm transition-all duration-300 ease-in-out",
          "focus:border-royal-blue-500 focus:ring-4 focus:ring-royal-blue-200 focus:ring-opacity-50 focus:outline-none",
          "hover:shadow-md hover:border-royal-blue-400",
          "disabled:bg-gray-100 disabled:text-black-500 disabled:border-gray-300 disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }