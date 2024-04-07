"use client"

import { useSession } from "@/app/context/sessionContext"
import { useTheme } from "@/app/context/themeContext"
import { ChangeEvent, FormEvent, useState } from "react"

type dataForm = {
    avatar: string,
}

export default function UpdateClubLogo({params}: {params: {clubId: string}}) {
    const { session } = useSession()
    const [data, setData] = useState<dataForm>({avatar: ""})
    const { background, color, border, secondaryColor } = useTheme()
    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length === 1) {
            setData({avatar: files[0] as unknown as string});
        }
    };
    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        console.log(data.avatar)
        const form = new FormData()
        form.append("avatar", data.avatar)
        const res = await fetch("https://club.jactc.xyz/api/v1/user/update/avatar/", {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Authorization": "Bearer " + session.authToken,
                "Access-Control-Allow-Origin": "https://club.jactc.xyz"
            },
            body: form
        }).then(res => res.json()).then(res => { console.log(res); return res }).catch(err => console.error(err))
    }
    return (
        <main className={background + color + "w-full min-h-[85vh] grid place-content-center"}>
            <section>
                <h1 className="text-2xl font-bold text-center border-blue-400 border-b-4 mb-7 ">
                    Update Logo
                </h1>
                <article className="max-w-[250px] flex justify-center m-auto">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <input className="px-2 py-1 rounded-md text-black" required onChange={handleImageUpload} name="avatar" placeholder="Select an image" type="file" />
                        <button className="mt-3 bg-blue-400 rounded-lg py-2" type="submit">Update</button>
                    </form>
                </article>
            </section>
        </main>
    )
}