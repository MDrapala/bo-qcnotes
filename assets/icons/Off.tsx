import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const User = ({ variant, size, height, width, color, ...props }: IconProps) => {
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
        d="M17.8265 7.17539C18.9589 8.30814 19.7299 9.75121 20.0422 11.3222C20.3545 12.8931 20.194 14.5214 19.5809 16.0011C18.9678 17.4808 17.9298 18.7455 16.598 19.6353C15.2662 20.5251 13.7005 21 12.0988 21C10.4971 21 8.93142 20.5251 7.59963 19.6353C6.26785 18.7455 5.2298 17.4808 4.61674 16.0011C4.00368 14.5214 3.84315 12.8931 4.15543 11.3222C4.46771 9.75121 5.23878 8.30814 6.37116 7.17539M12.1033 3V11.9987"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default User
