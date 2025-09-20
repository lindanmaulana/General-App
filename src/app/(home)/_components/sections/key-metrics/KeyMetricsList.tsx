import { Calendar, ChartColumn, FileText, LucideIcon, Wallet } from "lucide-react"


interface Metrics {
    id: number
    icon: LucideIcon
    value: number
    label: string
}

const metricsList: Metrics[] = [
    {
        id: 1,
        icon: ChartColumn,
        value: 10,
        label: "Data Transaksi Dikelola"
    },
    {
        id: 2,
        icon: Wallet,
        value: 40,
        label: "Akun Dikelola"
    },
    {
        id: 3,
        icon: FileText,
        value: 20,
        label: "Laporan Dibuat"
    },
    {
        id: 4,
        icon: Calendar,
        value: 10,
        label: "Event Dikelola"
    }
]

export const KeyMetricsList = () => {
    return (
        <>
        {metricsList?.map(metric => (
            <article key={metric.id} className="flex flex-col items-center justify-center py-8">
                <div className="dark:bg-white/10 dark:hover:bg-white/20 bg-gnrPrimary/10 hover:bg-gnrPrimary/20 rounded-full p-3 mb-6">
                    <metric.icon className="dark:text-white text-gnrPrimary" />
                </div>
                <div className="dark:text-gnrWhite text-gnrDark font-bold text-2xl">{metric.value}+</div>
                <h2 className="text-gnrGray text-sm">{metric.label}</h2>
            </article>
        ))}
        </>
    )
}
