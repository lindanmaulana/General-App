import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ChartPie, FileText, Globe, LucideIcon, Shield, TrendingUp } from "lucide-react"
import Div from "../../motions/Div"
import { variantsChildrenFadeUp } from "../../motions/variants"


interface Features {
    id: number
    icon: LucideIcon
    label: string
    description: string
    isComingSoon?: boolean
}

const featuresList: Features[] = [
    {
        id: 1,
        icon: TrendingUp,
        label: "Kelola Keuangan",
        description: "Pantau pemasukan dan pengeluaran dengan mudah dan akurat"
    },
    {
        id: 2,
        icon: ChartPie,
        label: "Analisis Mendalam",
        description: "Dapatkan insight finansial dengan visualisasi data yang jelas"
    },
    {
        id: 3,
        icon: FileText,
        label: "Laporan Otomatis",
        description: "Generate laporan keuangan dalam berbagai format secara otomatis",
    },
    {
        id: 4,
        icon: Shield,
        label: "Keamanan Terjamin",
        description: "Data keuangan Anda aman dengan enkripsi"
    },
    {
        id: 5,
        icon: Calendar,
        label: "Manajemen Event",
        description: "Kelola event dan acara dengan fitur dokumentasi foto yang",
        isComingSoon: true
    },
    {
        id: 6, 
        icon: Globe,
        label: "Akses Kapan Saja",
        description: "Akses data keuangan Anda darimana saja dan kapan saja"
    }
]

export const FeaturesList = () => {
    return (
        <>
            {featuresList?.map(feature => (
                <Div key={feature.id} variants={variantsChildrenFadeUp}>
                    <Card key={feature.id} className="dark:bg-gnrDark p-0 dark:shadow-gnrWhite/10 border border-gnrPrimary/10 shadow-xs hover:shadow-2xl hover:-translate-y-6 hover:scale-110 rounded-lg transition-global duration-500 group">
                        <CardContent className="p-8">
                            <article  className="space-y-4">
                                <h3 className="dark:text-gnrWhite text-lg font-semibold flex items-center gap-4">
                                    <span className="dark:bg-gnrWhite/10 dark:group-hover:bg-gnrWhite/20 inline-block bg-gnrPrimary/10 group-hover:bg-gnrPrimary/20 transition-global rounded-lg p-2">
                                        <feature.icon className="dark:text-gnrWhite size-5 text-gnrPrimary" />
                                    </span>{" "}
                                    {feature.label}
                                </h3>
                                <p className="text-gnrGray">{feature.description} {feature.isComingSoon && <Badge className="text-xs bg-gnrGreen">Segera Hadir</Badge>}</p>
                            </article>
                        </CardContent>
                    </Card>
                </Div>
            ))}
        </>
    )
}