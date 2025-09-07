import { expenses } from "@/app/api/_lib/models/expenses";
import { incomes } from "@/app/api/_lib/models/incomes";
import { handleParseDate, handleParsePrice } from "@/lib/helpers/parsing";
import { expensesRecord, incomesRecord, initialData } from "../types/initial-data";


export const formatDataForExport = ({incomes, expenses}: initialData) => {
        const incomesData = incomes.map((incomes: incomes, index: number) => {
                    const clean = (val: string) => val.replace(/\u00A0/g, " ");
                    const incomesDate = incomes.date ? handleParseDate(incomes.date, "YYYY-MM-DD"): ""
                    const amount = handleParsePrice(incomes.amount)
        
                    return ({
                        No: index + 1,
                        Tanggal: incomesDate,
                        Sumber_Pendapatan: incomes.source,
                        Deskripsi: incomes.note ?? "-",
                        Akun: incomes.fund_accounts ? incomes.fund_accounts.name : "-",
                        Tipe_Akun: incomes.fund_accounts?.type ?? "-",
                        Acara: incomes.events?.name ?? "-",
                        Kode_Acara: incomes.events?.code ?? "-",
                        Jumlah: incomes.amount,
                        Jumlah_Rupiah: clean(amount)
                    })
        }) as incomesRecord[]

         const expensesData = expenses.map((expenses: expenses, index: number) => {
                    const clean = (val: string) => val.replace(/\u00A0/g, " ");
                    const expensesDate = expenses.date ? handleParseDate(expenses.date, "YYYY-MM-DD"): ""
                    const amount = handleParsePrice(expenses.amount)
        
                    return ({
                        No: index + 1,
                        Tanggal: expensesDate,
                        Kategori_Pengeluaran: expenses.source,
                        Deskripsi: expenses.note ?? "-",
                        Akun: expenses.fund_accounts ? expenses.fund_accounts.name : "-",
                        Tipe_Akun: expenses.fund_accounts?.type ?? "-",
                        Acara: expenses.events?.name ?? "-",
                        Kode_Acara: expenses.events?.code ?? "-",
                        Jumlah: expenses.amount,
                        Jumlah_Rupiah: clean(amount)
                    })
        }) as expensesRecord[]
    
    return {
        incomesData,
        expensesData
    }
}