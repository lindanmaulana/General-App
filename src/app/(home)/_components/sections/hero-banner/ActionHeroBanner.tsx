import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Div from "../../motions/Div";
import { variantsChildrenFadeUp, variantsContainerFadeUpComponents } from "../../motions/variants";

export const ActionHeroBanner = () => {
    return (
        <Div initial="initial" animate="animate" variants={variantsContainerFadeUpComponents} className="flex items-center gap-6 py-4">
            <Div variants={variantsChildrenFadeUp}>
                <Button className="dark:bg-white dark:hover:bg-white/80 dark:text-black !px-8 py-6 text-white font-semibold shadow-xl bg-gnrPrimary text-lg hover:bg-gnrPrimary/80 hover:scale-105 cursor-pointer transition-global duration-300" asChild>
                    <Link href={"/dashboard/login"}>Mulai Sekarang <ArrowRight className="mt-1" /></Link>
                </Button>
            </Div>

            <Div variants={variantsChildrenFadeUp} transition={{duration: 0.8, delay: 0.8}}>
                <Button
                    variant={"outline"}
                    className="dark:bg-transparent dark:text-white dark:border-white/10 !px-8 py-6 font-semibold shadow-xl bg-transparent text-lg cursor-pointer"
                    asChild
                >
                    <Link href={"/demo"}>Lihat Demo</Link>
                </Button>
            </Div>
        </Div>
    );
};