import { SearchBox } from "react-instantsearch-hooks-web"
import Search from "@/assets/icons/Search"

type Props = {
  placeholder: string
  autoFocus?: boolean
}

export const SearchInput = ({ placeholder, autoFocus }: Props) => {
  return (
    <SearchBox
      placeholder={placeholder}
      searchAsYouType={true}
      autoFocus={autoFocus}
      resetIconComponent={() => <div className="hidden" />}
      submitIconComponent={() => <Search variant="medium" className="" />}
      classNames={{
        form: "relative",
        input:
          "w-[348px] py-[5px] pl-10 pr-[16px] focus:outline-none border border-neutral-300 focus:border-neutral-300 rounded text-neutral-base text-base",
        submit: "absolute top-2.5 left-3"
      }}
    />
  )
}
