import { cookies } from "next/headers";
import ProfileClient from "./ProfileClient";
import type { Session } from "../context/sessionContext";

export default async function ProfilePage() {
    const cookiesStored = cookies();
    const sessionCookies = cookiesStored.get("session") as unknown as {value: string}
    const themeCookie = cookiesStored.get("theme");

    const clubs: any[] = [];
    const activities: any[] = []
    const sessionValue = JSON.parse(sessionCookies.value);
    const profileData = await fetch("https://club.jactc.xyz/api/v1/user/profile/" + sessionValue.userId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionValue.authToken
        }
    }).then(res => res.json()).catch(err => console.error(err));
    console.log(profileData)
    if (await profileData.clubs.length > 0) {
        for (let i = 0; i < profileData.clubs.length; i++) {
            const res = await fetch("https://club.jactc.xyz/api/v1/club/club/" + profileData.clubs[i], {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => { return res.json() }).catch(err => console.error(err));

            clubs.push(res);
        }
    }
    if (await profileData.activities) {
        for (let i = 0; i < profileData.activities.length; i++) {
            const res = await fetch("https://club.jactc.xyz/api/v1/club/activities/" + profileData.activities[i], {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => { console.log(res.status);return res.json() }).then(res => {console.log(res); return res} ).catch(err => console.error(err));
            activities.push({...res, id: profileData.activities[i]});
        }
    }
    console.log(activities)

    return (
        <ProfileClient dataClubs={clubs} dataActivities={activities} />
    )
}
