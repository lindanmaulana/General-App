"use client"

import { CustomTooltip } from "@/components/CustomTooltip"
import { Button } from "@/components/ui/button"
import { useExportData } from "@/lib/zustand/useExportData"
import { RefreshCw } from "lucide-react"

export const ResetConfigurationExportToolbar = () => {
    const handleResetConfig = useExportData((state) => state.resetConfig)

    return (
        <CustomTooltip textTooltip="Reset Konfigurasi">
            <Button variant={"outline"} onClick={handleResetConfig} size={"sm"} className="active:rotate-180 px-4 text-gnrRed hover:text-gnrRed/80 cursor-pointer"><RefreshCw /></Button>
        </CustomTooltip>
    )
}