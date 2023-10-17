import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Movie = ({
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
        d="M7.99998 3.51807V21.5181M16 3.51807V21.5181M4 6.51809H8M4 9.51807H8M4 12.5181H20M4 15.5181H8M4 18.5181H8M16 6.51809H20M16 9.51807H20M16 15.5181H20M16 18.5181H20M6 21.5181H18C19.1046 21.5181 20 20.6226 20 19.5181V5.51807C20 4.4135 19.1046 3.51807 18 3.51807H6C4.89543 3.51807 4 4.4135 4 5.51807V19.5181C4 20.6226 4.89543 21.5181 6 21.5181Z"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
      />
    </svg>
  )
}

export default Movie
