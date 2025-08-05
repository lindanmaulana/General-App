import { Metadata } from "next"
import { ReactNode } from "react"


export const metadata: Metadata = {
    title: "Dashboard | Auth"
}

interface LayoutAuth {
    children: ReactNode
}

const LayoutAuth = ({children}: LayoutAuth) => {
    return (
        <section className="py-12 h-screen">
            <div className="container max-w-sm min-h-full mx-auto flex flex-col justify-center px-4 md:px-0">
                <h2 className="text-gnrDarkBlue font-bold text-lg text-left">General App</h2>
                
                {children}
            </div>
        </section>
    )
}

export default LayoutAuth