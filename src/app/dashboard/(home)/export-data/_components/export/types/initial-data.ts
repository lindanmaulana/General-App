import { expenses } from "@/app/api/_lib/models/expenses"
import { incomes } from "@/app/api/_lib/models/incomes"

export interface initialData {
    incomes: incomes[]
    expenses: expenses[]
    totalBalance?: number
}

export interface csvData {
    No: number
    Tanggal: string
    Sumber_Pendapatan: string
    Akun: string
    Jumlah: number
}


export interface financialRecord {
    No: number
    Tanggal: string
    Deskripsi: string
    Akun: string
    Tipe_Akun: string
    Acara: string
    Kode_Acara: string
    Jumlah: number
    Jumlah_Rupiah: string
}

export interface incomesRecord extends financialRecord {
    Sumber_Pendapatan: string
}

export interface expensesRecord extends financialRecord {
    Kategori_Pengeluaran: string
}