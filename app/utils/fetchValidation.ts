export default async function validateUser (token: string) {
    let url = "https://club.jactc.xyz/api/v1/auth/validate/"
    let options = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    }
    const res = await fetch(url, options).then(res => res.json()).catch(err => console.error(err))
    return res?.success
}