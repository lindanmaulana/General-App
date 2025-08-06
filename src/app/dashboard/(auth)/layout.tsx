import { getSession } from "@/actions/getSession"
import { Metadata } from "next"
import Image from "next/image"
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
        <section className="h-screen">
            <div className="container max-w-sm min-h-full mx-auto flex items-center justify-center px-4 md:px-0">
                <div className="w-full px-6 py-8 rounded-md border shadow-md hover:shadow-xl transition-global duration-200">
                    <h2 className="text-gnrDarkBlue font-bold text-lg text-left flex items-center gap-2"><Image src={"/images/logo/general.png"} alt="General13 Official" width={28} height={28} /> General App</h2>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default LayoutAuth