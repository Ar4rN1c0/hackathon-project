import MenuIcon from "@/app/icons/MenuIcon"
import useClickOutside from "@/app/hooks/useClickOutside"
import Menu from "../menus/Menu"
import { useRef, useState } from "react"

export default function MenuButton() {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement>(null)

    useClickOutside(ref, setShowMenu, false)

    function handleClick() {
        setShowMenu(!showMenu)
    }
    return (
        <div ref={ref} className="grid place-content-center" onClick={handleClick}>
            <MenuIcon></MenuIcon>

            {showMenu && <Menu />}
        </div>
    )
}