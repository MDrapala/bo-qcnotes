import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Download = ({
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
        d="M3.00003 15.1622V19.0541C3.00003 20.1243 3.87571 21 4.94598 21H18.5676C19.0837 21 19.5787 20.795 19.9436 20.43C20.3085 20.0651 20.5135 19.5702 20.5135 19.0541V15.1622M16.6217 9.32432L11.7568 14.1892L6.89192 9.32432M11.7568 13.0216V3"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default Download
