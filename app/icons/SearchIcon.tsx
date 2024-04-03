import searchIcon from "../../public/search.svg"
import Image from "next/image"

export default function SearchIcon () {
    return <Image src={searchIcon} width={30} height={30} alt="Search icon" />
}