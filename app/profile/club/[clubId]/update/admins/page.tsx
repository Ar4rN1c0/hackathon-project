import UpdateAdminsClient from "./UpdateAdminsClient";

export default async function UpdateAdminsPage({params}: {params: {clubId: string}}) {
    const clubInfo = await fetch("https://club.jactc.xyz/api/v1/club/club/" + params.clubId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).catch(err => console.error(err)) as unknown as {name: string, clubId: string, description: string, admins: string[], activities: string[]}
    console.log(clubInfo)
    const admins: any[] = []
    for (let i = 0; i < clubInfo.admins.length; i++) {
        const res = await fetch("https://club.jactc.xyz/api/v1/user/profile/" + clubInfo.admins[i], {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            
        }).then(res => res.json()).then(res => {console.log(res); return res}).catch(err => console.error(err))
        admins.push({...res, id: clubInfo.admins[i]})
    }
    return (
        <UpdateAdminsClient clubId={params.clubId} adminsInfo={admins}></UpdateAdminsClient>
    )
}