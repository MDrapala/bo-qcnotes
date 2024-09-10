import AtSign from "@/assets/icons/AtSign"

export function InputEmailForm({
  disabled,
  name,
  type,
  placeholder,
  label,
  form,
  setForm,
  size,
  inputSize,
  classNameLabel
}: {
  disabled: boolean
  name: string
  type: string
  placeholder?: string
  label: string
  form: any
  setForm: any
  size: number
  inputSize?: number
  classNameLabel?: string
}) {
  const handleOnKeyPress = (e: any) => {
    if (e.key === "Tab" || e.key === " " || e.key === "Enter") {
      setForm({
        ...form,
        [e.target.name]:
          form[e.target.name] && form[e.target.name]?.length > 0
            ? [...form[e.target.name], e.target.value.toLowerCase()]
            : [e.target.value.toLowerCase()]
      })
      e.target.value = ""
    }
  }

  return (
    <div className="flex-1 mt-1">
      <label
        htmlFor={name}
        className={`block pb-2 text-sm text-flim-tertiary ${classNameLabel}`}
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
          <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
            <AtSign variant="default" size={size} />
          </div>
        </div>
        <input
          className={`text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12 ${
            inputSize && `h-${inputSize}`
          }`}
          disabled={disabled}
          name={name}
          type={type}
          placeholder={placeholder}
          onKeyDown={handleOnKeyPress}
        />
      </div>
    </div>
  )
}
