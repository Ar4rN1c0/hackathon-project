import type { Theme } from "../context/themeContext"

export default function getThemeColors(theme: Theme) {
    const isDarkTheme = theme === "dark"
    const colors = {
        background: isDarkTheme ? "bg-slate-900 " : "bg-white ",
        secondaryColor: isDarkTheme ? "bg-slate-600 " : "bg-gray-300 ",
        color: isDarkTheme ? "text-white " : "text-black ",
        border: isDarkTheme ? "border-slate-700 " : "border-black "
    }
    return colors
}