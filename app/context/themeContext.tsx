"use client"

import { useState, createContext, useContext, Dispatch, SetStateAction, useEffect } from "react"
type Theme = "light" | "dark"
type ThemeContextType = {
    theme: Theme,
    setTheme: (arg: Theme) => void 
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    setTheme: () => null
})

function isTheme(variable: any): variable is Theme {
    return variable === "light" || variable === "dark";
}

export default function ThemeProvider({children}: Readonly<{children: React.ReactNode}>) {

    const [theme, setTheme] = useState<Theme>("light")
    useEffect(() => {
        if(isTheme(window.localStorage.getItem("theme"))) {
            setTheme(window.localStorage.getItem("theme") as "light" | "dark")
        }
    }, [])
    function useChangeTheme  (newTheme: Theme)  {
        setTheme(newTheme)
        window.localStorage.setItem("theme", newTheme)

    }

    return (
        <ThemeContext.Provider value={{theme, setTheme: useChangeTheme}}>{children}</ThemeContext.Provider>
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