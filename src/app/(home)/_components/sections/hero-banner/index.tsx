import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const HeroBanner = () => {
    return (
        <section className="dark:from-gnrDarkBlue dark:to-gnrDark py-10 bg-gradient-to-br from-gnrPrimary/5">
            <div className="container max-w-6xl mx-auto px-4 lg:px-0 h-[520px] lg:h-[564px]">
                <div className="h-full flex flex-col items-center justify-center gap-8">
                    <div className="text-gray-500 text-sm text-center max-w-[90%] md:max-w-full border border-white/5 rounded-full px-3 py-1.5 hover:shadow hover:border-white/10 transition-global duration-500">Solusi manajemen keuangan terdepan <strong className="dark:text-white text-blue-500">untuk bisnis modern</strong></div>
                    <h1 className="dark:text-white md:flex flex-col items-center justify-center text-4xl lg:text-6xl font-bold text-center">
                    Kelola Keuangan dengan 
                    <span className="dark:from-white dark:to-gnrDarkBlue bg-gradient-to-r from-blue-600 to-gray-100 text-transparent bg-clip-text">CashFlow</span>
                    </h1>
                    <p className="text-gray-500 text-lg lg:max-w-[58%] text-center">Platform manajemen keuangan yang powerful dan mudah digunakan. Pantau arus kas, buat laporan, dan kelola event dalam satu tempat.</p>

                    <div className="flex items-center gap-6 py-4">
                        <Button className="dark:bg-white dark:text-black !px-8 py-6 text-white font-semibold shadow-xl bg-gnrPrimary text-lg hover:bg-gnrPrimary/80 hover:scale-105 cursor-pointer transition-global duration-300">Mulai Sekarang <ArrowRight /></Button>
                        <Button variant={"outline"} className="dark:bg-transparent dark:text-white dark:border-white/10 !px-8 py-6 font-semibold shadow-xl bg-transparent text-lg cursor-pointer" asChild>
                            <Link href={"/dashboard/login"}>Lihat Demo</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}