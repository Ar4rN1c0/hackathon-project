import type { Theme } from "../context/themeContext"

export default function getThemeColors(theme: Theme) {
    const isDarkTheme = theme === "dark"
    const colors = {
        background: isDarkTheme ? "bg-[#2c2c2c] " : "bg-[#648776] ",
        secondaryColor: isDarkTheme ? "bg-[#305f48ff] " : "bg-[#305f48ff] ",
        color: isDarkTheme ? "text-white " : "text-black ",
        border: isDarkTheme ? "border-slate-700 " : "border-black "
    }
    return colors
}