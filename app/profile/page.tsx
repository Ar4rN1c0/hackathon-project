import { cookies } from "next/headers";
import validateUser from "../utils/fetchValidation";
import {redirect} from "next/navigation"
import getThemeColors from "../utils/themeColors";
import { Theme } from "../context/themeContext";
import ProfilePage from "../components/ProfilePage";

export default async function Profile () {
    const cookiesStored = cookies()
    const sessionCookies = cookiesStored.get("session")
    const themeCookie = cookiesStored.get("theme")
    console.log(themeCookie)
    let colors = getThemeColors("light")
    if(themeCookie) {
        colors = getThemeColors(themeCookie.value as unknown as Theme)
    }
    if (sessionCookies && sessionCookies.value.length > 0) {
        if (await validateUser(JSON.parse(sessionCookies.value).authToken)) {
            return (
                <ProfilePage></ProfilePage>
            )
        } 
    } else {
        redirect("auth/login")
    }
    
}