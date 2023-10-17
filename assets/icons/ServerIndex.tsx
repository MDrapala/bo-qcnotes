import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const ServerIndex = ({
  variant,
  size,
  height,
  width,
  color,
  ...props
}: IconProps) => {
  const variantSize = getVariantSize(variant)
  const heightSize = variantSize ? variantSize : size ? size : height
  const widthSize = variantSize ? variantSize : size ? size : width

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      height={heightSize}
      width={widthSize}
      {...props}
    >
      <path
        d="M6.6 6.6H6.609M6.6 17.4H6.609M4.8 3H19.2C20.1941 3 21 3.80589 21 4.8V8.4C21 9.39411 20.1941 10.2 19.2 10.2H4.8C3.80589 10.2 3 9.39411 3 8.4V4.8C3 3.80589 3.80589 3 4.8 3ZM4.8 13.8H19.2C20.1941 13.8 21 14.6059 21 15.6V19.2C21 20.1941 20.1941 21 19.2 21H4.8C3.80589 21 3 20.1941 3 19.2V15.6C3 14.6059 3.80589 13.8 4.8 13.8Z"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ServerIndex
