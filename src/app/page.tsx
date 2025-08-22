import { getSession } from "@/actions/getSession";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const session = await getSession()


  return (
    <main>
      <section className="relative bg-cover bg-no-repeat -z-10" style={{backgroundImage: "url('/images/banner/mushola-alhidayah.jpg')"}}>
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 -z-10"></div>
        <div className="h-screen container max-w-5xl mx-auto px-4 md:px-0">
            <div className="h-full flex flex-col items-center justify-center gap-3">
              <strong className="bg-white/10 backdrop-blur-sm text-sm  p-2 rounded-full text-white">Website Resmi General</strong>
              <h2 className="text-center text-4xl font-bold text-white leading-12">Selamat Datang di <br /> Kampung Alhidayah(General) <br /> <span className="text-gnrPrimary">Desa Muncangela</span></h2>
              <p className="max-w-1/2 text-center text-white">Kampung yang indah dengan kerukunan warga dan saling gotong royong, menuju masa depan yang berkelanjutan</p>
              <div className="space-x-4">
                <Button className="bg-gnrPrimary rounded-full cursor-pointer text-gnrDarkBlue" asChild>
                  <Link href={"/"} className="text-sm font-bold px-2 z-10">Tentang Kami <ArrowRight className="mt-px" /></Link>
                </Button>
                <Button className="bg-white/20 border border-white/50 rounded-full cursor-pointer text-white" asChild>
                  <Link href={"/"} className="text-sm font-bold px-2 z-10">Hubungi Kami <ArrowRight className="mt-px" /></Link>
                </Button>
              </div>
            </div>
        </div>
      </section>

      <section>
        <div className="container max-w-5xl mx-auto px-4 md:px-0">
          {session && session.user.name}
          {session && new Date(session.expires).toLocaleString()}
        </div>
      </section>
    </main>
  );
}
