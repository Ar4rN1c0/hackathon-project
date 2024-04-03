import ThemeProvider from "../context/themeContext"
import { CookiesProvider } from "react-cookie"

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}