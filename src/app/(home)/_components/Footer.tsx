"use client"

import { usePathname } from "next/navigation"

export const Footer = () => {
    const pathname = usePathname()

    if(pathname.startsWith("/dashboard") || pathname === "/session/expire") return null
    
    return (
        <footer className="py-20 bg-gnrDarkBlue">
            <div className="container max-w-5xl mx-auto px-4 lg:px-0">
                <section className="grid grid-cols-4 gap-3">
                    <section className="space-y-3">   
                        <h2 className="text-xl font-bold text-gnrWhite">General Muncangela</h2>
                        <p className="text-base text-gnrWhite/80">Mewujudkan perubahan positif melalui program-program berkelanjutan yang memberdayakan masyarakat.</p>
                    </section>
                </section>
            </div>
        </footer>
    )
}