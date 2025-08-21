"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { handleParseDate } from "@/lib/helpers/parsing"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Calendar } from "./ui/calendar"

interface DatePickerMultipleProps {
    title: string
    date?: DateRange
    onDateChange: (range: DateRange | undefined) => void
}
export const DatePickerMultiple = ({title, date, onDateChange}: DatePickerMultipleProps) => {
    const startDate = date?.from ? handleParseDate(date.from, "YYYY-MM-DD") : undefined
    const endDate = date?.to ? handleParseDate(date.to, "YYYY-MM-DD") : undefined

    return (
        <Popover>
            <PopoverTrigger className="w-full md:w-1/5" asChild>
                <Button
                    variant={"outline"}
                    className={cn("min-w-[140px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                    <ChevronDownIcon className="w-4 h-4" />
                    {date ? `${startDate} - ${endDate}` : <span>{title}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar mode="range" selected={date} captionLayout="dropdown" onSelect={onDateChange} />
            </PopoverContent>
        </Popover>
    )
}