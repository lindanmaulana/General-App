import { getSession } from "@/actions/getSession"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ReactNode } from "react"


export const metadata: Metadata = {
    title: "Dashboard | Auth"
}

interface LayoutAuth {
    children: ReactNode
}

const LayoutAuth = async ({children}: LayoutAuth) => {
    const session = await getSession()

    if(session?.user) return redirect("/dashboard")
    return (
        <section className="dark:bg-black h-screen">
            <div className="container max-w-sm min-h-full mx-auto flex items-center justify-center px-4 md:px-0">
                {children}
            </div>
        </section>
    )
}

export default LayoutAuth