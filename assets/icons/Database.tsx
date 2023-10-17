import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Database = ({
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
        d="M20.2 5.7C20.2 7.19117 16.5735 8.4 12.1 8.4C7.62649 8.4 4 7.19117 4 5.7M20.2 5.7C20.2 4.20883 16.5735 3 12.1 3C7.62649 3 4 4.20883 4 5.7M20.2 5.7V18.3C20.2 19.794 16.6 21 12.1 21C7.6 21 4 19.794 4 18.3V5.7M20.2 12C20.2 13.494 16.6 14.7 12.1 14.7C7.6 14.7 4 13.494 4 12"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Database
