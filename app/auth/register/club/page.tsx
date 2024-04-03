"use client"

import { useTheme } from "@/app/context/themeContext"
import { ChangeEvent, FormEvent, useState } from "react"

type formData = {
    name: string,
    description: string
} | {}

export default function RegisterClubPage () {
    const {theme, background, color, border, secondaryColor} = useTheme()
    const [data, setData] = useState<formData>({})

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setData((prevData: formData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSubmit (e: FormEvent) {
        e.preventDefault()
        const body = JSON.stringify(data)
        const res = await fetch("https://club.jactc.xyz/api/v1/club/register", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                //Authtoken: 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://club.jactc.xyz"
            },
            body: body
        }).then(res => res.json).catch(err => console.log(err))
        //manage res
    }

    return (
        <main className={background + color + "w-full h-[85vh] grid place-content-center"}>
            <section >
                <form onSubmit={handleSubmit} className="flex flex-col gap-3" action="">
                    <input onChange={handleChange} required className="text-black p-2 rounded-md" placeholder="Introduce the name for your club" type="text" name="name" id="" />
                    <textarea onChange={handleChange} required className="text-black p-2 rounded-md" placeholder="Introduce the perfect description for your club" name="description" id="" cols={30} rows={10}></textarea>
                    <button className="bg-blue-300 rounded-md mt-2 py-1" type="submit">Submit</button>
                </form>
            </section>
        </main>
    )
}