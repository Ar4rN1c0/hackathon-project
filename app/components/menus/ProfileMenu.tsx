import { useSession } from "@/app/context/sessionContext"
import { useTheme } from "@/app/context/themeContext"
import AccountIcon from "@/app/icons/AccountIcon"
import Link from "next/link"

export default function ProfileMenu() {
    const { background, color, border } = useTheme()
    const { session } = useSession()
    if (session.authToken !== "") {
        return (
            <nav className={background + border + color + " absolute z-40 border-2 rounded-md right-10 top-[70px] p-4"}>
                <section className="flex gap-2">
                    <AccountIcon size={100}></AccountIcon>
                    <article className="p-4">
                        <h3 className="text-xl">{session.userId}</h3>
                        <h4>ProfileSurname</h4>
                    </article>
                </section>
                <ul className="pl-[30px] mt-4 [&>li]:text-blue-900 border-slate">
                    <li>
                        <Link href="/profile">
                            My Profile
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile/settings">
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link href="/auth/logout">
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
    else {
        return (
            <nav className={background + border + color + " absolute z-40 border-2 rounded-md right-10 top-[70px] p-4"}>
                <ul className="pl-[30px] mt-4 [&>li]:text-blue-900 border-slate">
                    <li>
                        <Link href="/auth/login">
                            Login
                        </Link>
                    </li>
                    <li>
                        Dont have an account? 
                        <Link href="/auth/register">
                            Register
                        </Link>
                    </li>
                </ul>
            </nav>

        )
    }
}