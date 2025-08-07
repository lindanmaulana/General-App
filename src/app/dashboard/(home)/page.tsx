import { DashboardContent } from "@/app/dashboard/_components/DashboardContent"

const PageDashboard = () => {
    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-3xl font-bold text-gnrDark">Dashboard</h3>
                <p className="text-gnrGray">Ringkasan aktivitas keuangan anda</p>
            </div>
            <DashboardContent />
        </div>
    )
}

export default PageDashboard