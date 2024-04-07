"use client"

import { useTheme } from "../context/themeContext"
import Icon from "../icons/ThemeIcons"

export default function SettingsPage() {
    const { background, color, secondaryColor, setTheme, border, theme } = useTheme()
    return (
        <main className={background + color + "w-full min-h-[85vh] grid place-content-center"}>
            <section className={secondaryColor + "w-[50vw] rounded-lg p-10"}>
                <article>
                    <ul className="">
                        <li className="flex gap gap-5 justify-center align-middle">
                            <p className="h-fit mt-[6px]">

                                Select the theme:
                            </p>
                            <nav className="flex flex-row gap-2 [&>*]:cursor-pointer [&>*]:bg-slate-500 [&>*]:p-1 [&>*]:rounded-md" >
                                <div className={theme === "light" ? border + "border-3" : ""}>
                                    <Icon onClick={() => setTheme("light")} name="sun" />
                                </div>
                                <div className={theme === "dark" ? border + "border-3" : ""}>
                                    <Icon onClick={() => setTheme("dark")} name="moon" />
                                </div>
                            </nav>
                        </li>
                    </ul>
                </article>
            </section>
        </main>
    )
}