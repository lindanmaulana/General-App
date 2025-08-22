import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Home } from "lucide-react"
import Link from "next/link"

const SessionExpire = () => {
    return (
        <main className="w-full h-screen">
            <div className="h-full flex items-center justify-center">
                <Card className="max-w-[430px]">
                    <CardContent className="flex flex-col items-center justify-center px-5 gap-4">
                        <strong className="block bg-gnrOrange/30 rounded-full p-2">
                            <Clock className="text-gnrOrange size-7" />
                        </strong>

                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-2xl font-bold">Sesi Telah Berakhir</h3>
                            <p className="text-sm text-gnrGray max-w-3/4 text-center">Sesi login Anda telah berakhir. Silakan kembali ke halaman utama untuk melanjutkan.</p>
                        </div>
                        <Button className="w-full bg-gnrPrimary hover:bg-gnrPrimary/80" asChild>
                            <Link href={"/"} className="text-sm"><Home /> Kembali ke Beranda</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

export default SessionExpire