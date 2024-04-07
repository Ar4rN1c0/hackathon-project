import { cookies } from "next/headers"
import UserClient from "./UserClient"
import { redirect } from "next/navigation"

export default async function UserPage({ params }: { params: { userId: string } }) {
    const reqcookies = cookies()
    if (reqcookies.get("session")) {
        const session = JSON.parse(reqcookies.get("session").value as string)
        if(session.userId === params.userId) {
            redirect("/profile")
        }
    }
    const user = await fetch("https://club.jactc.xyz/api/v1/user/profile/" + params.userId, {
        method: "GET",
        headers: {
            "Content-type": "application/JSON"
        }
    }).then(res => res.json())
    console.log(user)
    const clubs = []
    for (let i = 0; i < user.clubs.length; i++) {
        const clubInfo = await fetch("https://club.jactc.xyz/api/v1/club/club/" + user.clubs[i], {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).catch(err => console.error(err)) as unknown as { name: string, clubId: string, description: string, admins: string[], activities: string[] }
        clubs.push(clubInfo)
    }
    const activities = []
    console.log(user.activities)
    if (user.activities.length > 1) {
        for (let i = 0; i < user.activities.length; i++) {
            const res = await fetch("https://club.jactc.xyz/api/v1/club/activities/" + user.activities[i], {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => { return res.json() }).then(res => { console.log(res); return res }).catch(err => console.error(err));
            activities.push(res);
        }
    }
    console.log(activities)
    return (
        <UserClient dataActivities={activities} dataClubs={clubs} userInfo={{ ...user, userId: params.userId }}>
        </UserClient>
    )
}