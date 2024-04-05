"use client"

import { useGetCookies } from "../utils/getcookies"
import { useContext, useState, createContext, useEffect, Dispatch, SetStateAction } from "react"
import getName from "../hooks/useGetInfo"
import validateToken from "../utils/fetchValidation"

export type Session = {
    authToken: string,
    userId: string,
    name: string
}

type SetSessionFunc = (session: SetStateAction<Session>, sessionValue?: Session) => void

type SessionContextType = {
    session: Session
    setSession: SetSessionFunc
}

const SessionContext = createContext<SessionContextType>({
    session: {
        authToken: "NOT_SESSION",
        userId: "NOT_SESSION",
        name: ""
    },
    setSession: () => null

})

export default function SessionProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    
    const [session, setSession] = useState<Session>({ authToken: "", userId: "", name: "" })
    useEffect(() => {
        if (session.authToken === "") {
            const geta = async () => {
                const cookiesStoredSession = Object.fromEntries(document.cookie.split(";").map(cookie => {
                    const [name, value] = cookie.replaceAll(" ", "").split("=")
                    
                    return [name, value]
                }))
                if(cookiesStoredSession.session) {
                    const token = JSON.parse(cookiesStoredSession.session).authToken
                    if(token) {
                        if(await validateToken(token)) {
                            setSession(JSON.parse(cookiesStoredSession.session))
                        }
                    }
                }
            }
            geta()
        }
    }, [])
    function useChangeSession(newSession: SetStateAction<Session>) {
        setSession(newSession)
    }
    useEffect(() => {
        if (session.authToken !== "") {
            if (session.name === "" && session.authToken !== "") {
                getName(session.userId, session.authToken, setSession)
            }
            document.cookie = `session=${JSON.stringify(session)}; path=/`
        }
    }, [session])
    return (
        <SessionContext.Provider value={{ session, setSession: useChangeSession }}>
            {children}
        </SessionContext.Provider>
    )
}

export function useSession() {
    const { session, setSession } = useContext(SessionContext)
    async function logout() {
        for (let val in session) {
            setSession(prevSession => ({ ...prevSession, [val]: "" }))
        }
        document.cookie = "session=;path=/"
        return session
    }
    return { session, setSession, logout }

}