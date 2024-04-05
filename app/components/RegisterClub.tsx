"use client"

import { useTheme } from "@/app/context/themeContext"
import { ChangeEvent, FormEvent, useState } from "react"
import { useSession } from "../context/sessionContext"
import { useRouter } from "next/navigation"

type formData = {
    name: string,
    description: string
} | {}

export default function RegisterClub() {
    const { theme, background, color, border, secondaryColor } = useTheme()
    const [data, setData] = useState<formData>({})
    const {session} = useSession()
    const router = useRouter()

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setData((prevData: formData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const body = JSON.stringify(data)
        const res = await fetch("https://club.jactc.xyz/api/v1/club/register", {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": "Bearer " + session.authToken,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://club.jactc.xyz"
            },
            body: body
        }).then(res => res.json()).then(res => {
            if(res.success) {
                router.push("/profile")
            }
        }).catch(err => console.log(err))
        //manage res
    }

    return (
        <main className={background + color + "w-full h-[85vh] grid place-content-center"}>
            <section className={secondaryColor + "p-6 rounded-lg flex flex-col justify-center align-middle"}>
                <h1 className="text-2xl text-center pb-2 border-b-4 mx-auto border-blue-400 mb-5 max-w-[300px]">Register your Club</h1>
                <article>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[30vw]" action="">
                        <input onChange={handleChange} required className="text-black p-2 rounded-md" placeholder="Introduce the name for your club" type="text" name="name" id="" />
                        <textarea onChange={handleChange} required className="text-black p-2 rounded-md" placeholder="Introduce the perfect description for your club" name="description" id="" cols={30} rows={10}></textarea>
                        <button className="bg-blue-300 rounded-md mt-2 py-1" type="submit">Submit</button>
                    </form>
                </article>
            </section>
        </main>
    )
}