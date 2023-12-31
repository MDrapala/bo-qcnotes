import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Mail = ({ variant, size, height, width, color, ...props }: IconProps) => {
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
        d="M21 6.8C21 5.81 20.19 5 19.2 5H4.8C3.81 5 3 5.81 3 6.8M21 6.8V17.6C21 18.59 20.19 19.4 19.2 19.4H4.8C3.81 19.4 3 18.59 3 17.6V6.8M21 6.8L12 13.1L3 6.8"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Mail
