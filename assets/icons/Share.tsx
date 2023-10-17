import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Share = ({
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
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      height={heightSize}
      width={widthSize}
      {...props}
    >
      <path
        d="M12 9.33333V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.6 2.6 4 3.33333 4H6.66667M10 2H14V6M6.66667 9.33333L13.4667 2.53333"
        stroke={color ? color : "#0F0F0F"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Share
