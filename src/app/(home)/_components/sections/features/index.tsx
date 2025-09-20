import { FeaturesList } from "./FeturesList";

export const Features = () => {
    return (
        <section className="dark:bg-gnrDark py-24">
            <div className="container max-w-6xl mx-auto px-4 lg:px-0 space-y-6">
                <h2 className="dark:text-white text-3xl md:text-4xl font-bold text-center">Fitur Lengkap untuk Kebutuhan Anda</h2>
                <p className="text-center text-lg text-gnrGray">
                    Semua tools yang Anda butuhkan untuk mengelola keuangan bisnis secara efektif
                </p>

                <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    <FeaturesList />
                </article>
            </div>
        </section>
    );
};
