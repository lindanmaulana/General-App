"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { handleParseDate } from "@/lib/helpers/parsing"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"

interface DatePickerProps {
    title: string
    date?: Date
    setDate: (date?: Date) => void
}
export const DatePicker = ({title, date, setDate}: DatePickerProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn("min-w-[140px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                    <ChevronDownIcon className="w-4 h-4" />
                    {date ? handleParseDate(date, "YYYY-MM-DD") : <span>{title}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar mode="single" selected={date} defaultMonth={date} captionLayout="dropdown" onSelect={setDate} />
            </PopoverContent>
        </Popover>
    )
}