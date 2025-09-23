"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, LayoutDashboard, TrendingDown, TrendingUp, Wallet, type LucideIcon } from "lucide-react";
import { useDemoStore } from "../_hooks/useDemoStore";
import Link from "next/link";

interface Demo {
    id: string;
    label: string;
    icon: LucideIcon;
}

const demoList: Demo[] = [
    {
        id: "DASHBOARD",
        label: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        id: "INCOMES",
        label: "Pemasukan",
        icon: TrendingUp,
    },
    {
        id: "EXPENSES",
        label: "Pengeluaran",
        icon: TrendingDown,
    },
    {
        id: "FUNDACCOUNTS",
        label: "Kas & Bank",
        icon: Wallet,
    },
    {
        id: "EVENTS",
        label: "Events",
        icon: Calendar,
    },
];

export const SidebarDemo = () => {
    const {id, handleSetActiveView} = useDemoStore()

    return (
        <div className="hidden md:block col-span-1 space-y-2">
            <Card className="dark:bg-gnrDarkBlueMate dark:border-white/10">
                <CardHeader>
                    <CardTitle className="dark:text-gnrWhite">Navigasi Demo</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-1">
                        {demoList?.map(item => (
                            <li key={item.id} className="w-full">
                                <Button onClick={() => handleSetActiveView({id: item.id, label: item.label})} variant={"ghost"} className={`${id === item.id ? "dark:bg-gnrWhite dark:hover:bg-gnrWhite/80 dark:text-gnrDark dark:hover:text-gnrDark/80 bg-gnrPrimary hover:bg-gnrPrimary/80 text-gnrWhite hover:text-gnrWhite" : "dark:text-gnrWhite text-gnrDark"} w-full flex items-center justify-start gap-5 cursor-pointer`}> <item.icon /> <span>{item.label}</span></Button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card className="dark:bg-gnrDarkBlueMate dark:border-white/10">
                <CardHeader className="text-center">
                    <CardTitle className="dark:text-gnrWhite">Fitur Lengkap</CardTitle>
                    <CardDescription>Akses semua fitur dengan akun premium</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="dark:bg-gnrWhite dark:hover:bg-gnrWhite/80 dark:text-gnrDark bg-gnrPrimary hover:bg-gnrPrimary/80 hover:scale-110 transition-global duration-500 w-full cursor-pointer" asChild>
                        <Link href={"/dashboard/login"}>Mulai Gratis</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};
