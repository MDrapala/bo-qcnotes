import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Tag = ({ variant, size, height, width, color, ...props }: IconProps) => {
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
        d="M7.69568 7.69568H7.70507M20.4585 13.7155L13.7249 20.4491C13.5505 20.6238 13.3433 20.7623 13.1153 20.8568C12.8873 20.9513 12.6429 21 12.396 21C12.1492 21 11.9048 20.9513 11.6768 20.8568C11.4488 20.7623 11.2416 20.6238 11.0672 20.4491L3 12.3914V3H12.3913L20.4585 11.0672C20.8083 11.4191 21.0047 11.8951 21.0047 12.3914C21.0047 12.8876 20.8083 13.3636 20.4585 13.7155Z"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Tag
