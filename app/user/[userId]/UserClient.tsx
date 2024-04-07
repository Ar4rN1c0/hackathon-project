"use client"

import { useTheme } from "@/app/context/themeContext"
import AccountIcon from "@/app/icons/AccountIcon"
import Link from "next/link"

export default function UserClient({userInfo, dataClubs, dataActivities}: {userInfo: any, dataClubs: any, dataActivities: any}) {
    const { background, color, border, secondaryColor } = useTheme()
    return (
        <main className={background + color + "w-full h-[85vh] grid place-content-center px-5"}>
            <section className="grid grid-flow-col place-content-center grid-cols-2 pt-10">
                <article className="h-[80vh] flex justify-center">
                    <AccountIcon id={userInfo.userId} size={100} isButton={false}></AccountIcon>
                </article>
                <article className="flex flex-col gap-4 flex-wrap]">
                    <div>
                        <h1 className="text-xl font-bold">{userInfo.name}</h1>
                        <h3 className="text-sm font-thin">#{userInfo.userId}</h3>

                    </div>
                    <section>
                        <article>

                            <h2>{userInfo.name}'s Clubs</h2>
                            <ul className="flex gap-3">
                                {dataClubs.map((club: {name: string, clubId: string}) => (
                                    <Link href={"/profile/club/" + club.clubId} key={club.name} className={secondaryColor + border  + "border-2 p-3 rounded-lg w-[15vw]"}>{club.name}</Link>
                                ))}
                            </ul>
                        </article>
                        <article>

                        </article>
                    </section>
                </article>
            </section>
        </main>
        )
}