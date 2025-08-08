import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

const PageIncomes = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-3xl font-bold text-gnrDark">Pemasukan</h3>
                    <p className="text-gnrGray">Kelola semua sumber pemasukan anda</p>
                </div>
                <Button className="bg-gnrPrimary cursor-pointer hover:bg-gnrPrimary/80">
                    <Plus />
                    <span>Tambah Pemasukan</span>
                </Button>
            </div>
            
            <Card className="w-full bg-gnrGreen/10 border border-gnrGreen/30">
                <CardContent >
                    <div>
                        <h4 className="text-gnrGreen font-semibold">Total Pemasukan Bulan Ini</h4>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default PageIncomes