import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Features } from "./(home)/_components/sections/features";
import { HeroBanner } from "./(home)/_components/sections/hero-banner";
import { KeyMetrics } from "./(home)/_components/sections/key-metrics";
import { MainFeatures } from "./(home)/_components/sections/main-features";

export default async function Home() {
  return (
    <>

      <HeroBanner />
      <KeyMetrics />
      <Features />
      <MainFeatures />

      <section className="py-10">
        <div className="container max-w-6xl mx-auto px-4 lg:px-0">
          <div className="flex flex-col items-center justify-center gap-6 bg-gradient-to-r from-gnrPrimary/10 py-14 px-8 rounded-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center">Siap untuk mengoptimalkan keuangan Anda?</h2>
              <p className="text-center text-lg text-gnrGray max-w-[80%] md:max-w-[60%]">Permudah pengelolaan keuangan tim Anda. Gunakan CashFlow untuk mengelola semua transaksi dan laporan dengan mudah.</p>
              <Button className="!px-12 py-5 text-white text-base font-semibold shadow-xl bg-gnrPrimary hover:bg-gnrPrimary/80 hover:scale-105 cursor-pointer transition-global duration-300" asChild>
                <Link href={"/dashboard/login"}>Mulai Sekarang <ArrowRight /></Link>
              </Button>
          </div>    
        </div>
      </section>
    </>
  );
}
