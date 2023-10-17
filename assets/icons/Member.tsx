import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Member = ({
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
        d="M6.16798 18.8181C6.74398 16.8381 7.82398 16.1181 9.06598 16.1181H14.934C16.176 16.1181 17.256 16.8381 17.832 18.8181M14.7 10.7181C14.7 12.2092 13.4912 13.4181 12 13.4181C10.5089 13.4181 9.30004 12.2092 9.30004 10.7181C9.30004 9.2269 10.5089 8.01807 12 8.01807C13.4912 8.01807 14.7 9.2269 14.7 10.7181ZM21 12.5181C21 17.4886 16.9706 21.5181 12 21.5181C7.02944 21.5181 3 17.4886 3 12.5181C3 7.5475 7.02944 3.51807 12 3.51807C16.9706 3.51807 21 7.5475 21 12.5181Z"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Member
