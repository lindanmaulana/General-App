import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Dashboard"
}

interface LayoutDashboard {
    children: ReactNode
}

const LayoutDashboard = ({children}: LayoutDashboard) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default LayoutDashboard