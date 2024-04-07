import ActivityClient from "./ActivityClient";

export default async function ActivityPage ({params}: {params: {activityId: string, clubId: string}}) {
    const activityData = await fetch("https://club.jactc.xyz/api/v1/club/activities/" + params.activityId,  {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    const clubInfo = await fetch("https://club.jactc.xyz/api/v1/club/club/" + activityData.club,  {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    console.log(clubInfo)
    return <ActivityClient activityData={{...activityData, clubName: clubInfo.name}}/> 
}