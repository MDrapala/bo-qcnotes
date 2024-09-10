import { cva } from "class-variance-authority"
import { InputHTMLAttributes, useState } from "react"
import { cn } from "@/utils/index"

export type InputVariant = "default" | "outline" | "subtle" | "ghost"

const inputVariants = cva("", {
  variants: {
    variant: {
      default:
        "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
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
})

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant: InputVariant
  stateRegister: string
  register: any
  labelClassName?: string
  containerClassName?: string
  label?: string
}

const FormRadio = ({
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
  value,
  required,
  disabled,
  ...props
}: InputProps) => {
  const [checked, setChecked] = useState(false)

  const handleLabelClick = () => {
    setChecked(true)
  }

  return (
    <div
      onClick={handleLabelClick}
      className={cn(
        "flex items-center w-auto gap-4 justify-between px-4 border border-gray-200 rounded dark:border-gray-700"
      )}
    >
      <label
        htmlFor={name}
        className="flex items-center justify-between gap-4 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
        <input
          id={id}
          type="radio"
          name={name}
          checked={checked}
          className={cn(inputVariants({ variant, className }))}
          value={value}
          {...register(stateRegister, {
            required,
            disabled
          })}
          {...props}
        />
      </label>
    </div>
  )
}

export default FormRadio
