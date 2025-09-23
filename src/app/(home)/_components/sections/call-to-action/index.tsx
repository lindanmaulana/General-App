import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import H2 from "../../motions/H2";
import { variantsFadeUp } from "../../motions/variants";
import { P } from "../../motions/P";
import Div from "../../motions/Div";

export const CallToAction = () => {
    return (
        <section className="dark:bg-gnrDark py-10">
            <div className="container max-w-6xl mx-auto px-4 lg:px-0">
                <div className="flex flex-col items-center justify-center gap-6 bg-gradient-to-r from-gnrPrimary/10 py-14 px-8 rounded-xl">
                    <H2 initial="initial" whileInView="animate" variants={variantsFadeUp} viewport={{once: true}} className="dark:text-white text-2xl md:text-3xl font-bold text-center">Siap untuk mengoptimalkan keuangan Anda?</H2>
                    <P initial="initial" whileInView="animate" variants={variantsFadeUp} viewport={{once: true}} className="text-center text-lg text-gnrGray max-w-[80%] md:max-w-[60%]">Permudah pengelolaan keuangan tim Anda. Gunakan CashFlow untuk mengelola semua transaksi dan laporan dengan mudah.</P>
                    <Div initial="initial" whileInView="animate" variants={variantsFadeUp} viewport={{once: true}}>
                        <Button className="dark:bg-gnrWhite dark:hover:bg-gnrWhite/80 dark:text-gnrDark !px-12 py-5 text-white text-base font-semibold shadow-xl bg-gnrPrimary hover:bg-gnrPrimary/80 hover:scale-105 cursor-pointer transition-global duration-300" asChild>
                            <Link href={"/dashboard/login"}>Mulai Sekarang <ArrowRight className="mt-1" /></Link>
                        </Button>
                    </Div>
                </div>    
            </div>
        </section>
    )
}