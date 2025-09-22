import Div from "../../motions/Div"
import { P } from "../../motions/P"
import { variantsFadeUp } from "../../motions/variants"
import { ActionHeroBanner } from "./ActionHeroBanner"
import { TitleHeroBanner } from "./TitleHeroBanner"

export const HeroBanner = () => {
    return (
        <section className="dark:from-gnrDarkBlue dark:to-gnrDark py-10 bg-gradient-to-br from-gnrPrimary/5">
            <div className="container max-w-6xl mx-auto px-4 lg:px-0 h-[580px] lg:h-[564px]">
                <div className="h-full flex flex-col items-center justify-center gap-8">
                    <Div initial="initial" animate="animate" variants={variantsFadeUp} className="text-gray-500 text-sm text-center max-w-[90%] md:max-w-full border border-white/5 rounded-full px-3 py-1.5 hover:shadow hover:border-white/10 transition-global duration-500">Solusi manajemen keuangan terdepan <strong className="dark:text-white text-blue-500">untuk bisnis modern</strong></Div>
                    <TitleHeroBanner />
                    <P initial="initial" animate="animate" variants={variantsFadeUp} className="text-gray-500 text-lg lg:max-w-[58%] text-center">Platform manajemen keuangan yang powerful dan mudah digunakan. Pantau arus kas, buat laporan, dan kelola event dalam satu tempat.</P>
                    <ActionHeroBanner />
                </div>
            </div>
        </section>
    )
}