"use client"

import { useTheme } from "@/app/context/themeContext"
import useClickOutside from "@/app/hooks/useClickOutside"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
export default function ClubClient({ name, description, admins, activities, id }: { name: string, description: string, admins: any[], activities: any[], id: string }) {
    const { background, color, secondaryColor, border, theme } = useTheme()

    const [showEdit, setShowEdit] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    function handleClick() {
        console.log(showEdit)
        setShowEdit(!showEdit)
    }
    return (
        <main className={background + color + "w-full min-h-[100vh] h-fit grid place-content-center"}>
            <section className={secondaryColor + "p-8 rounded-lg"}>
                <article className="flex align-top justify-center gap-10">
                    {showEdit && (
                        <div ref={ref}>
                            <article className={"rounded-lg py-5 px-3 absolute top-[51vh] left-[32vw] bg-" + (theme === "dark" ? "blue-400" : "white")}>
                                <Link href={"/profile/club/" + id + "/update/image"}>
                                    Change the image
                                </Link>
                                <button className="ml-2" onClick={() => setShowEdit(false)}>
                                    &#10006;
                                </button>
                            </article>
                        </div>
                    )}
                    <Image onClick={handleClick} className="cursor-pointer w-1/3 aspect-auto rounded-full" width={300} height={300} src={"https://club.jactc.xyz/api/v1/club/club/logo/" + id} alt="" />
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-bold">
                            {name}
                        </h1>
                        <p>
                            {description}
                        </p>
                        <article className="flex flex-wrap gap-2">
                            <Link className="bg-slate-500 px-2 py-1 rounded-md max-w-fit" href={"/profile/club/" + id + "/create-activity"}>Add Activity</Link>
                            <Link className="bg-slate-500 px-2 py-1 rounded-md max-w-fit" href={"/profile/club/" + id + "/update/name"}>Change Club's name</Link>
                            <Link className="bg-slate-500 px-2 py-1 rounded-md max-w-fit" href={"/profile/club/" + id + "/update/description"}>Change Club's description</Link>
                        </article>
                        <article className="flex flex-wrap gap-7">
                            Admins:
                            <div className="flex gap-3 flex-wrap">
                                {admins.map((admin) => {
                                    return (<Link className={background + "p-1 rounded-md"} key={admin.id} href={"/user/" + admin.id}>{admin.name}</Link>)
                                }
                                )}
                            </div>
                            <Link className="bg-slate-500 px-2 py-1 rounded-md max-w-fit" href={"/profile/club/" + id + "/update/admins"}>Edit club's admins</Link>
                        </article>
                        <article>
                            Activities:
                            {activities.map((activity) => {
                                return (activity.name)
                            }
                            )}
                        </article>
                    </div>
                </article>
            </section>
        </main>
    )
}