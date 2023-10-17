import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const TV = ({ variant, size, height, width, color, ...props }: IconProps) => {
  const variantSize = getVariantSize(variant)
  const heightSize = variantSize ? variantSize : size ? size : height
  const widthSize = variantSize ? variantSize : size ? size : width

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      // stroke="currentColor"
      height={heightSize}
      width={widthSize}
      {...props}
    >
      <path
        d="M15.2071 1.70711C15.5976 1.31658 15.5976 0.683417 15.2071 0.292893C14.8166 -0.0976311 14.1834 -0.0976311 13.7929 0.292893L15.2071 1.70711ZM10 5.5L9.29289 6.20711C9.68342 6.59763 10.3166 6.59763 10.7071 6.20711L10 5.5ZM6.20711 0.292893C5.81658 -0.0976311 5.18342 -0.0976311 4.79289 0.292893C4.40237 0.683417 4.40237 1.31658 4.79289 1.70711L6.20711 0.292893ZM2.8 6.5H17.2V4.5H2.8V6.5ZM17.2 6.5C17.6418 6.5 18 6.85817 18 7.3H20C20 5.7536 18.7464 4.5 17.2 4.5V6.5ZM18 7.3V17.2H20V7.3H18ZM18 17.2C18 17.6418 17.6418 18 17.2 18V20C18.7464 20 20 18.7464 20 17.2H18ZM17.2 18H2.8V20H17.2V18ZM2.8 18C2.35817 18 2 17.6418 2 17.2H0C0 18.7464 1.2536 20 2.8 20V18ZM2 17.2V7.3H0V17.2H2ZM2 7.3C2 6.85817 2.35817 6.5 2.8 6.5V4.5C1.2536 4.5 0 5.7536 0 7.3H2ZM13.5 5.5V19H15.5V5.5H13.5ZM13.7929 0.292893L9.29289 4.79289L10.7071 6.20711L15.2071 1.70711L13.7929 0.292893ZM10.7071 4.79289L6.20711 0.292893L4.79289 1.70711L9.29289 6.20711L10.7071 4.79289ZM16.3 16.85H17.65V14.85H16.3V16.85Z"
        fill={color ? color : "#0F0F0F"}
      />
    </svg>
  )
}

export default TV
