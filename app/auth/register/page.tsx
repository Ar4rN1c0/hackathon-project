"use client"

import { useTheme } from "@/app/context/themeContext";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

type formData = {
    fullName: string,
    email: string,
    password: string
} | {}

export default function RegisterPage() {
    const { background, color, secondaryColor, border } = useTheme()
    const [data, setData] = useState<formData>({})
    const router = useRouter()
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setData((prevData: formData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const body = JSON.stringify(data)
        const res = await await fetch("https://club.jactc.xyz/api/v1/auth/register", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://club.jactc.xyz/api/v1/auth/register"
            },
            body: body
        }).then(res => res.json()).then(res => router.push("/auth/login")) as { message: string, success: boolean }


    }
    return (
        <main className={background + color + "w-full h-[85vh] grid place-content-center"}>
            <section className={secondaryColor + "rounded-lg p-10"}>
                <h1 className="text-2xl font-bold text-center pb-2 border-b-4 border-blue-400">
                    Register
                </h1>
                <article>
                    <form action="" onSubmit={handleSubmit} className={" flex flex-col gap-2 [&>input]:text-black [&>input]:bg-blue-200 [&>input]:rounded-md [&>input]:p-1 [&>input]:pl-3   p-10 rounded-md"}>
                        <label htmlFor="" id="name"></label>
                        <input required name="fullName" onChange={handleChange} className="focus:bg-slate-100 focus:border-2 focus:border-slate-200 box-content" placeholder="Your full Name" type="text" id="" />
                        <label htmlFor="" id="email"></label>
                        <input required name="email" onChange={handleChange} className="focus:bg-slate-100 focus:border-2 focus:border-slate-200 box-content" placeholder="Your Email" type="text" id="" />
                        <label htmlFor="" id="password"></label>
                        <input required name="password" onChange={handleChange} className="focus:bg-slate-100 focus:border-2 focus:border-slate-200 focus:text-black box-content" placeholder="Your password" type="password" id="" />
                        <button className="bg-blue-400 py-2 px-1 rounded-md cursor-pointer hover:translate-y-[-3px] hover:shadow-sm mt-2" type="submit">Submit</button>
                    </form>
                </article>
            </section>
        </main>
    )
}