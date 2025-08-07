import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Metadata } from "next"
import { ReactNode } from "react"
import { AppSidebar } from "../_components/AppSidebar"

export const metadata: Metadata = {
    title: "Dashboard"
}

interface LayoutDashboard {
    children: ReactNode
}

const LayoutDashboard = ({children}: LayoutDashboard) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <div className="w-full p-3 flex items-center justify-between border-b">
                    <SidebarTrigger className="mt-px" />
                    <h2 className="text-gnrGray text-sm">Selamat Datang di GeneralCashFlow</h2>
                </div>
                <section className="p-6">
                    {children}
                </section>
            </main>
        </SidebarProvider>
    )
}

export default LayoutDashboard

        // <section className="w-full flex">
        //     <section className="w-full max-w-[250px] flex h-screen relative translate-x-0">
        //         <aside>
        //             sidebar
        //         </aside>
        //     </section>
        //     <section className="flex flex-col w-full max-h-screen px-4">
        //         <section className="w-full h-auto sticky top-0 inset-0 px-4">
        //             <h2>Header dashboard</h2>
        //         </section>
        //         <section className="flex-1 overflow-y-auto py-4">
        //             {children}
        //         </section>
        //     </section>
        // </section>