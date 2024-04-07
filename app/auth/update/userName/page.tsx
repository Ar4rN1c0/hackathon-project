"use client"

import { useSession } from "@/app/context/sessionContext"
import { useTheme } from "@/app/context/themeContext"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"

type dataForm = {
    fullName: string
}

export default function UpdateUserName() {
    const { session, setSession } = useSession()
    const [data, setData] = useState<dataForm>({ fullName: "" })
    const [tooShortName, setTooShort] = useState(false) 
    const { background, color, border, secondaryColor } = useTheme()
    const router = useRouter()
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setData(prevData => ({ ...prevData, [e.target.name]: e.target.value }))
    }
    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        console.log(data)
        const res = await fetch("https://club.jactc.xyz/api/v1/user/update/name", {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Authorization": "Bearer " + session.authToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            if(!res.ok) {
                setTooShort(true)
                return "Bad req"
            }
            setSession(prevsession => prevsession)
            return res.json()
        }).then(res => { 
            if(res !== "Bad req") {
                router.push("/profile")
            }
            return res 
        }).catch(err => console.error(err))
    }
    return (
        <main className={background + color + "w-full min-h-[85vh] grid place-content-center"}>
            <section className={secondaryColor + "rounded-md p-10"}>
                <h1 className="text-2xl font-bold text-center border-blue-400 border-b-4 mb-7 ">
                    Change your user name
                </h1>
                {tooShortName && (
                        <div className="mt-3 mb-0 p-3 text-center bg-red-500 text-white rounded-lg"> <button onClick={() => setTooShort(false)}>&#10006;</button> The name must contain at least 2 letters</div>
                    )}
                <article className="max-w-[250px] flex justify-center m-auto">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <h2 className="flex flex-row">Your current name is <p className="font-bold">&nbsp;&nbsp; {session.name}</p></h2>
                        <input className="px-2 py-1 rounded-md text-black" required onChange={handleChange} name="fullName" placeholder="New Name" type="text" />
                        <button className="mt-3 bg-blue-400 rounded-lg py-2" type="submit">Update</button>
                    </form>
                </article>
            </section>
        </main>
    )
}