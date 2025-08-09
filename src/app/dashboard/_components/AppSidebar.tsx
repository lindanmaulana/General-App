"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { CreditCard, LayoutDashboard, LogOutIcon, TrendingDown, TrendingUp, Wallet, type LucideIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Item {
    title: string
    url: string
    icon: LucideIcon
}

export const AppSidebar = () => {
    const pathname = usePathname()
    const items: Item[] = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard
        },
        { 
            title: "Pemasukan", 
            url: "/dashboard/incomes", 
            icon: TrendingUp,
        },
        { 
            title: "Pengeluaran", 
            url: "/pengeluaran", 
            icon: TrendingDown,
        },
        { 
            title: "Kas & Bank", 
            url: "/dashboard/fund-accounts", 
            icon: Wallet,
        },
        { 
            title: "Kartu Kredit", 
            url: "/kartu-kredit", 
            icon: CreditCard,
        },
    ]

    const getActiveRoute = (route: string) => {
        return route === pathname ? "bg-gnrPrimary text-white" : ""
    }
    return (
        <Sidebar>
            <SidebarHeader className="flex flex-row items-center gap-2 p-4 border-b">
                    <Image src={"/images/logo/general.png"} alt="General Muncangela" width={40} height={40} />
                    <div>
                        <h2 className="text-gnrDarkBlue font-bold">General CashFlow</h2>
                        <p className="text-sm text-gnrGray">Management</p>
                    </div>
            </SidebarHeader>
            <SidebarContent className="py-4 px-2">
                <SidebarGroup>
                    <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items?.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton className={`${getActiveRoute(item.url)} hover:bg-gnrPrimary/40`} asChild>
                                        <Link href={item.url} className="font-medium flex items-center gap-3 py-5">
                                            <item.icon />
                                            <h3>{item.title}</h3>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem className="px-2">
                        <SidebarMenuButton className="bg-gnrRed hover:bg-gnrRed/70 cursor-pointer" asChild>
                            <button className="px-2 text-white flex items-center gap-3">
                                <LogOutIcon />
                                <span>Logout</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}