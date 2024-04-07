"use client"

import Link from "next/link"
import { useSession } from "../context/sessionContext"
import { useTheme } from "../context/themeContext"
import AccountIcon from "../icons/AccountIcon"
import { useState } from "react"

export default function ProfileClient({ dataClubs, dataActivities }: { dataClubs: any[], dataActivities: any[] }) {
    const { background, color, border, secondaryColor, theme } = useTheme()
    const { session } = useSession()
    const [showFlieForm, setShowFile] = useState(false)
    return (
        <main className={background + color + "w-full h-[85vh] grid place-content-center px-5"}>
            <section className="grid grid-flow-col place-content-center grid-cols-2 pt-10">
                <article className="h-[80vh] flex justify-center">
                    {showFlieForm && (
                        <div>
                            <article className={"rounded-lg py-5 px-3 absolute top-[25vh] left-[32vw] bg-" + (theme === "dark" ? "blue-400" : "white")}>
                                <Link href={"/auth/update/image"}>
                                    Change the image
                                </Link>
                                <button className="ml-2" onClick={() => setShowFile(false)}>
                                    &#10006;
                                </button>
                            </article>
                        </div>
                    )}
                    <div onClick={() => setShowFile(true)}>
                        <AccountIcon id={session.userId} size={100} isButton={true}></AccountIcon>

                    </div>
                </article>
                <article className="flex flex-col gap-4 flex-wrap]">
                    <div>
                        <h1 className="text-xl font-bold">{session.name}</h1>
                        <h3 className="text-sm font-thin">#{session.userId}</h3>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            <Link href="/auth/update/userName" className="text-sm rounded-xl bg-slate-500 px-3 py-1 min-w-fit">
                                Change your name
                            </Link>
                            <Link href="/auth/update/password" className="text-sm rounded-xl bg-slate-500 px-3 py-1 min-w-fit">
                                Change your password
                            </Link>
                            <Link href="/settings" className="text-sm rounded-xl bg-slate-600 px-3 py-1 flex">
                                <p>
                                    &#9881;&nbsp;
                                </p>
                                <p>
                                    Settings
                                </p>
                            </Link>
                        </div>
                    </div>
                    <section>
                        <article>

                            <h2>Your Clubs</h2>
                            <ul className="flex gap-3">
                                {dataClubs.map(club => (
                                    <Link href={"/profile/club/" + club.clubId} key={club.name} className={secondaryColor + border + "border-2 p-3 rounded-lg w-[15vw]"}>{club.name}</Link>
                                ))}
                            </ul>
                        </article>
                        <article className="mt-10 py-3">
                            <h2>Your Activities</h2>
                            <ul className="mt-5 flex gap-3 flex-wrap">
                                {dataActivities.map(activity => (
                                    <Link href={"/profile/club/" + activity.club + "/activity/" + activity.id} key={activity.name} className={secondaryColor + border + "border-2 p-3 rounded-lg w-[15vw]"}>{activity.name}</Link>
                                ))}
                            </ul>
                        </article>
                    </section>
                </article>
            </section>
        </main>
    )
}