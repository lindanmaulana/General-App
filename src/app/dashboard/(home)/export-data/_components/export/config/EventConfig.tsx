"use client"

import { BaseCard } from '@/components/base-card/BaseCard';
import { BaseCardContent } from '@/components/base-card/BaseCardContent';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from 'lucide-react';


export const EventConfig = () => {
    return (
        <div className='space-y-2'>
            <h4 className="text-lg font-medium">Filter berdasarkan Event</h4>
            <p className='text-sm text-gnrGray'>Pilih event tertentu untuk export data (opsional)</p>

            <div className='h-60 overflow-y-scroll space-y-2'>
                <BaseCard style='p-2 rounded-md'>
                    <BaseCardContent style='flex gap-3 p-2'>
                        <Checkbox className='size-5 active:bg-gnrPrimary/20' />
                        <div className='space-y-1'>
                            <h5 className='text-sm font-medium'>Cash Mushola</h5>
                            <p className='flex items-center gap-1 text-xs text-gnrGray'><Calendar className='size-2.5' /> 1/12/2025</p>
                        </div>
                    </BaseCardContent>
                </BaseCard>
                <BaseCard style='p-2 rounded-md'>
                    <BaseCardContent style='flex gap-3 p-2'>
                        <Checkbox className='size-5 active:bg-gnrPrimary/20' />
                        <div className='space-y-1'>
                            <h5 className='text-sm font-medium'>Cash Mushola</h5>
                            <p className='flex items-center gap-1 text-xs text-gnrGray'><Calendar className='size-2.5' /> 1/12/2025</p>
                        </div>
                    </BaseCardContent>
                </BaseCard>
                <BaseCard style='p-2 rounded-md'>
                    <BaseCardContent style='flex gap-3 p-2'>
                        <Checkbox className='size-5 active:bg-gnrPrimary/20' />
                        <div className='space-y-1'>
                            <h5 className='text-sm font-medium'>Cash Mushola</h5>
                            <p className='flex items-center gap-1 text-xs text-gnrGray'><Calendar className='size-2.5' /> 1/12/2025</p>
                        </div>
                    </BaseCardContent>
                </BaseCard>
            </div>
        </div>
    )
}