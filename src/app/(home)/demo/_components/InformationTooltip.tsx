import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"


export const InformationTooltip = () => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="inline-block cursor-pointer md:hidden"><Info className="text-gnrRed" /></div>
            </TooltipTrigger>
            <TooltipContent>
                <p>Halaman demo ini lebih optimal di perangkat dengan layar besar. <br /> Gunakan desktop atau laptop agar tampilannya maksimal.</p>
            </TooltipContent>
        </Tooltip>
    )
}