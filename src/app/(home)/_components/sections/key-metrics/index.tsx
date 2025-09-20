import { KeyMetricsList } from "./KeyMetricsList";

export const KeyMetrics = () => {
    return (
        <section className="dark:bg-gnrDark py-10">
            <div className="container max-w-6xl mx-auto px-4 lg:px-0">
                <article className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    <KeyMetricsList />
                </article>
            </div>
        </section>
    );
};
