import ThemeProvider from "../context/themeContext"
import SessionProvider from "../context/sessionContext"

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ThemeProvider>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeProvider>
    )
}