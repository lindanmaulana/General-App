"use client"
import { BaseCard } from '@/components/base-card/BaseCard';
import { BaseCardContent } from '@/components/base-card/BaseCardContent';
import { Checkbox } from '@/components/ui/checkbox';
import { useExportData } from '@/lib/zustand/useExportData';


export const CategoryDataConfig = () => {
    const isDataInclude = useExportData((state) => state.category_data)
    const handleSetConfig = useExportData((state) => state.setConfig)

    return (
        <div className='space-y-2'>
            <h4 className="text-lg font-medium">Kategori Data</h4>
            <div className='grid grid-cols-2 g gap-4'>
                <BaseCard>
                    <BaseCardContent style='flex gap-3'>
                        <Checkbox onCheckedChange={(checked: boolean) => handleSetConfig({category_data: {...isDataInclude, incomes: checked}})} className='size-5 active:bg-gnrPrimary/20' checked={isDataInclude.incomes} />
                        <div>
                            <h5 className='text-base font-medium'>Data Pemasukan</h5>
                            <p className='text-sm text-gnrGray'>Transaksi pemasukan</p>
                        </div>
                    </BaseCardContent>
                </BaseCard>
                <BaseCard>
                    <BaseCardContent style='flex gap-3'>
                        <Checkbox onCheckedChange={(checked: boolean) => handleSetConfig({category_data: {...isDataInclude, expenses: checked}})}  className='size-5 active:bg-gnrPrimary/20' checked={isDataInclude.expenses} />
                        <div>
                            <h5 className='text-base font-medium'>Data Pengeluaran</h5>
                            <p className='text-sm text-gnrGray'>Transaksi pengeluaran</p>
                        </div>
                    </BaseCardContent>
                </BaseCard>
            </div>
        </div>
    )
}