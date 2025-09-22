import { Article } from "../../motions/Article";
import H2 from "../../motions/H2";
import { P } from "../../motions/P";
import { variantsContainerFadeUpComponents, variantsFadeUp } from "../../motions/variants";
import { MainFeaturesList } from "./MainFeaturesList";

export const MainFeatures = () => {
    return (
        <section className="dark:bg-gnrDarkBlue py-24 bg-gnrPrimary/3">
            <div className="container max-w-6xl mx-auto px-4 lg:px-0 space-y-6">
                <H2 initial="initial" whileInView="animate" variants={variantsFadeUp} viewport={{once: true, amount: 0.5}} className="dark:text-white text-3xl md:text-4xl font-bold text-center">Mulai Kelola Keuangan Anda</H2>
                <P initial="initial" whileInView="animate" variants={variantsFadeUp} viewport={{once: true, amount: 0.5}} className="text-center text-lg text-gnrGray">Pilih menu yang ingin anda akses untuk memulai</P>

                <Article initial="initial" whileInView="animate" variants={variantsContainerFadeUpComponents} viewport={{once: true, amount: 0.5}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    <MainFeaturesList />
                </Article>
            </div>
        </section>
    );
};