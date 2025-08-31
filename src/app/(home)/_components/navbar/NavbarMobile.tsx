"use client"

import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { useNavbar } from "@/lib/zustand/useNavbar"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToogle } from "../tooggle/ThemeTooggle"

export const NavbarMobile = () => {
    const isActive = useNavbar((state) => state.isActive)
    const handleNabar = useNavbar((state) => state.handleNavbar)

    const pathname = usePathname()
        
    const isActiveRoute = (route: string) => {
        if(route !== pathname) return ""
        
        return "border-l-4 border-gnrPrimary translate-x-4"
    }

    return (
        <>
            <Button onClick={handleNabar} className="block md:hidden bg-transparent text-black dark:text-white hover:bg-transparent cursor-pointer z-50">
                {isActive ? <X className="size-7" /> :  <Menu className="size-7" />}
            </Button>

            <div className={`fixed inset-0 bg-black/40 h-screen ${isActive ? "opacity-100" : "opacity-0  pointer-events-none"} transition-global`}></div>

            <div className={`${isActive ? "translate-y-0" : "-translate-y-full opacity-0"} w-full fixed top-0 left-0 h-80 transition-global bg-white dark:bg-black`}>
                <NavigationMenu className="`*:px-4 flex md:hidden flex-col justify-start items-start gap-5 py-10 px-2">
                    <NavigationMenuLink className="rounded-none" asChild>
                        <Link href={"/"} className={`w-full text-black dark:text-white ${isActiveRoute("/")} font-semibold`}>BERANDA</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="rounded-none" asChild>
                        <Link href={"/berita"} className={`w-full text-black dark:text-white ${isActiveRoute("/berita")} font-semibold`}>BERITA</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="rounded-none" asChild>
                        <Link href={"/galeri"} className={`w-full text-black dark:text-white ${isActiveRoute("/galeri")} font-semibold`}>GALERI</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="rounded-none" asChild>
                        <div>
                            <ThemeToogle />
                        </div>
                    </NavigationMenuLink>
                </NavigationMenu>
            </div>
        </>
    )
}