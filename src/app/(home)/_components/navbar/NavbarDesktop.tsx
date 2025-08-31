"use client"

import { NavigationMenu, NavigationMenuLink } from "@/components/ui/navigation-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToogle } from "../tooggle/ThemeTooggle"



export const NavbarDesktop = () => {
    const pathname = usePathname()
        
    const isActive = (route: string) => {
        if(route !== pathname) return ""
        
        return "bg-gnrPrimary hover:bg-gnrPrimary/50 text-gnrWhite"
    }

    return (
        <NavigationMenu className={`hidden md:flex space-x-3 *:px-4 `}>
            <NavigationMenuLink asChild>
                <Link href={"/"} className={`text-black dark:text-gnrWhite ${isActive("/")} font-semibold`}>BERANDA</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
                <Link href={"/berita"} className={`text-black dark:text-gnrWhite ${isActive("/berita")} font-semibold`}>BERITA</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
                <Link href={"/galeri"} className={`text-black dark:text-gnrWhite ${isActive("/galeri")} font-semibold`}>GALERI</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
                <ThemeToogle />
            </NavigationMenuLink>
        </NavigationMenu>
    )
}