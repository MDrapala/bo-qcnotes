import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const User = ({ variant, size, height, width, color, ...props }: IconProps) => {
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
        d="M15.7 3V6.6M8.5 3V6.6M4 10.2H20.2M5.8 4.8H18.4C19.3941 4.8 20.2 5.60589 20.2 6.6V19.2C20.2 20.1941 19.3941 21 18.4 21H5.8C4.80589 21 4 20.1941 4 19.2V6.6C4 5.60589 4.80589 4.8 5.8 4.8Z"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default User
