import { Dispatch, SetStateAction } from "react"
import type { Session } from "../context/sessionContext"

export default function getName(userId: string, authToken: string, setterCallback: Dispatch<SetStateAction<Session>>) {
    const res = fetch("https://club.jactc.xyz/api/v1/user/profile/" + userId, {
        method: "GET",
        mode: "cors",
        headers: {
            "Authorization": "Bearer " + authToken,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://club.jactc.xyz"
        }
    }).then(res => { console.log(res); return res.json() }).then(res => {
        setterCallback(prevSession => ({ ...prevSession, name: res.name }));
        return res
    }).catch(err => console.error(err)) as unknown as { name: string }

}