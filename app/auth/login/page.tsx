"use client"

import { useTheme } from "@/app/context/themeContext"
import { ChangeEvent, FormEvent, useState } from "react"
import { useSession } from "@/app/context/sessionContext"

type dataForm = {
    email: string,
    password: string
} | {}

export default function LoginPage () {
    const {background, border, color} = useTheme()
    const [data, setData] = useState<dataForm>({})
    const {session, setSession} = useSession()
    
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setData((prevData: dataForm) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSubmit (e: FormEvent) {
        e.preventDefault()
        const body = JSON.stringify(data)
        const res = await fetch("https://club.jactc.xyz/api/v1/auth/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://club.jactc.xyz/"
            },
            body: body
        }).then(res => res.json()).catch(err => console.log(err))
        console.log(res)
        setSession({authToken: res?.accessToken, userId: res?.userId})
    }
    return (
        <main className={background + color + "w-full h-[85vh] grid place-content-center"}>
            <section>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3" action="">
                    <input onChange={handleChange} className="text-black px-2 py-1 rounded-md" placeholder="Your email" required type="text" name="email" id="" />
                    <input onChange={handleChange} className="text-black px-2 py-1 rounded-md" placeholder="Your password" required type="password" name="password" id="" />
                    <button className="bg-blue-300 rounded-md py-1 mt-2" type="submit">Submit</button>
                </form>
            </section>
        </main>
    )
}