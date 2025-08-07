"use client"
import { NavigationMenu, NavigationMenuLink } from "@/components/ui/navigation-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavbarListProps {
    style?: string
}

export const NavbarList = ({style}: NavbarListProps) => {
        const pathname = usePathname()
    
        const isActive = (route: string) => {
            if(route !== pathname) return "text-white"
    
            return "bg-gnrPrimary hover:bg-gnrPrimary/50 text-gnrDarkBlue"
        }
    
    return (
        <NavigationMenu className={`${style} space-x-3 *:px-4 `}>
            <NavigationMenuLink asChild>
                <Link href={"/"} className={`text-gnrDarkBlue ${isActive("/")}`}>Beranda</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
                <Link href={"/berita"} className={`text-gnrDarkBlue ${isActive("/berita")}`}>Berita</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
                <Link href={"/galeri"} className={`text-gnrDarkBlue ${isActive("/galeri")}`}>Galeri</Link>
            </NavigationMenuLink>
        </NavigationMenu>
    )
}