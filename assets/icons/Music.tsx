import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Music = ({
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
        d="M8.29411 18.3416V5.63571L21 3.51807V16.2239M8.29412 18.871C8.29412 20.3329 7.10899 21.5181 5.64706 21.5181C4.18513 21.5181 3 20.3329 3 18.871C3 17.4091 4.18513 16.224 5.64706 16.224C7.10899 16.224 8.29412 17.4091 8.29412 18.871ZM21 16.7533C21 18.2153 19.8149 19.4004 18.353 19.4004C16.891 19.4004 15.7059 18.2153 15.7059 16.7533C15.7059 15.2914 16.891 14.1063 18.353 14.1063C19.8149 14.1063 21 15.2914 21 16.7533Z"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Music
