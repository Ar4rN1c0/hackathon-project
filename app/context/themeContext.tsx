"use client"

import { useState, createContext, useContext, useEffect } from "react"
import getThemeColors from "../utils/themeColors"

export type Theme = "light" | "dark"
type ThemeContextType = {
    theme: Theme,
    setTheme: (arg: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    setTheme: () => null
})

export default function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {

    const [theme, setTheme] = useState<Theme>("light")
    let cookiesStoredSession: {[k: string]: string} = {theme: "light"}
    if(typeof document !== 'undefined') {
        cookiesStoredSession = Object.fromEntries(document.cookie.split(";").map(cookie => {
            const [name, value] = cookie.replaceAll(" ", "").split("=")
            return [name, value]
        }))
    }
    useEffect(() => {
        setTheme(cookiesStoredSession?.theme ? cookiesStoredSession?.theme as Theme : "dark")
        console.log(theme)
    }, [])
    function useChangeTheme(newTheme: Theme) {
        setTheme(newTheme)
    }
    useEffect(() => {
        document.cookie = `theme=${theme}; path=/`
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme: useChangeTheme }}>{children}</ThemeContext.Provider>
    )
}


export const useTheme = () => {
    const { theme } = useContext(ThemeContext)
    const isDarkTheme = theme === "dark"
    const colorsUtil = getThemeColors(theme)
    const [colors, setColors] = useState(colorsUtil)
    useEffect(() => {
        setColors(colorsUtil)

    }, [theme])

    return {
        ...useContext(ThemeContext),
        background: colors.background,
        color: colors.color,
        border: colors.border,
        secondaryColor: colors.secondaryColor
    }
}