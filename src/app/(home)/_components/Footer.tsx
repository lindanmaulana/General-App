"use client"

import { MapPinHouse } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

export const Footer = () => {
    const pathname = usePathname()

    if(pathname.startsWith("/dashboard") || pathname === "/session/expire") return null
    
    return (
        <footer className="relative py-20 bg-gnrDarkBlue -z-10">
            <Image src={'/images/banner/lines.png'} alt="Line" width={100} height={100} className="absolute bottom-0 -left-9 w-full h-56 -z-10" unoptimized />
            <div className="z-20 container max-w-5xl mx-auto px-4 lg:px-0">
                <section className="flex justify-between">
                    <section className="w-[60%] space-y-3">   
                        <strong className="text-xl text-gnrWhite font-bold">Kami hadir untuk menciptakan ekosistem yang mendukung kemandirian dan kesejahteraan, di mana setiap individu memiliki kesempatan untuk berkembang.</strong>
                    </section>
                    <section className="w-[30%]  space-y-3">
                        <h2 className="text-xl font-bold text-gnrWhite flex items-center gap-2"><MapPinHouse /> <span>General | Desa. Mucangela</span></h2>
                        <p className="text-gnrWhite font-light">Desa Muncangela, Kampung Pahing (Alhidayah), RT 06, RW 03, Kecamatan Cipicung, Kabupaten Kuningan, Jawa Barat, 45592.</p>
                    </section>
                </section>

                <hr className="my-20" />

                <section className="flex items-center justify-between">
                    <p className="text-gnrWhite font-semibold">Copyright © 2025 generalofficial</p>
                </section>
            </div>
        </footer>
    )
}