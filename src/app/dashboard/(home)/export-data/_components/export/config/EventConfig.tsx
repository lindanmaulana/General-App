"use client"

import { events } from '@/app/api/_lib/models/events';
import { BaseCard } from '@/components/base-card/BaseCard';
import { BaseCardContent } from '@/components/base-card/BaseCardContent';
import { Checkbox } from '@/components/ui/checkbox';
import { handleParseDate } from '@/lib/helpers/parsing';
import { queryGetAllEventsOnlyOptions } from '@/lib/queries/events';
import { useExportData } from '@/lib/zustand/useExportData';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from 'lucide-react';


export const EventConfig = () => {
    const {data, isLoading, isError} = useQuery(queryGetAllEventsOnlyOptions())
    const handleSetConfig = useExportData((state) => state.setConfig)
    const events = useExportData((state) => state.events)

    if(isLoading) return <p>Loading please wait..</p>
    if(isError) return <></>

    return (
        <div className='space-y-2'>
            <h4 className="text-lg font-medium">Filter berdasarkan Event</h4>
            <p className='text-sm text-gnrGray'>Pilih event tertentu untuk export data (opsional)</p>

            <div className='h-60 overflow-y-scroll space-y-2'>
                {data?.map((event: events) => {
                    const date = handleParseDate(event.date, "YYYY-MM-DD")

                    return (
                    <BaseCard key={event.id} style='p-2 rounded-md'>
                        <BaseCardContent style='flex gap-3 p-2'>
                            <Checkbox onCheckedChange={(check) => handleSetConfig(check ? {events: [...events, event.code]} : {events: events.filter(e => e !== event.code)})} className='size-5 active:bg-gnrPrimary/20' checked={events.includes(event.code)} />
                            <div className='space-y-1'>
                                <h5 className='text-sm font-medium'>{event.name}</h5>
                                <p className='flex items-center gap-1 text-xs text-gnrGray'><Calendar className='size-2.5' />{date}</p>
                            </div>
                        </BaseCardContent>
                    </BaseCard>
                )})}
            </div>
        </div>
    )
}