import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IncomesTable } from "./IncomesTable";
import { IncomesToolbar } from "./IncomesToolbar";

export const IncomesTableCard = () => {
    return (
        <Card>
            <CardHeader>
                <div className='flex flex-col gap-3'>
                    <div>
                        <CardTitle>Riwayat Pemasukan</CardTitle>
                        <CardDescription>Daftar semua transaksi pemasukan yang telah dicatat</CardDescription>
                    </div>
                    <IncomesToolbar />
                </div>
            </CardHeader>
            <IncomesTable />
        </Card>
    )
}