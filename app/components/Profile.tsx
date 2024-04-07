import AccountIcon from "../icons/AccountIcon"
import { useState, useRef } from "react"
import useClickOutside from "../hooks/useClickOutside"
import ProfileMenu from "./menus/ProfileMenu"
import { useSession } from "../context/sessionContext"

export default function Profile() {
    const [showProfile, setShowProfile] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const {session} = useSession()
    useClickOutside(ref, setShowProfile, false)
    function handleClick() {
        setShowProfile(!showProfile)
    }
    return (
        <div ref={ref} className="grid place-content-center" onClick={handleClick}>
            <AccountIcon id={session.userId}/>
            {showProfile && <ProfileMenu/>}
        </div>
    )
}