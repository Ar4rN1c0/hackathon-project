"use client"

import {useContext, useState, createContext, useEffect, Dispatch, SetStateAction} from "react"

type Session = {
    authToken: string,
    userId: string
}

type SessionContextType = {
    session: Session
    setSession: Dispatch<SetStateAction<Session>>
}

const SessionContext = createContext<SessionContextType>({
    session: {
        authToken: "NOT_SESSION",
        userId: "NOT_SESSION"
    },
    setSession: () => null

})

export default function SessionProvider ({children}: Readonly<{children: React.ReactNode}>) {
    const [session, setSession] = useState<Session>({authToken: "", userId: ""})
    
    return (
        <SessionContext.Provider value={{session, setSession}}>
            {children}
        </SessionContext.Provider>
    )
}

export function useSession () {
    return useContext(SessionContext)

}