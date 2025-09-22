import { Article } from "../../motions/Article";
import { variantsContainerFadeUpComponents } from "../../motions/variants";
import { KeyMetricsList } from "./KeyMetricsList";

export const KeyMetrics = () => {
    return (
        <section className="dark:bg-gnrDark py-10">
            <div className="container max-w-6xl mx-auto px-4 lg:px-0">
                <Article initial="initial" whileInView="animate" variants={variantsContainerFadeUpComponents} viewport={{once: true, amount: 0.5}} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    <KeyMetricsList />
                </Article>
            </div>
        </section>
    );
};