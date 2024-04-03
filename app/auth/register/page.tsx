"use client"

import { useTheme } from "@/app/context/themeContext";
import { ChangeEvent, FormEvent, useState } from "react";

type formData = {
    fullName: string,
    email: string,
    password: string
} | {}

export default function RegisterPage() {
    const { background, color, secondaryColor, border } = useTheme()
    const [data, setData] = useState<formData>({})
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setData((prevData: formData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const body = JSON.stringify(data)
        const res = await fetch("https://club.jactc.xyz/api/v1/auth/register", {
            mode: "cors",
            credentials: 'include',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://club.jactc.xyz/api/v1/auth/register"
            },
            body: body
        }).then(res => res.json) as {message: string, success: boolean}
        const status = res.success === true
        console.log(status)

    }
    return (
        <main className={background + color + "w-full h-[85vh] grid place-content-center"}>
            <h1>
                Register
            </h1>
            <section className="">
                <form action="" onSubmit={handleSubmit} className={secondaryColor + " flex flex-col gap-2  [&>input]:bg-blue-200 [&>input]:rounded-md [&>input]:p-1 [&>input]:pl-3   p-10 rounded-md"}>
                    <label htmlFor="" id="name"></label>
                    <input required name="fullName" onChange={handleChange} className="focus:bg-slate-100 focus:border-2 focus:border-slate-200 box-content" placeholder="Your full Name" type="text" id="" />
                    <label htmlFor="" id="email"></label>
                    <input required name="email" onChange={handleChange} className="focus:bg-slate-100 focus:border-2 focus:border-slate-200 box-content" placeholder="Your Email" type="text" id="" />
                    <label htmlFor="" id="password"></label>
                    <input required name="password" onChange={handleChange} className="focus:bg-slate-100 focus:border-2 focus:border-slate-200 focus:text-black box-content" placeholder="Your password" type="password" id="" />
                    <button className="bg-blue-400 py-2 px-1 rounded-md cursor-pointer hover:translate-y-[-3px] hover:shadow-sm mt-2" type="submit">Submit</button>
                </form>
            </section>
        </main>
    )
}