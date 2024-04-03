"use client"
import { useTheme } from "../context/themeContext"


export default function DashboardPage () {
    const {background, theme, color, border, secondaryColor} = useTheme()
    return (
        <main className={background + color + "w-full h-full grid py-7 px-10 place-content-center"}>
            <section className={secondaryColor + " w-[80vw] h-[400px] rounded-md"}>
                <p className="rotate-45 text-7xl absolute top-[43vh] left-[40vw]">
                    Content
                </p>
            </section>
            <h2>Nearby / Reccomended</h2>
            
            <h2>Online events</h2>
            <h2>Explore Page</h2>
        </main>
    )
}