"use client"
import { useSession } from "@/app/context/sessionContext"
import { useTheme } from "@/app/context/themeContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function LogoutPage() {
    const { logout } = useSession()
    const { background, color } = useTheme()
    const router = useRouter()
    
    async function handleLogout() {
        await logout().then(res => {
            // Borra la cookie aquí
            document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            return res
        }).then(res => {
            // Comprueba cada 100 milisegundos si la cookie se ha borrado
            const checkCookie = setInterval(() => {
                if (document.cookie.indexOf('session=') === -1) {
                    clearInterval(checkCookie);
                    sessionStorage.setItem('reloaded', "true");
                    window.location.reload()
                    router.replace("/auth/login")
                }
                return res
            }, 100)
        })
    }
    useEffect(() => {
        if (!sessionStorage.getItem('reloaded')) {
        } else {
            sessionStorage.removeItem('reloaded');
            router.push("/auth/login")
        }

    }, [])

    return (
        <main className={background + color + "w-full h-[85vh] grid place-content-center"}>
            <button className="bg-blue-300 py-2 px-4 rounded-md" onClick={handleLogout}>
                Logout
            </button>
        </main>
    )
}