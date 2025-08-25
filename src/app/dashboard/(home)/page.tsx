import { Metadata } from "next"
import { FinancialSummaryCards } from "./_components/financial-summary/FinancialSummaryCards"
import { FinancialChartPanel } from "./_components/FinancialChartPanel"

export const metadata: Metadata = {
    title: "Dashboard | Beranda"
}

const PageDashboard = () => {
    return (
        <section className="space-y-4">
            <div>
                <h3 className="text-3xl font-bold text-gnrDark">Dashboard</h3>
                <p className="text-gnrGray">Ringkasan aktivitas keuangan anda</p>
            </div>
            <FinancialSummaryCards />
            <FinancialChartPanel />
        </section>
    )
}

export default PageDashboard