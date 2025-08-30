"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { NavbarList } from "./NavbarList"

export const NavbarMobile = () => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const handleHamburger = () => {
        setIsActive(!isActive)
    }
    return (
        <>
            <Button onClick={handleHamburger} className="block md:hidden bg-transparent text-gnrDarkBlue hover:bg-transparent cursor-pointer">
                {isActive ? <X className="size-7" /> :  <Menu className="size-7" />}
            </Button>

            {isActive && <NavbarList style="fixed top-20 right-0 min-w-screen h-full flex md:hidden flex-col justify-start items-start py-10 bg-white/50 backdrop-blur-md" />}
        </>
    )
}