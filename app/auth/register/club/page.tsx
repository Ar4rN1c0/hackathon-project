import {cookies} from "next/headers"
import RegisterClub from "@/app/components/RegisterClub"
import validateUser from "@/app/utils/fetchValidation"
import {redirect} from "next/navigation"

export default async function RegisterClubPage () {
    const cookiesStored = cookies()
    const sessionCookies = cookiesStored.get("session")
    if (sessionCookies && sessionCookies.value.length > 0) {
        console.log(sessionCookies)
        if (await validateUser(JSON.parse(sessionCookies.value).authToken)) {
            return (
                <>
                    <RegisterClub></RegisterClub>
                </>
            )
        } 
    } else {
        redirect("/auth/login")
    }
}