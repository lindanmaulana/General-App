import { getSession } from "@/actions/getSession"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import App from "./app"

interface SessionAppProps {
    children: ReactNode
}
const SessionApp = async ({children}: SessionAppProps) => {
    const session = await getSession()
    return (
        <SessionProvider refetchOnWindowFocus={false} session={session}>
            <App>{children}</App>
        </SessionProvider>
    )
}

export default SessionApp