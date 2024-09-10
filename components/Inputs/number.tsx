import { cva } from "class-variance-authority"
import { InputHTMLAttributes } from "react"
import { cn } from "@/utils/index"
import ChevronDown from "@/assets/icons/chevrons/ChevronDown"
import ChevronUp from "@/assets/icons/chevrons/ChevronUp"

export type InputVariant = "default" | "outline" | "subtle" | "ghost"

const inputVariants = cva(
  "px-4 py-2 rounded-md relative font-regular peer transition-colors duration-150 disabled:text-neutral-100 disabled:placeholder:text-neutral-50 disabled:border-neutral-100 disabled:cursor-not-allowed active:outline-none focus:outline-none focus:ring-2 ring-offset-1 focus:ring-info-200 focus:ring-opacity-70 invalid:border-error-600",
  {
    variants: {
      variant: {
        default:
          "rounded border border-neutral-300 placeholder:text-neutral-300 bg-white",
        outline: "rounded border border-neutral-300 text-neutral-base bg-white",
        subtle:
          "rounded bg-neutral-50 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100",
        ghost:
          "rounded bg-transparent text-primary-base hover:bg-primary-50 dark:hover:bg-gray-900 dark:text-primary-400 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant: InputVariant
  stateRegister: string
  register: any
  labelClassName?: string
  containerClassName?: string
  label?: string
  increment: () => void
  decrement: () => void
}

export const InputNumber = ({
  id,
  label,
  placeholder,
  stateRegister,
  register,
  className,
  labelClassName,
  containerClassName,
  variant = "default",
  name,
  increment,
  decrement,
  required,
  disabled,
  ...props
}: InputProps) => {
  return (
    <div
      className={cn(
        "inline-flex flex-col-reverse items-start justify-center relative",
        containerClassName
      )}
    >
      <input
        id={id}
        type="number"
        name={name}
        placeholder={placeholder}
        {...register(stateRegister, {
          valueAsNumber: true,
          required,
          disabled
        })}
        className={cn(inputVariants({ variant, className }), "pr-8")}
        required={required}
        {...props}
      />
      <div className={cn("flex absolute flex-col items-center mt-4 right-2")}>
        <ChevronUp variant="medium" onClick={increment} />
        <ChevronDown variant="medium" onClick={decrement} />
      </div>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "font-semibold text-sm peer-invalid:text-error-600",
            labelClassName,
            disabled && "text-neutral-100"
          )}
        >
          {label}
        </label>
      )}
    </div>
  )
}
