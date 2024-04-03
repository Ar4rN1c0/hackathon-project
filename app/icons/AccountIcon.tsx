"use client"

import { useTheme } from "../context/themeContext"
import lightAccount from "../../public/account_white.svg"
import darkAccount from "../../public/account_black.svg"
import Image from "next/image"

export default function AccountIcon({size = 30}: {size?: number }) {
    const { theme } = useTheme()
    return (
        <figure className="cursor-pointer">
            {
                theme === "light" 
                ? <Image src={darkAccount} width={size} height={size} alt={"Account avatar"}></Image> 
                : <Image src={lightAccount} width={size} height={size} alt="Account Avatar"></Image>
            }
        </figure>
    )
}