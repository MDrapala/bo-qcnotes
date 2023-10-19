import { cva, VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/utils/tailwindMerge"
import Cross from "@/assets/icons/Cross"
import Database from "@/assets/icons/Database"
import EditBorder from "@/assets/icons/EditBorder"
import Loader from "@/assets/icons/Loader"
import Mail from "@/assets/icons/Mail"
import More from "@/assets/icons/More"
import Save from "@/assets/icons/Save"
import ServerIndex from "@/assets/icons/ServerIndex"
import Trash from "@/assets/icons/Trash"
import Check from "@/assets/icons/Validate"

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "subtle"
  | "ghost"
  | "fade"
  | "fadeBold"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
  {
    variants: {
      variant: {
        default:
          "bg-primary-base text-white hover:bg-primary-600 dark:bg-primary-400 dark:hover:bg-primary-600 dark:text-white",
        destructive:
          "bg-red-base text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-transparent text-primary-base border border-primary-base hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900 dark:hover:text-primary-400",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
        ghost:
          "bg-transparent text-primary-base hover:bg-primary-50 dark:hover:bg-gray-900 dark:text-primary-400 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        fade: "bg-transparent text-primary-base bg-primary-30 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900 dark:hover:text-primary-400",
        fadeBold:
          "bg-transparent text-primary-base bg-primary-30 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900 dark:hover:text-primary-400"
      },
      size: {
        default: "py-2 px-4 text-md",
        sm: "h-9 px-2 rounded-md text-sm",
        lg: "h-11 px-8 rounded-md text-xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    status?:
      | "LOADING"
      | "IDLE"
      | "EDIT"
      | "CREATE"
      | "INVITE"
      | "DELETE"
      | "SAVE"
      | "DATABASE"
      | "SERVER_INDEX"
      | "SUCCESS"
      | "ERROR"
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      status = "IDLE",
      variant = "default",
      size = "default",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {status === "LOADING" && <Loader className="mr-2" />}
        {status === "EDIT" && (
          <EditBorder variant="medium" color="currentColor" className="mr-2" />
        )}
        {status === "CREATE" && (
          <More variant="medium" color="currentColor" className="mr-2" />
        )}
        {status === "SAVE" && (
          <Save variant="large" color="currentColor" className="mr-2" />
        )}
        {status === "DELETE" && (
          <Trash variant="large" color="currentColor" className="mr-2" />
        )}
        {status === "INVITE" && (
          <Mail variant="medium" color="currentColor" className="mr-2" />
        )}
        {status === "ERROR" && (
          <Cross variant="large" color="currentColor" className="mr-2" />
        )}
        {status === "SUCCESS" && (
          <Check variant="large" color="currentColor" className="mr-2" />
        )}
        {status === "DATABASE" && (
          <Database variant="large" color="currentColor" className="mr-2" />
        )}
        {status === "SERVER_INDEX" && (
          <ServerIndex variant="large" color="currentColor" className="mr-2" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
