import validateUser from "@/app/utils/fetchValidation"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function UpdateAuthLayout ({children}: Readonly<{children: React.ReactNode}>) {
    const cookiesStored = cookies()
    const sessionCookies = cookiesStored.get("session")
    if (sessionCookies && sessionCookies.value.length > 0) {
        if (await validateUser(JSON.parse(sessionCookies.value).authToken)) {
            return (
                <>
                    {children}
                </>
            )
        } 
    } else {
        redirect("/auth/login")
    }
}