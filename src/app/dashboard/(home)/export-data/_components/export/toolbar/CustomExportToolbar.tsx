"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useExportData } from "@/lib/zustand/useExportData"
import { Download } from "lucide-react"

export const CustomExportToolbar = () => {
    const formatFile = useExportData((state) => state.format)
    const dateFile = useExportData((state) => state.date)
    const categoryDataFile = useExportData((state) => state.category_data)
    const eventsFile = useExportData((state) => state.events)

    console.log({formatFile, dateFile, categoryDataFile, eventsFile})
    return (
        <Dialog key={"custom-export-toolbar"}>
            <DialogTrigger asChild>
                <Button className='w-full'><Download /> Mulai Export</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Export data custom</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogContent>
        </Dialog>
    )
}