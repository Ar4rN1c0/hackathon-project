"use client"

import { useTheme } from "../context/themeContext"
import Image from "next/image"
import blackMenu from "../../public/menu_black.svg"
import whiteMenu from "../../public/menu_white.svg"

export default function MenuIcon({size=30}: {size?: number}) {
    const { theme } = useTheme()
    return (
        <figure className="cursor-pointer">
            {
                theme === "dark"
                    ? <Image src={whiteMenu} width={size} height={size} alt="Menu Icon"></Image>
                    : <Image src={blackMenu} width={size} height={size} alt="Menu Icon"></Image>
            }
        </figure>
    )
}