import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Linkedin = ({
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
      //   stroke="currentColor"
      height={heightSize}
      width={widthSize}
      {...props}
    >
      <path
        d="M22.23 0H1.77C0.8 0 0 0.77 0 1.72V22.28C0 23.23 0.8 24 1.77 24H22.23C23.21 24 24 23.23 24 22.28V1.72C24 0.77 23.2 0 22.23 0ZM7.27 20.1H3.65V9.24H7.27V20.1ZM5.47 7.76H5.44C4.22 7.76 3.44 6.93 3.44 5.89C3.44 4.83 4.24 4.02 5.49 4.02C6.73 4.02 7.49 4.82 7.51 5.89C7.51 6.93 6.73 7.76 5.46 7.76H5.47ZM20.34 20.1H16.71V14.3C16.71 12.85 16.19 11.85 14.88 11.85C13.88 11.85 13.28 12.52 13.01 13.17C12.91 13.4 12.9 13.72 12.9 14.05V20.1H9.28C9.28 20.1 9.33 10.28 9.28 9.26H12.91V10.8C13.2377 10.2313 13.7146 9.76299 14.2892 9.44573C14.8638 9.12848 15.5141 8.97434 16.17 9C18.56 9 20.35 10.56 20.35 13.89V20.1H20.34Z"
        fill={color ? color : "#0F0F0F"}
      />
    </svg>
  )
}

export default Linkedin