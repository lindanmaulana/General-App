import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Plus, TrendingUp } from "lucide-react"
import { FormCreate } from "./_components/FormCreate"

const PageIncomes = () => {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-3xl font-bold text-gnrDark">Pemasukan</h3>
                    <p className="text-gnrGray">Kelola semua sumber pemasukan anda</p>
                </div>
                

               <FormCreate />
            </div>
            
            <Card className="w-full bg-gnrGreen/10 border border-gnrGreen/30">
                <CardContent className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h4 className="text-gnrGreen font-semibold">Total Pemasukan Bulan Ini</h4>
                        <strong className="text-2xl text-gnrGreen">Rp 19.000.000</strong>
                    </div>
                    <div className="self-start">
                        <TrendingUp className="size-5 text-gnrGreen" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default PageIncomes