interface TagProps {
  text: string
  color?: string
}

const Tag: React.FC<TagProps> = ({ text, color = "blue" }) => {
  return (
    <span
      className={`inline-block px-3 py-1 text-white bg-${color}-500 rounded-full`}
    >
      {text}
    </span>
  )
}

export default Tag
