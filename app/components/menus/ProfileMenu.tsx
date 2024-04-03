import { useTheme } from "@/app/context/themeContext"
import AccountIcon from "@/app/icons/AccountIcon"

export default function ProfileMenu () {
    const {background, color, border} = useTheme()
    return (
        <nav className={background + border + color + " absolute z-40 border-2 rounded-md right-10 top-[70px] p-4"}>
            <section className="flex gap-2">
                <AccountIcon size={100}></AccountIcon>
                <article className="p-4">
                    <h3 className="text-xl">ProfileName</h3>
                    <h4>ProfileSurname</h4>
                </article>
            </section>
            <ul className="pl-[30px] mt-4 [&>li]:text-blue-900 border-slate">
                <li>
                    <a href="/profile">
                        My Profile
                    </a>
                </li>
                <li>
                    <a href="/profile/settings">
                        Settings
                    </a>
                </li>
                <li>
                    <a href="/auth/logout">
                        Logout
                    </a>
                </li>
            </ul>
        </nav>
    )
}