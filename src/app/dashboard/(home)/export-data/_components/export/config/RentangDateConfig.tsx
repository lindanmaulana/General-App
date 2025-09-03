"use client"

import { DatePickerMultipleMonth } from "@/components/date-picker/DatePicketMultipleMonth"
import { useExportData } from "@/lib/zustand/useExportData"
import { useState } from "react"
import { DateRange } from "react-day-picker"

export const RentangDateConfig = () => {
    const handleSetConfig = useExportData((state) => state.setConfig)
    const [date, setDate] = useState<DateRange | undefined>(undefined)

    const handleDatePicker = (e: DateRange | undefined) => {
        const fromDate = e?.from?.toISOString()
        const toDate = e?.to?.toISOString()

        handleSetConfig({date: {start_date: fromDate, end_date: toDate}})
        setDate(e)
    }

    return (
        <div className='space-y-2'>
            <h4 className="text-lg font-medium">Rentang Tanggal</h4>
            <DatePickerMultipleMonth title="Bulan - Bulan" date={date} onDateChange={(e) => handleDatePicker(e)}  />
        </div>
    )
}