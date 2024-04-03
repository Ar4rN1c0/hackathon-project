import ThemeProvider from "../context/themeContext"

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}