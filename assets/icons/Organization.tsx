import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Organization = ({
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
        d="M6.99989 6.00002H8.99989M10.9999 6.00005H12.9999M14.9998 6.00005H16.9998M6.99989 8.99998H8.99989M10.9999 8.99995H12.9999M14.9998 8.99995H16.9998M6.99989 12H8.99989M10.9999 12H12.9999M14.9998 12H16.9998M4 3H20V21H4V3ZM10.0001 15H14.0001V21H10.0001V15Z"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
      />
    </svg>
  )
}

export default Organization
