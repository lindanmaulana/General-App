import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpensesTable } from "./ExpensesTable";
import { ExpensesToolbar } from "./ExpensesToolbar";

export const ExpensesTableCard = () => {
    return (
        <Card>
            <CardHeader>
                <div className='flex flex-col gap-3'>
                    <div>
                        <CardTitle>Riwayat Pemasukan</CardTitle>
                        <CardDescription>Daftar semua transaksi pemasukan yang telah dicatat</CardDescription>
                    </div>
                    <ExpensesToolbar />
                </div>
            </CardHeader>
            <ExpensesTable />
        </Card>
    )
}