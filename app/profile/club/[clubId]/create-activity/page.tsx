"use client"

import { useSession } from "@/app/context/sessionContext"
import { useTheme } from "@/app/context/themeContext"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"

interface data {
    name: string
    description: string
    club: string
}

export default function CreateActivity ({params}:  {params: {clubId: string}}) {
    const {background, color, secondaryColor} = useTheme()
    const [data, setData] = useState<data>({club: params.clubId, name: "", description: ""})
    const {session} = useSession()
    const router = useRouter()
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setData(prevData => ({...prevData, [e.target.name]: e.target.value}))
    }
    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        console.log(data)
        const res = await fetch("https://club.jactc.xyz/api/v1/club/activity/create", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + session.authToken,
                'Content-Type': 'application/JSON',
                "Access-Control-Allow-Origin": '*'
            },
            mode: "cors"
        }).then(res => {
            console.log(res.status)
            if(res.ok) {
                router.refresh()
                router.push("/profile/club/" + params.clubId)
            }
        })
    }
    return (
        <main className={background + color + "w-full h-[85vh] grid place-content-center"}>
        <section className={secondaryColor +  "p-10 rounded-lg"}>
            <h1 className="text-center text-2xl mb-7 font-bold pb-2 border-b-4 border-blue-400">
                Create Activity
            </h1>
            <article>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3" action="">
                    <input onChange={handleChange} className="text-black px-2 py-1 bg-slate-100 rounded-md" placeholder="Title of your activity" required type="text" name="name" id="" />
                    <textarea onChange={handleChange} className="text-black px-2 py-1 bg-slate-100 rounded-md" placeholder="Description" required name="description" id="" />
                    <button className="bg-blue-300 rounded-md py-1 mt-2" type="submit">Submit</button>
                </form>
            </article>
        </section>
    </main>
    )
}