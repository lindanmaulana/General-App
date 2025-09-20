import { MainFeaturesList } from "./MainFeaturesList";

export const MainFeatures = () => {
    return (
        <section className="dark:bg-gnrDarkBlue py-24 bg-gnrPrimary/3">
            <div className="container max-w-6xl mx-auto px-4 lg:px-0 space-y-6">
                <h2 className="dark:text-white text-3xl md:text-4xl font-bold text-center">Mulai Kelola Keuangan Anda</h2>
                <p className="text-center text-lg text-gnrGray">Pilih menu yang ingin anda akses untuk memulai</p>

                <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    <MainFeaturesList />
                </article>
            </div>
        </section>
    );
};
