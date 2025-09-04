import { RefreshCw } from "lucide-react"

const LoadingDashboardPage = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <RefreshCw className="animate-spin" />
        </div>
    )
}

export default LoadingDashboardPage