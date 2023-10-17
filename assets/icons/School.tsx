import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const School = ({
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
      viewBox="0 0 24 25"
      fill="none"
      stroke="currentColor"
      height={heightSize}
      width={widthSize}
      {...props}
    >
      <path
        d="M21 9.66092L12 4.51807L3 9.66092L12 14.8038M21 9.66092L12 14.8038M21 9.66092V16.7324M12 14.8038L12 19.9466M6.21426 11.5895V16.7323L12 19.9466M12 19.9466L17.7857 16.7323V11.5895"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default School
