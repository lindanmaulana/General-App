import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IncomesTable } from "./IncomesTable";
import { IncomesToolbar } from "./IncomesToolbar";
import { PdfExportToolbar } from './PdfExportToolbar';

export const IncomesTableCard = () => {
    return (
        <Card>
            <CardHeader>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <CardTitle>Riwayat Pemasukan</CardTitle>
                            <CardDescription>Daftar semua transaksi pemasukan yang telah dicatat</CardDescription>
                        </div>
                        <PdfExportToolbar />
                    </div>
                    <IncomesToolbar />
                </div>
            </CardHeader>
            <IncomesTable />
        </Card>
    )
}