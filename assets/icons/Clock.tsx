import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Clock = ({
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
        d="M12 7.11801V12.518L15.6 14.318M21 12.5181C21 17.4886 16.9706 21.5181 12 21.5181C7.02944 21.5181 3 17.4886 3 12.5181C3 7.5475 7.02944 3.51807 12 3.51807C16.9706 3.51807 21 7.5475 21 12.5181Z"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Clock
