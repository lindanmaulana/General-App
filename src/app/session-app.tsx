import { getSession } from "@/actions/getSession"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface SessionAppProps {
    children: ReactNode
}
const SessionApp = async ({children}: SessionAppProps) => {
    const session = await getSession()
    return (
        <SessionProvider refetchOnWindowFocus={false} session={session}>
            {children}
        </SessionProvider>
    )
}

export default SessionApp