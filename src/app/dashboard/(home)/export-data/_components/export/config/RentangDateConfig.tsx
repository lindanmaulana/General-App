"use client"

import { DatePickerMultipleMonth } from "@/components/date-picker/DatePicketMultipleMonth"
import { useExportData } from "@/lib/zustand/useExportData"
import { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"

export const RentangDateConfig = () => {
    const rentangDate = useExportData((state) => state.date)
    const handleSetConfig = useExportData((state) => state.setConfig)

    const [date, setDate] = useState<DateRange | undefined>(undefined)

    useEffect(() => {
        if(rentangDate?.start_date && rentangDate?.end_date) {
            const fromDate = new Date(rentangDate.start_date)
            const toDate = new Date(rentangDate.end_date)

            if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) setDate({ from: fromDate, to: toDate })
        } else {
            setDate(undefined)
        }
    }, [rentangDate])

    const handleDatePicker = (e: DateRange | undefined) => {
        const fromDate = e?.from?.toISOString()
        const toDate = e?.to?.toISOString()

        handleSetConfig({date: {start_date: fromDate, end_date: toDate}})
        setDate(e)
    }

    return (
        <div className='space-y-2'>
            <h4 className="dark:text-gnrWhite text-lg font-medium">Rentang Tanggal</h4>
            <DatePickerMultipleMonth title="Bulan - Bulan" date={date} onDateChange={(e) => handleDatePicker(e)}  />
        </div>
    )
}