import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const Home = ({ variant, size, height, width, color, ...props }: IconProps) => {
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
        d="M19.2 9.29997V19.2C19.2 19.6774 19.0103 20.1352 18.6728 20.4728C18.3352 20.8103 17.8774 21 17.4 21H6.59997C6.12258 21 5.66475 20.8103 5.32718 20.4728C4.98961 20.1352 4.79997 19.6774 4.79997 19.2V9.29997M9.3 21V12H14.7V21M3 10.74L12 3L21 10.74"
        stroke="#0F0F0F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default Home
