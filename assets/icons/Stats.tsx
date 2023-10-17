import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Stats = ({
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
        d="M20.2088 7.79122L12.5934 15.4066L8.63736 11.4506L3 17.0879M15.0659 7H21V12.9341"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Stats
