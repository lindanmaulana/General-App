"use client"

import { DatePickerMultipleMonth } from "@/components/date-picker/DatePicketMultipleMonth"
import { useExportData } from "@/lib/zustand/useExportData"
import { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"

export const RentangDateConfig = () => {
    const handleSetConfig = useExportData((state) => state.setConfig)
    const startDate = useExportData((state) => state.start_date)
    const endDate = useExportData((state) => state.end_date)

    const [date, setDate] = useState<DateRange | undefined>(undefined)

    useEffect(() => {
        if(startDate && endDate) {
                const fromDate = new Date(startDate )
                const toDate = new Date(endDate)

                if(!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) setDate({from: fromDate, to: toDate})

        } else {
            setDate(undefined)
        }
    }, [startDate, endDate])

    const handleDatePicker = (e: DateRange | undefined) => {
        const fromDate = e?.from?.toISOString()
        const toDate = e?.to?.toISOString()

        handleSetConfig({start_date: fromDate, end_date: toDate})
        setDate(e)
    }

    return (
        <div className='space-y-2'>
            <h4 className="text-lg font-medium">Rentang Tanggal</h4>
            <DatePickerMultipleMonth title="Bulan - Bulan" date={date} onDateChange={(e) => handleDatePicker(e)}  />
        </div>
    )
}