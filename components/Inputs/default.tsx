import { cva, VariantProps } from "class-variance-authority"
import * as React from "react"
import ChevronDown from "@/assets/icons/chevrons/ChevronDown"
import ChevronUp from "@/assets/icons/chevrons/ChevronUp"
import Link from "@/assets/icons/Link"
import { cn } from "@/utils/tailwindMerge"

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

const redirect = (text?: string) => {
  window.open(text, "_blank")
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    variant: InputVariant
    stateRegister: string
    register: any
    urlRedirect?: string
    listTags?: string[]
    labelClassName?: string
    containerClassName?: string
    label?: string
    status?: "LOADING" | "IDLE" | "LINK" | "TAGS"
  }
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      status = "IDLE",
      label,
      placeholder,
      stateRegister,
      register,
      urlRedirect,
      listTags,
      className,
      labelClassName,
      containerClassName,
      variant = "default",
      type = "text",
      name,
      required,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // const [tags, setTags] = useState<string[]>(listTags || [])
    // const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //   if (event.key === "Tab" || event.key === " " || event.key === "Enter") {
    //     event.preventDefault()
    //     const tag = event.currentTarget.value.trim()
    //     if (tag !== "") {
    //       setTags([...tags, tag])
    //       event.currentTarget.value = ""
    //     }
    //   }
    // }

    // const removeTag = (tag: string) => {
    //   setTags(tags.filter((t) => t !== tag))
    // }

    return (
      <div
        ref={ref}
        className={cn(
          `flex items-start justify-center ${label && "flex-col"} ${
            (type === "number" || status) && " relative "
          }}`,
          containerClassName
        )}
      >
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

        {/* {status === "TAGS" && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-blue-100 inline-flex items-center text-sm rounded mt-2 mr-1 overflow-hidden"
              >
                <span className="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1">
                  {tag}
                </span>
                <button className="w-6 h-8 inline-block align-middle text-gray-500 bg-blue-200 focus:outline-none"></button>
              </div>
            ))}
          </div>
        )} */}
        <input
          id={id}
          type={type}
          // onKeyDown={handleOnKeyDown}
          name={name}
          placeholder={placeholder}
          {...register(stateRegister, {
            ...(type === "number" && { valueAsNumber: true }),
            ...(type === "date" && { valueAsDate: true }),
            required,
            disabled
          })}
          className={cn(
            inputVariants({ variant, className }),
            type === "number" && "pr-8",
            status === "LINK" && "w-[16vw]"
          )}
          required={required}
          {...props}
        />
        {/* Type Number */}
        {type === "number" && (
          <div
            className={cn(`absolute items-center right-2 ${label && " mt-5 "}`)}
          >
            <ChevronUp variant="large" />
            <ChevronDown variant="large" />
          </div>
        )}

        {status === "LINK" && (
          <div
            onClick={() => redirect(urlRedirect)}
            className={cn(
              `absolute items-center right-1 p-2 cursor-pointer rounded bg-primary-base hover:bg-primary-600 ${
                label && "mt-5  "
              }}`
            )}
          >
            <Link variant="large" color="#ffffff" />
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input, inputVariants }
