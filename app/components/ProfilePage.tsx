"use client"

import { useTheme } from "../context/themeContext"

export default function ProfilePage () {
    const {background, color, border} = useTheme()
    
    return (
        <main className={background + color + "w-full h-[85vh]"}>
            Hola
        </main>
    )
}