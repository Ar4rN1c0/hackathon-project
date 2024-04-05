import { redirect } from "next/navigation"
import Dashboard from "../components/dashboard"
import { cookies } from "next/headers"
import validateUser from "../utils/fetchValidation"


export default async function DashboardPage() {
    const cookiesStored = cookies()
    const sessionCookies = cookiesStored.get("session")
    if (sessionCookies && sessionCookies.value.length > 0) {
        console.log(sessionCookies)
        if (await validateUser(JSON.parse(sessionCookies.value).authToken)) {
            return (
                <>
                    <Dashboard></Dashboard>
                </>
            )
        } 
    } else {
        redirect("auth/login")
    }
}