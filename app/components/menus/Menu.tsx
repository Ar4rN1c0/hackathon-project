import { useTheme } from "@/app/context/themeContext"
import Link from "next/link"

const personalMenuItems = [
    {content: "Find Activites", href: "/dashboard"},
    {content: "Create a club", href: "/auth/register/club"},
    {content: "Your clubs", href: "/profile"},
    {content: "Settings", href: "/settings"}
]


export default function Menu () {
    const {background, border} = useTheme()
    return (
        <nav className={background + border + "border-2 rounded-md p-8 absolute right-10 top-[70px]"}>
            <ul className="flex flex-col gap-3">
                {personalMenuItems.map(item => (
                    <li key={item.content}>
                        <Link className="text-blue-800 text-lg hover:text-xl hover:text-blue-700" href={item.href}>
                            {item.content}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}