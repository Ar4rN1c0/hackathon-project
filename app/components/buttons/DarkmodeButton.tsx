"use client"

import { useTheme } from "../../context/themeContext"
import Icon from "../../icons/ThemeIcons"
  
export default function ThemeButton() {
    const { theme, setTheme, background } = useTheme()
    return (
        <div className={background + " select-none grid place-content-center"}>
            <button className="text-black" onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark")
            }}>
                <Icon name={theme === "dark" ? "moon" : "sun"}></Icon>
            </button>
        </div>
    )
}