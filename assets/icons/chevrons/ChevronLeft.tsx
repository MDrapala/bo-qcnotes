import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const ChevronLeft = ({
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
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      height={heightSize}
      width={widthSize}
      {...props}
    >
      <path
        d="M10 2L5 7L10 12"
        stroke={color ? color : "#0F0F0F"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default ChevronLeft
