import { expenses } from "@/app/api/_lib/models/expenses";
import { incomes } from "@/app/api/_lib/models/incomes";
import { handleParseDate, handleParsePrice } from "@/lib/helpers/parsing";
import { initialData } from "../types/initial-data";


interface initialDataIncomesPdf {
    No: number
    Tanggal: string
    Sumber_Pendapatan: string
    Deskripsi: string
    Akun: string
    Tipe_Akun: string
    Acara: string
    Kode_Acara: string
    Jumlah: string
}

interface initialDataExpensesPdf {
    No: number
    Tanggal: string
    Kategori_Pengeluaran: string
    Deskripsi: string
    Akun: string
    Tipe_Akun: string
    Acara: string
    Kode_Acara: string
    Jumlah: string
}


export const createInitialPdf = ({incomes, expenses}: initialData): {incomesData: initialDataIncomesPdf[], expensesData: initialDataExpensesPdf[]} => {
     const incomesData = incomes.map((incomes: incomes, index: number) => {
                const clean = (val: string) => val.replace(/\u00A0/g, " ");
                const expensesDate = incomes.date ? handleParseDate(incomes.date, "YYYY-MM-DD"): ""
                const amount = handleParsePrice(incomes.amount)
    
                return ({
                    No: index + 1,
                    Tanggal: expensesDate,
                    Sumber_Pendapatan: incomes.source,
                    Deskripsi: incomes.note ?? "-",
                    Akun: incomes.fund_accounts ? incomes.fund_accounts.name : "-",
                    Tipe_Akun: incomes.fund_accounts?.type ?? "-",
                    Acara: incomes.events?.name ?? "-",
                    Kode_Acara: incomes.events?.code ?? "-",
                    Jumlah: clean(amount)
                })
    }) as initialDataIncomesPdf[]

     const expensesData = expenses.map((expenses: expenses, index: number) => {
                const clean = (val: string) => val.replace(/\u00A0/g, " ");
                const incomesDate = expenses.date ? handleParseDate(expenses.date, "YYYY-MM-DD"): ""
                const amount = handleParsePrice(expenses.amount)
    
                return ({
                    No: index + 1,
                    Tanggal: incomesDate,
                    Kategori_Pengeluaran: expenses.source,
                    Deskripsi: expenses.note ?? "-",
                    Akun: expenses.fund_accounts ? expenses.fund_accounts.name : "-",
                    Tipe_Akun: expenses.fund_accounts?.type ?? "-",
                    Acara: expenses.events?.name ?? "-",
                    Kode_Acara: expenses.events?.code ?? "-",
                    Jumlah: clean(amount)
                })
    }) as initialDataExpensesPdf[]

    return {
        incomesData,
        expensesData
    }
}