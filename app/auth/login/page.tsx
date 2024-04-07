"use client"

import { useTheme } from "@/app/context/themeContext"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useSession } from "@/app/context/sessionContext"
import { useRouter } from "next/navigation"
import getName from "@/app/hooks/useGetInfo"

type dataForm = {
    email: string,
    password: string
} | {}

export default function LoginPage() {
    const { background, border, color, secondaryColor } = useTheme()
    const [data, setData] = useState<dataForm>({})
    const [notValidData, setValidData] = useState(false)
    const { session, setSession } = useSession()
    const router = useRouter()

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setData((prevData: dataForm) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSubmit(e: FormEvent) {
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
        }).then(res => {
            if(!res.ok) {
                return "Bad res"
            }
            return res.json()
        }).then(res => {
            if (!(res === "Bad res")) {
                setSession(prevSession => ({ name: "", authToken: res.accessToken, userId: res.userId }))
            }
            return res
        }).then((res) => {
            if(!(res === "Bad res")) {
                router.push("/dashboard")
            } else {
                setValidData(true)
            }
        })
        router.refresh()
    }
    return (
        <main className={background + color + "w-full h-[85vh] grid place-content-center"}>
            <section className={secondaryColor +  "p-10 rounded-lg"}>
                <h1 className="text-center text-2xl mb-7 font-bold pb-2 border-b-4 border-blue-400">
                    Please Log in
                </h1>
                <article>
                    {notValidData && (
                        <div className="mb-7 p-3 text-center bg-red-500 text-white rounded-lg"> <button onClick={() => setValidData(false)}>&#10006;</button> Not valid email or password</div>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3" action="">
                        <input onChange={handleChange} className="text-black px-2 py-1 bg-slate-100 rounded-md" placeholder="Your email" required type="text" name="email" id="" />
                        <input onChange={handleChange} className="text-black px-2 py-1 bg-slate-100 rounded-md" placeholder="Your password" required type="password" name="password" id="" />
                        <button className="bg-blue-300 rounded-md py-1 mt-2" type="submit">Submit</button>
                    </form>
                </article>
            </section>
        </main>
    )
}