"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TrendingDown } from "lucide-react"
import { useState } from "react"
import { FormCreateExpenses } from "./FormCreateExpenses"

export const ToolbarCreateExpenses = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} className="w-full bg-gnrRed hover:bg-gnrRed/80 cursor-pointer flex items-center justify-start py-5">
                    <TrendingDown />
                    <span>Tambah Pengeluaran</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <FormCreateExpenses setIsOpen={setIsOpen} />
            </DialogContent>
        </Dialog>
    )
}