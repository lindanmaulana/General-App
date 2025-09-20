import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { ReactNode } from "react";
import { AppSidebar } from "../_components/AppSidebar";
import { ThemeToogle } from "@/app/(home)/_components/ThemeTooggle";

export const metadata: Metadata = {
    title: "Dashboard",
};

interface LayoutDashboard {
    children: ReactNode;
}

const LayoutDashboard = ({ children }: LayoutDashboard) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="bg-white dark:bg-black w-full">
                <div className="w-full p-3 flex items-center justify-between border-b">
                    <SidebarTrigger className="mt-px dark:text-gnrWhite" />
                    <div className="flex items-center gap-2">
                        <ThemeToogle style="!text-sm !size-8" />
                        <h2 className="text-gnrGray text-sm">Selamat Datang di GeneralCashFlow</h2>
                    </div>
                </div>
                <section className="p-6">{children}</section>
            </main>
        </SidebarProvider>
    );
};

export default LayoutDashboard;
