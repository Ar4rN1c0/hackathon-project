"use client"

import { useState, createContext, useContext, Dispatch, SetStateAction, useEffect } from "react"
import useThemeCookies from "../hooks/useThemeCookies"
type theme = "light" | "dark"
type themeContext = {
    theme: theme,
    setTheme: (arg: theme) => void 
}

const ThemeContext = createContext<themeContext>({
    theme: "light",
    setTheme: () => null
})

export default function ThemeProvider({children}: Readonly<{children: React.ReactNode}>) {
    const [cookies, setCookies] = useThemeCookies()
    useEffect(() => {
        setCookies("theme", cookies.theme ? cookies.theme as theme : "light")
    }, [])

    const [theme, themeSetter] = useState<theme>(cookies.theme ? cookies.theme as theme : "light")

    function setTheme (arg: theme) {
        themeSetter(arg)
        setCookies("theme", arg)
    }
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>
    )
}



export const useTheme = () => {
    const {theme} = useContext(ThemeContext)
    const isDarkTheme = theme === "dark" 
    const [colors, setColors] = useState({background: isDarkTheme ? "bg-slate-900 " : "bg-white ",
                                          secondaryColor: isDarkTheme ? "bg-slate-600": "bg-gray-300 ",  
                                          color: isDarkTheme ? "text-white " : "text-black ", 
                                          border: isDarkTheme ? "border-slate-700 " : "border-black "})
    useEffect(()=> {
        setColors({background: isDarkTheme ? "bg-slate-900 " : "bg-white ",
                   secondaryColor: isDarkTheme ? "bg-slate-600": "bg-gray-300 ", 
                   color: isDarkTheme ? "text-white " : "text-black ",
                   border: isDarkTheme ? "border-slate-700 " : "border-black "})
    }, [theme])

    return {
        ...useContext(ThemeContext), 
        background: colors.background,
        color:  colors.color,
        border: colors.border,
        secondaryColor: colors.secondaryColor
    }
}