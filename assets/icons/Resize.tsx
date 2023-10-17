import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Resize = ({
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
      stroke="currentColor"
      fill="none"
      height={heightSize}
      width={widthSize}
      {...props}
    >
      <path
        d="M15 3H21V9M14 10L20.1 3.9M9 21H3V15M10 14L3.9 20.1"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Resize
