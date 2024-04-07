"use client"

import { useSession } from "@/app/context/sessionContext"
import { useTheme } from "@/app/context/themeContext"
import { ChangeEvent, FormEvent, TextareaHTMLAttributes, useState } from "react"

type dataForm = {
    description: string,
    club: string
}

export default function UpdateClubName({params}: {params: {clubId: string}}) {
    const { session } = useSession()
    console.log(params.clubId)
    const [data, setData] = useState<dataForm>({ description: "", club: params.clubId})
    const { background, color, border, secondaryColor } = useTheme()
    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setData(prevData => ({ ...prevData, [e.target.name]: e.target.value }))
    }
    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        console.log(data)
        const res = await fetch("https://club.jactc.xyz/api/v1/club/club/update/description", {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Authorization": "Bearer " + session.authToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(res => { console.log(res); return res }).catch(err => console.error(err))
    }
    return (
        <main className={background + color + "w-full min-h-[85vh] grid place-content-center"}>
            <section>
                <h1 className="text-2xl font-bold text-center border-blue-400 border-b-4 mb-7 ">
                    Change the club's description
                </h1>
                <article className="max-w-[250px] flex justify-center m-auto">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <textarea className="px-2 py-1 rounded-md text-black" required onChange={handleChange} name="description" placeholder="New Description" />
                        <button className="mt-3 bg-blue-400 rounded-lg py-2" type="submit">Update</button>
                    </form>
                </article>
            </section>
        </main>
    )
}