import { expenses } from "@/app/api/_lib/models/expenses";
import { incomes } from "@/app/api/_lib/models/incomes";
import { handleParseDate, handleParsePrice } from "@/lib/helpers/parsing";
import { csvData, initialData } from "../types/initial-data";
import Papa from "papaparse"


interface handleExportCsvProps {
  dataIncomes?: unknown[] | Papa.UnparseObject<csvData[]>
  dataExpenses?: unknown[] | Papa.UnparseObject<csvData[]>
  fileName: string
}

export const handleExportCsv = ({dataIncomes, dataExpenses, fileName}: handleExportCsvProps) => {
  // const csv = Papa.unparse(data, {
  //   header: true,
  //   delimiter: ';',
  // });

  const csv = Papa.unparse({
    fields: [dataIncomes ? "Pemasukan" : "", dataExpenses ? "Pengeluaran" : "" ],
    data: [
      dataIncomes && dataIncomes,
      dataExpenses && dataExpenses
    ]
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName ? fileName : 'Laporan');
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const CreateInitialCsv = ({incomes, expenses}: initialData) => {
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
                    Sumber_Pendapatan: incomes.source,
                    Deskripsi: incomes.note ?? "-",
                    Akun: incomes.fund_accounts ? incomes.fund_accounts.name : "-",
                    Jumlah: clean(amount)
                })
    })

    return {
        incomesData,
        expensesData
    }
}

