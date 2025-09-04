import { expenses } from "@/app/api/_lib/models/expenses"
import { incomes } from "@/app/api/_lib/models/incomes"

export interface initialData {
    incomes: incomes[]
    expenses: expenses[]
}

export interface csvData {
    No: number
    Tanggal: string
    Sumber_Pendapatan: string
    Akun: string
    Jumlah: number
}