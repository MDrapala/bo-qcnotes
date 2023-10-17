import { getVariantSize } from "@/utils/size"
import { IconProps } from "@/types/Icons"

const CutScissors = ({
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
        d="M7.848 8.24999L9.384 9.13699M7.848 8.24999C7.65245 8.59392 7.39081 8.89578 7.07812 9.13819C6.76544 9.38059 6.4079 9.55875 6.02608 9.66242C5.64426 9.76608 5.24571 9.79319 4.85337 9.74219C4.46103 9.6912 4.08265 9.5631 3.74002 9.36528C3.39739 9.16745 3.09727 8.90381 2.85694 8.58952C2.61662 8.27524 2.44083 7.91652 2.3397 7.53402C2.23858 7.15153 2.21411 6.7528 2.26771 6.36081C2.3213 5.96882 2.45191 5.5913 2.652 5.24999C3.05265 4.56657 3.70736 4.06936 4.47325 3.86687C5.23913 3.66438 6.05402 3.77305 6.74008 4.16916C7.42615 4.56527 7.92768 5.21667 8.13525 5.98119C8.34281 6.74572 8.23955 7.56131 7.848 8.24999ZM9.384 9.13699C9.70799 9.32386 9.97805 9.59148 10.1678 9.91377C10.3576 10.2361 10.4607 10.602 10.467 10.976C10.472 11.327 10.521 11.671 10.607 12M9.384 9.13699L11.461 10.336M10.607 12C10.521 12.33 10.472 12.673 10.467 13.025C10.4605 13.3988 10.3574 13.7645 10.1676 14.0866C9.97781 14.4087 9.70785 14.6762 9.384 14.863M10.607 12C10.7671 11.3897 11.0585 10.8218 11.461 10.336M11.461 10.336C12.0005 9.68378 12.7195 9.20429 13.529 8.95699L18.854 7.32899C19.6602 7.08228 20.5195 7.06704 21.334 7.28499L22.137 7.49999L14.343 12M7.848 15.75L9.384 14.863M7.848 15.75C8.04809 16.0913 8.1787 16.4688 8.2323 16.8608C8.28589 17.2528 8.26142 17.6515 8.1603 18.034C8.05917 18.4165 7.88339 18.7752 7.64306 19.0895C7.40273 19.4038 7.10262 19.6675 6.75998 19.8653C6.41735 20.0631 6.03897 20.1912 5.64664 20.2422C5.2543 20.2932 4.85574 20.2661 4.47392 20.1624C4.09211 20.0588 3.73456 19.8806 3.42188 19.6382C3.1092 19.3958 2.84755 19.0939 2.652 18.75C2.26045 18.0613 2.15719 17.2457 2.36476 16.4812C2.57232 15.7167 3.07386 15.0653 3.75992 14.6692C4.44598 14.2731 5.26087 14.1644 6.02676 14.3669C6.79264 14.5694 7.44735 15.0666 7.848 15.75ZM9.384 14.863L11.461 13.664M11.461 13.664C12.0005 14.3161 12.7196 14.7956 13.529 15.043L18.855 16.672C19.6613 16.9184 20.5206 16.9333 21.335 16.715L22.137 16.5L14.343 12M11.461 13.664L14.343 12"
        stroke={color ? color : "#0F0F0F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CutScissors