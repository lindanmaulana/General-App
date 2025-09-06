import { expenses } from "@/app/api/_lib/models/expenses";
import { incomes } from "@/app/api/_lib/models/incomes";
import { handleParseDate, handleParsePrice } from "@/lib/helpers/parsing";
import Papa from "papaparse";
import { initialData } from "../types/initial-data";


interface handleExportCsvProps {
  dataIncomes: unknown[] | Papa.UnparseObject<unknown>
  dataExpenses: unknown[] | Papa.UnparseObject<unknown>
  fileName: string
}

export const handleExportCsv = ({dataIncomes, dataExpenses, fileName}: handleExportCsvProps) => {
  console.log({dataIncomes, dataExpenses})
  const csvIncomes = Papa.unparse(dataIncomes, {
    delimiter: ";"
  })

  const csvExpenses = Papa.unparse(dataExpenses, {
    delimiter: ";"
  })

  const separator = "\n\n"
  const header = "Laporan Keuangan\n\n"
  const incomesTitle = "Pemasukan\n"
  const expensesTitle = "Pengeluaran\n"

  const finalCsv = header + incomesTitle + csvIncomes + separator + expensesTitle + csvExpenses
  
  const blob = new Blob([finalCsv], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName ? fileName : 'Laporan');
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const createInitialCsv = ({incomes, expenses}: initialData) => {
     const expensesData = expenses.map((expenses: expenses, index: number) => {
                const clean = (val: string) => val.replace(/\u00A0/g, " ");
                const expensesDate = expenses.date ? handleParseDate(expenses.date, "YYYY-MM-DD"): ""
                const amount = handleParsePrice(expenses.amount)
    
                return ({
                    No: index + 1,
                    Tanggal: expensesDate,
                    Sumber_Pendapatan: expenses.source,
                    Deskripsi: expenses.note ?? "-",
                    Akun: expenses.fund_accounts ? expenses.fund_accounts.name : "-",
                    Acara: expenses.events?.name ?? "-",
                    Kode_Acara: expenses.events?.code ?? "-",
                    Jumlah: clean(amount)
                })
    })

     const incomesData = incomes.map((incomes: incomes, index: number) => {
                const clean = (val: string) => val.replace(/\u00A0/g, " ");
                const incomesDate = incomes.date ? handleParseDate(incomes.date, "YYYY-MM-DD"): ""
                const amount = handleParsePrice(incomes.amount)
    
                return ({
                    No: index + 1,
                    Tanggal: incomesDate,
                    Kategori_Pengeluaran: incomes.source,
                    Deskripsi: incomes.note ?? "-",
                    Akun: incomes.fund_accounts ? incomes.fund_accounts.name : "-",
                    Acara: incomes.events?.name ?? "-",
                    Kode_Acara: incomes.events?.code ?? "-",
                    Jumlah: clean(amount)
                })
    })

    return {
        incomesData,
        expensesData
    }
}

