import { cn } from "@/utils/tailwindMerge"
import { Controller } from "react-hook-form"
import AsyncCreatableSelect from "react-select/async-creatable"

type SelectProps = {
  label?: string
  labelClassName?: string
  className?: string
  classNameSelect?: string
  isSearchable?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  isMulti?: boolean
  closeMenuOnSelect?: boolean
  promiseOptions?: any
  onCreateOption?: any
  isValidNewOption: boolean
  name: string
  control: any
  onChange?: any
}

export const AsyncSelect = ({
  labelClassName,
  label,
  control,
  name,
  classNameSelect,
  isValidNewOption,
  ...props
}: SelectProps) => {
  return (
    <div
      className={cn(
        props.className,
        "flex-col-reverse items-start justify-center relative"
      )}
    >
      {label && (
        <label className={cn("font-semibold text-sm", labelClassName)}>
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <AsyncCreatableSelect
              {...field}
              cacheOptions
              loadOptions={props.promiseOptions}
              classNames={{
                container: () => cn(classNameSelect),
                control: () =>
                  "h-[1.5px] overflow-auto  flex flex-start scrollbar-hide",
                dropdownIndicator: () => "sticky top-0 bottom-0"
              }}
              classNamePrefix="border-neutral-300 text-neutral-base bg-blue-500"
              isValidNewOption={() => isValidNewOption}
              isClearable={false}
              {...props}
            />
          )
        }}
      />
    </div>
  )
}
