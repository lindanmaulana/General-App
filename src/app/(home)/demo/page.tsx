import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SidebarDemo } from "./_components/SidebarDemo"
import { PageDemo } from "./_components/PageDemo"
import { InformationTooltip } from "./_components/InformationTooltip"

const DemoPage = () => {
    return (
        <>
            <section className="dark:from-gnrDarkBlue dark:to-gnrDark py-10 bg-gradient-to-br from-gnrPrimary/5">
                <div className="container max-w-6xl mx-auto px-4 lg:px-0 py-16">
                    <Link href={"/"} className="dark:text-white flex items-center gap-4 font-medium"><ArrowLeft size={16} className="mt-px" /> Kembali ke Beranda</Link>

                    <div className="py-6">
                        <h2 className="dark:text-white text-3xl md:text-4xl font-bold">Demo CashFlow <InformationTooltip /></h2>
                        <p className="text-lg text-gnrGray">Lihat bagaimana CashFlow bekerja dengan data contoh</p>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-6">
                        <SidebarDemo />
                        <PageDemo />
                    </div>
                </div>
            </section>
        </>
    )
}

export default DemoPage