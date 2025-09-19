import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, ChartColumn, ChartPie, FileText, Globe, Shield, TrendingUp, Wallet } from "lucide-react";

export default async function Home() {
  return (
    <>
      <section className="dark:bg-gnrDark py-10 bg-gradient-to-br from-gnrPrimary/5">
        <div className="container max-w-6xl mx-auto px-4 lg:px-0 h-[520px] lg:h-[564px]">
          <div className="h-full flex flex-col items-center justify-center gap-8">
            <div className="text-gray-500 text-sm text-center max-w-[90%] md:max-w-full">Solusi manajemen keuangan terdepan <strong className="text-blue-500">untuk bisnis modern</strong></div>
            <h1 className="md:flex flex-col items-center justify-center text-4xl lg:text-6xl font-bold text-center">
              Kelola Keuangan dengan 
              <span className="bg-gradient-to-r from-blue-600 to-gray-100 text-transparent bg-clip-text">CashFlow</span>
            </h1>
            <p className="text-gray-500 text-lg lg:max-w-[58%] text-center">Platform manajemen keuangan yang powerful dan mudah digunakan. Pantau arus kas, buat laporan, dan kelola event dalam satu tempat.</p>

            <div className="flex items-center gap-6 py-4">
              <Button className="!px-8 py-6 text-white font-semibold shadow-xl bg-gnrPrimary text-lg hover:bg-gnrPrimary/80 hover:scale-105 cursor-pointer transition-global duration-300">Mulai Sekarang <ArrowRight /></Button>
              <Button variant={"outline"} className="!px-8 py-6 font-semibold shadow-xl bg-transparent text-lg cursor-pointer">Lihat Demo</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-6xl mx-auto px-4 lg:px-0">
          <article className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">

            <article className="flex flex-col items-center justify-center py-8">
              <div className="bg-gnrPrimary/10 rounded-full p-3 mb-6">
                <ChartColumn className="text-gnrPrimary" />
              </div>
              <div className="text-gnrDark font-bold text-2xl">10K+</div>
              <h2 className="text-gnrGray text-sm">Data Transaksi Dikelola</h2>
            </article>

            <article className="flex flex-col items-center justify-center py-8">
              <div className="bg-gnrPrimary/10 rounded-full p-3 mb-6">
                <Wallet className="text-gnrPrimary" />
              </div>
              <div className="text-gnrDark font-bold text-2xl">40</div>
              <h2 className="text-gnrGray text-sm">Akun Dikelola</h2>
            </article>

            <article className="flex flex-col items-center justify-center py-8">
              <div className="bg-gnrPrimary/10 rounded-full p-3 mb-6">
                <FileText className="text-gnrPrimary" />
              </div>
              <div className="text-gnrDark font-bold text-2xl">20</div>
              <h2 className="text-gnrGray text-sm">Laporan Dibuat</h2>
            </article>

            <article className="flex flex-col items-center justify-center py-8">
              <div className="bg-gnrPrimary/10 rounded-full p-3 mb-6">
                <Calendar className="text-gnrPrimary" />
              </div>
              <div className="text-gnrDark font-bold text-2xl">10</div>
              <h2 className="text-gnrGray text-sm">Event Dikelola</h2>
            </article>

          </article>
        </div>
      </section>

      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4 lg:px-0 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Fitur Lengkap untuk Kebutuhan Anda</h2>
          <p className="text-center text-lg text-gnrGray">Semua tools yang Anda butuhkan untuk mengelola keuangan bisnis secara efektif</p>

          <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

              <article className="border border-gnrPrimary/10 hover:shadow-xl hover:-translate-y-1.5 rounded-lg transition-global p-5 duration-500 space-y-4 group">
                <h3 className="text-lg font-semibold flex items-center gap-4"><span className="inline-block bg-gnrPrimary/10 group-hover:bg-gnrPrimary/20 transition-global rounded-lg p-2"><TrendingUp className="size-5 text-gnrPrimary" /></span> Kelola Keuangan </h3>
                <p className="text-gnrGray">Pantau pemasukan dan pengeluaran dengan mudah dan akurat</p>
              </article>

              <article className="border border-gnrPrimary/10 hover:shadow-xl hover:-translate-y-1.5 rounded-lg transition-global p-5 duration-500 space-y-4 group">
                <h3 className="text-lg font-semibold flex items-center gap-4"><span className="inline-block bg-gnrPrimary/10 group-hover:bg-gnrPrimary/20 transition-global rounded-lg p-2"><ChartPie className="size-5 text-gnrPrimary" /></span> Analisis Mendalam </h3>
                <p className="text-gnrGray">Dapatkan insight finansial dengan visualisasi data yang jelas</p>
              </article>

              <article className="border border-gnrPrimary/10 hover:shadow-xl hover:-translate-y-1.5 rounded-lg transition-global p-5 duration-500 space-y-4 group">
                <h3 className="text-lg font-semibold flex items-center gap-4"><span className="inline-block bg-gnrPrimary/10 group-hover:bg-gnrPrimary/20 transition-global rounded-lg p-2"><FileText className="size-5 text-gnrPrimary" /></span> Laporan Otomatis </h3>
                <p className="text-gnrGray">Generate laporan keuangan dalam format PDF secara otomatis</p>
              </article>

              <article className="border border-gnrPrimary/10 hover:shadow-xl hover:-translate-y-1.5 rounded-lg transition-global p-5 duration-500 space-y-4 group">
                <h3 className="text-lg font-semibold flex items-center gap-4"><span className="inline-block bg-gnrPrimary/10 group-hover:bg-gnrPrimary/20 transition-global rounded-lg p-2"><Shield className="size-5 text-gnrPrimary" /></span> Keamanan Terjamin </h3>
                <p className="text-gnrGray">Data keuangan Anda aman dengan enkripsi tingkat medium</p>
              </article>

              <article className="border border-gnrPrimary/10 hover:shadow-xl hover:-translate-y-1.5 rounded-lg transition-global p-5 duration-500 space-y-4 group">
                <h3 className="text-lg font-semibold flex items-center gap-4"><span className="inline-block bg-gnrPrimary/10 group-hover:bg-gnrPrimary/20 transition-global rounded-lg p-2"><Calendar className="size-5 text-gnrPrimary" /></span> Manajemen Event </h3>
                <p className="text-gnrGray">Kelola event dan acara dengan fitur dokumentasi foto yang <Badge className="text-xs bg-gnrGreen">Segera Hadir</Badge> </p>
              </article>

              <article className="border border-gnrPrimary/10 hover:shadow-xl hover:-translate-y-1.5 rounded-lg transition-global p-5 duration-500 space-y-4 group">
                <h3 className="text-lg font-semibold flex items-center gap-4"><span className="inline-block bg-gnrPrimary/10 group-hover:bg-gnrPrimary/20 transition-global rounded-lg p-2"><Globe className="size-5 text-gnrPrimary" /></span> Akses Kapan Saja </h3>
                <p className="text-gnrGray">Akses data keuangan Anda dari mana saja dan kapan saja</p>
              </article>

          </article>
        </div>
      </section>
      
      <section className="py-24 bg-gnrPrimary/3">
        <div className="container max-w-6xl mx-auto px-4 lg:px-0 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Mulai Kelola Keuangan Anda</h2>
          <p className="text-center text-lg text-gnrGray">Pilih menu yang ingin anda akses untuk memulai</p>

          <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

            <Card className="shadow-none hover:shadow-xl hover:-translate-y-3 transition-global duration-500">
              <CardContent className="">
                <article className="flex flex-col items-center justify-center text-center gap-2">
                  <div className="bg-gnrGreen/10 rounded-full p-3">
                    <TrendingUp className="text-gnrGreen size-6" />
                  </div>
                  <h3 className="text-lg font-semibold"> Pemasukan </h3>
                  <p className="text-gnrGray text-sm">Kelola dan catat semua pemasukan</p>
                </article>
              </CardContent>
            </Card>

            <Card className="shadow-none hover:shadow-xl hover:-translate-y-3 transition-global duration-500">
              <CardContent className="">
                <article className="flex flex-col items-center justify-center text-center gap-2">
                  <div className="bg-gnrRed/10 rounded-full p-3">
                    <ChartColumn className="text-gnrRed size-6" />
                  </div>
                  <h3 className="text-lg font-semibold"> Pengeluaran </h3>
                  <p className="text-gnrGray text-sm">Pantau dan kontrol pengeluaran</p>
                </article>
              </CardContent>
            </Card>

            <Card className="shadow-none hover:shadow-xl hover:-translate-y-3 transition-global duration-500">
              <CardContent className="">
                <article className="flex flex-col items-center justify-center text-center gap-2">
                  <div className="bg-gnrPrimary/10 rounded-full p-3">
                    <Wallet className="text-gnrPrimary size-6" />
                  </div>
                  <h3 className="text-lg font-semibold"> Kas dan Bank </h3>
                  <p className="text-gnrGray text-sm">Monitor saldo kas dan bank</p>
                </article>
              </CardContent>
            </Card>

            <Card className="shadow-none hover:shadow-xl hover:-translate-y-3 transition-global duration-500">
              <CardContent className="">
                <article className="flex flex-col items-center justify-center text-center gap-2">
                  <div className="bg-gnrOrange/10 rounded-full p-3">
                    <Calendar className="text-gnrOrange size-6" />
                  </div>
                  <h3 className="text-lg font-semibold"> Events </h3>
                  <p className="text-gnrGray text-sm">Kelola event dan dokumentasi</p>
                </article>
              </CardContent>
            </Card>

          </article>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-6xl mx-auto px-4 lg:px-0">
          <div className="flex flex-col items-center justify-center gap-6 bg-gradient-to-r from-gnrPrimary/10 py-14 px-8 rounded-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center">Siap untuk mengoptimalkan keuangan Anda?</h2>
              <p className="text-center text-lg text-gnrGray max-w-[80%] md:max-w-[60%]">Permudah pengelolaan keuangan tim Anda. Gunakan CashFlow untuk mengelola semua transaksi dan laporan dengan mudah.</p>
              <Button className="!px-12 py-5 text-white text-base font-semibold shadow-xl bg-gnrPrimary hover:bg-gnrPrimary/80 hover:scale-105 cursor-pointer transition-global duration-300">Mulai Sekarang <ArrowRight /></Button>
          </div>    
        </div>
      </section>
    </>
  );
}
