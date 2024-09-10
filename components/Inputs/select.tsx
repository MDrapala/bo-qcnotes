import { cn } from "@/utils/tailwindMerge"
import { UseFormSetValue } from "react-hook-form"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import AsyncSelect from "react-select/async"
import AsyncCreatableSelect from "react-select/async-creatable"
import CreatableSelect from "react-select/creatable"

interface Options {
  readonly value: string
  readonly label: string
  readonly color?: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

type SelectProps = {
  label?: string
  labelClassName?: string
  className?: string
  classNameSelect?: string
  options?: Options[]
  isClearable?: boolean
  isCreatableSelect?: boolean
  isAsyncFormSelect?: boolean
  isAsyncFormCreate?: boolean
  isSearchable?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  isRtl?: boolean
  isMulti?: boolean
  closeMenuOnSelect?: boolean
  promiseOptions?: any
  defaultValue?: any
  stateRegister: string
  getValues?: any
  placeholder?: string
  value?: any
  watch: any
  setValue: UseFormSetValue<any>
}

const FormSelect = ({
  label,
  labelClassName,
  className,
  classNameSelect,
  options,
  isClearable,
  isCreatableSelect,
  isAsyncFormSelect,
  isAsyncFormCreate,
  isSearchable,
  isDisabled,
  isLoading,
  isRtl,
  isMulti,
  closeMenuOnSelect,
  promiseOptions,
  defaultValue,
  setValue,
  value,
  stateRegister,
  placeholder,
  watch
}: SelectProps) => {
  const handleChange = (event: any) => {
    let result: any = []

    if (isMulti) {
      if (watch[stateRegister] === undefined) {
        setValue(
          stateRegister,
          event.map((item: any) => item.value)
        )
      }

      if (event.length >= watch[stateRegister]?.length) {
        result = [
          ...new Set(
            watch[stateRegister].concat(event.map((item: any) => item.value))
          )
        ]
      } else {
        result = watch[stateRegister].filter((item: any) =>
          event.map((item: any) => item.value).includes(item)
        )
      }
    }
    setValue(stateRegister, isMulti ? result : event?.value)
  }

  const handleInputChange = (inputValue: any, actionMeta: any) => {
    actionMeta.action === "menu-close" &&
      inputValue === undefined &&
      setValue(stateRegister, isMulti ? inputValue : inputValue?.value)
  }

  const animatedComponents = makeAnimated()

  return (
    <div
      className={cn(
        className,
        "flex-col-reverse items-start justify-center relative"
      )}
    >
      {label && (
        <label className={cn("font-semibold text-sm", labelClassName)}>
          {label}
        </label>
      )}
      {isCreatableSelect ? (
        <CreatableSelect
          classNames={{
            container: () => cn(classNameSelect),
            control: () =>
              "h-[1.5px] overflow-auto  flex flex-start scrollbar-hide",
            dropdownIndicator: () => "sticky top-0 bottom-0",
            input: () => "border rounded"
          }}
          classNamePrefix="border-neutral-300 text-neutral-base bg-blue-500"
          defaultValue={defaultValue}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          options={options}
          isMulti={isMulti}
          closeMenuOnSelect={closeMenuOnSelect}
          components={animatedComponents}
          onChange={handleChange}
          onInputChange={handleInputChange}
        />
      ) : isAsyncFormSelect ? (
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={promiseOptions}
          classNames={{
            container: () => cn(classNameSelect),
            control: () =>
              "h-[1.5px] overflow-auto  flex flex-start scrollbar-hide",
            dropdownIndicator: () => "sticky top-0 bottom-0"
          }}
          classNamePrefix="border-neutral-300 text-neutral-base bg-blue-500"
          placeholder={placeholder}
          value={value}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          options={options}
          isMulti={isMulti}
          closeMenuOnSelect={closeMenuOnSelect}
          components={animatedComponents}
          onChange={handleChange}
          onInputChange={handleInputChange}
        />
      ) : isAsyncFormCreate ? (
        <AsyncCreatableSelect
          cacheOptions
          defaultOptions
          loadOptions={promiseOptions}
          classNames={{
            container: () => cn(classNameSelect),
            control: () =>
              "h-[1.5px] overflow-auto  flex flex-start scrollbar-hide",
            dropdownIndicator: () => "sticky top-0 bottom-0"
          }}
          classNamePrefix="border-neutral-300 text-neutral-base bg-blue-500"
          placeholder={placeholder}
          value={value}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          isMulti={isMulti}
          closeMenuOnSelect={closeMenuOnSelect}
          components={animatedComponents}
          onChange={handleChange}
          onInputChange={handleInputChange}
        />
      ) : (
        <Select
          classNames={{
            container: () => cn(classNameSelect),
            control: () =>
              "h-[1.5px] overflow-auto  flex flex-start scrollbar-hide",
            dropdownIndicator: () => "sticky top-0 bottom-0"
          }}
          classNamePrefix="border-neutral-300 text-neutral-base bg-blue-500"
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          options={options}
          isMulti={isMulti}
          closeMenuOnSelect={closeMenuOnSelect}
          components={animatedComponents}
          onChange={handleChange}
          onInputChange={handleInputChange}
        />
      )}
    </div>
  )
}

export default FormSelect
