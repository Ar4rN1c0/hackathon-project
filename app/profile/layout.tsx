import { cookies } from "next/headers";
import validateUser from "../utils/fetchValidation";
import { redirect } from "next/navigation"
import getThemeColors from "../utils/themeColors";
import { Theme } from "../context/themeContext";

export default async function Profile({ children }: Readonly<{ children: React.ReactNode }>) {
    const cookiesStored = cookies()
    const sessionCookies = cookiesStored.get("session")
    const themeCookie = cookiesStored.get("theme")
    if (sessionCookies && sessionCookies.value.length > 0) {
        const sessionValue = JSON.parse(sessionCookies.value)
        if (await validateUser(sessionValue.authToken)) {
            return (
                <>
                    {children}
                </>
            )
        } else {
            redirect("/auth/login")
        }
    } else {
        redirect("/auth/login")
    }
} 
