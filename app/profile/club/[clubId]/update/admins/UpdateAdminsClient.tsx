"use client"

import { useSession } from "@/app/context/sessionContext"
import { useTheme } from "@/app/context/themeContext"
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from "react"

interface dataForm {
    club: string,
    admins: string[]
}

export default function UpdateAdminsClient ({adminsInfo, clubId}: {adminsInfo: any[], clubId: string}) {

    const { session } = useSession()
    const [data, setData] = useState<dataForm>({ admins: adminsInfo.map(admin => admin.id), club: clubId})
    const [admins, setAdmins] = useState(adminsInfo)
    const [inputAdmin, setInputAdmin] = useState("")
    const [isBadData, setBadData] = useState(false)
    const { background, color, border, secondaryColor } = useTheme()
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInputAdmin(e.target.value)
    }
    async function handleUpdate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        async function getInfo() {
            const res = await fetch("https://club.jactc.xyz/api/v1/user/profile/" + inputAdmin, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            } ).then(res => res.json()).then(res => {console.log(res); return res}).catch(err => console.error(err))
            return res
        }
        const newAdmin = await fetch("https://club.jactc.xyz/api/v1/club/club/update/addAdmins", {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer " + session.authToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({admins: [inputAdmin], club: clubId}),
            mode: "cors"
        }).then(res => {
            console.log(res.ok)
            if(res.ok) {
                
                return res.json()
            } else {
                return "Bad req"
            }
        }).then(res => {
            if(res === "Bad req") {
                setBadData(true)
            } else {
                console.log(res)
                setAdmins(prev => [...prev, getInfo()])
                //e.target.reset()
            }
        })
    }
    function removeAdmin (id: string ) {
        setAdmins((prevadmins: typeof admins) => {
            return prevadmins.filter(admin => admin.id !== id)
        })
    }
    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setData(prevData => ({...prevData, admins: admins}))
        console.log(data)
        const res = await fetch("https://club.jactc.xyz/api/v1/club/club/update/admins", {
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
                    Change the club's admins
                </h1>
                <article className="max-w-[250px] flex flex-col justify-center m-auto">
                    <h2 className="text-center mb-3">Currently the admins are: </h2>
                    <ul className="list-disc pl-5 mb-5 mt-2 flex flex-col gap-2">
                        {admins.map(admin => (
                            <li className="flex justify-around align-middle" key={admin.id}><p className="mt-[7px]">{admin.name}</p> <button id={admin.id} onClick={admins.length > 1 ? (e) => {removeAdmin(admin.id)} : () => {setAdmins(admins)}} className={ (admins.length > 1 ? "bg-red-800 cursor-pointer" : "bg-gray-500 cursor-not-allowed") + (" text-sm p-3 rounded-lg")}>Remove from admin</button></li>
                        ))}
                    </ul>
                    {isBadData && (
                        <article className="bg-red-700 p-4 rounded-md mb-4 mt-2 flex justify-around">
                            Not a valid user id <button  onClick={() => setBadData(false)}>&#10006;</button>
                        </article>
                    )}
                    <form onSubmit={handleUpdate} className="flex gap-3 justify-center" action="">
                        <input className="px-2 py-1 rounded-md text-black" required onChange={handleChange} name="description" placeholder="Add Admins (user Id)" /> 
                        <button className="bg-blue-400 p-2 rounded-md min-w-fit" type="submit">+ Admin</button>
                    </form>
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <button className="mt-3 bg-blue-400 rounded-lg py-2" type="submit">Update</button>
                    </form>
                </article>
            </section>
        </main>
    )
}