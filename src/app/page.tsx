import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <section className="relative bg-cover bg-no-repeat -z-10" style={{backgroundImage: "url('/images/banner/mushola-alhidayah.jpg')"}}>
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 -z-10"></div>
        <div className="h-screen container max-w-5xl mx-auto px-4 lg:px-0">
            <div className="h-full flex flex-col items-center justify-center gap-3">
              <strong className="bg-white/10 backdrop-blur-sm text-sm  p-2 rounded-full text-white">Website Resmi General</strong>
              <h2 className="text-center text-4xl md:text-5xl font-bold text-white leading-12">Selamat Datang di <br /> Kampung Alhidayah(General) <br /> <span className="text-gnrPrimary">Desa Muncangela</span></h2>
              <p className="max-w-1/2 text-center text-white">Kampung yang indah dengan kerukunan warga dan saling gotong royong, menuju masa depan yang berkelanjutan</p>
              <div className="space-x-4">
                <Button className="bg-gnrPrimary rounded-full cursor-pointer text-gnrDarkBlue" asChild>
                  <Link href={"/"} className="text-sm text-white font-bold px-2 z-10">Tentang Kami <ArrowRight className="mt-px" /></Link>
                </Button>
                <Button className="bg-white/20 border border-white/50 rounded-full cursor-pointer text-white" asChild>
                  <Link href={"/"} className="text-sm font-bold px-2 z-10">Hubungi Kami <ArrowRight className="mt-px" /></Link>
                </Button>
              </div>
            </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-5xl mx-auto px-4 lg:px-0">
          <h2 className="text-4xl font-bold text-center">Tentang <span className="text-gnrPrimary">Kami</span></h2>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 py-14">
            <section className="space-y-4">
              <h3 className="text-4xl font-bold leading-12">Mewujudkan Perubahan Berkelanjutan</h3>
              <p className="text-sm text-gnrGray">Organisasi Kami didirikan pada tahun 2013 dengan misi untuk memberdayakan masyarakat melalui pendidikan, pelatihan, dan pengembangan komunitas. Selama lebih dari satu dekade, kami telah menjalankan berbagai program yang berdampak positif bagi ribuan orang.</p>
              <p className="text-sm text-gnrGray">Visi kami adalah menciptakan masyarakat yang mandiri, sejahtera, dan berkelanjutan, di mana setiap individu memiliki kesempatan untuk berkembang dan mencapai potensi terbaik mereka.</p>
            </section>

            <section>
              <Image src={"/images/program/kemerdekaan.jpg"} alt="General | Kemerdekaan Indonesia" width={100} height={100} className="w-full h-full rounded-lg" unoptimized />
            </section>
          </section>
        </div>
      </section>
      
      <section className="py-20 bg-[#f8fafc]">
        <div className="container max-w-5xl mx-auto px-4 lg:px-0">
          <h2 className="text-4xl font-bold text-center">Program <span className="text-gnrPrimary">Kami</span></h2>

          <section className="py-20 grid grid-cols-1 md:grid-cols-3 gap-7">
            <article className="bg-white shadow-lg rounded-xl hover:-translate-y-3 transition-global hover:shadow-2xl hover:shadow-gnrGray/50 group overflow-hidden">
              <div className="h-56 overflow-hidden">
                <Image src={"/images/program/kemerdekaan.jpg"} alt="General | Kemerdekaan Indonesia" width={100} height={100} className="w-full h-full object-cover group-hover:scale-125 transition-global rounded-t-md" unoptimized />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-bold">General | Karnaval 17 Agustus</h3>
                <p className="text-base text-gnrGray">General berpartisipasi dalam Karnaval 17 Agustus sebagai bentuk dukungan terhadap perayaan Hari Kemerdekaan Republik Indonesia, sekaligus mempererat kebersamaan dengan masyarakat.</p>
              </div>
            </article>
            <article className="bg-white shadow-lg rounded-xl hover:-translate-y-3 transition-global hover:shadow-2xl hover:shadow-gnrGray/50 group overflow-hidden">
              <div className="h-56 overflow-hidden">
                <Image src={"/images/program/kemerdekaan.jpg"} alt="General | Kemerdekaan Indonesia" width={100} height={100} className="w-full h-full object-cover group-hover:scale-125 transition-global rounded-t-md" unoptimized />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-bold">General | Karnaval 17 Agustus</h3>
                <p className="text-base text-gnrGray">General berpartisipasi dalam Karnaval 17 Agustus sebagai bentuk dukungan terhadap perayaan Hari Kemerdekaan Republik Indonesia, sekaligus mempererat kebersamaan dengan masyarakat.</p>
              </div>
            </article>
            <article className="bg-white shadow-lg rounded-xl hover:-translate-y-3 transition-global hover:shadow-2xl hover:shadow-gnrGray/50 group overflow-hidden">
              <div className="h-56 overflow-hidden">
                <Image src={"/images/program/kemerdekaan.jpg"} alt="General | Kemerdekaan Indonesia" width={100} height={100} className="w-full h-full object-cover group-hover:scale-125 transition-global rounded-t-md" unoptimized />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-bold">General | Karnaval 17 Agustus</h3>
                <p className="text-base text-gnrGray">General berpartisipasi dalam Karnaval 17 Agustus sebagai bentuk dukungan terhadap perayaan Hari Kemerdekaan Republik Indonesia, sekaligus mempererat kebersamaan dengan masyarakat.</p>
              </div>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}
