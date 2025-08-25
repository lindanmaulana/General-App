import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IncomesTable } from "./IncomesTable";
import { IncomesToolbar } from "./IncomesToolbar";
import { PdfExportToolbar } from './PdfExportToolbar';

export const IncomesTableCard = () => {
    return (
        <Card>
            <CardHeader>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-3'>
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