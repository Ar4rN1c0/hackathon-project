import SearchIcon from "@/app/icons/SearchIcon"


export default function SearchBar () {

    return (
        <nav className="bg-white flex justify-between rounded-full p-2 border-black border-2">
            <SearchIcon></SearchIcon>
            <input className="text-black focus:outline-none rounded-full px-3" type="text" />
        </nav>
    )
}