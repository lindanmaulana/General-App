import { expenses } from "@/app/api/_lib/models/expenses";
import { incomes } from "@/app/api/_lib/models/incomes";
import { saveAs } from "file-saver";

interface handleExportJsonProps {
  dataIncomes: incomes[]
  dataExpenses: expenses[]
  fileName: string
}

export const handleExportJson = ({dataIncomes, dataExpenses, fileName}: handleExportJsonProps) => {
    const allData = {
        incomes: dataIncomes,
        expenses: dataExpenses
    }

  const jsonString = JSON.stringify(allData, null, 2)
  
  const blob = new Blob([jsonString], { type: 'application/json' });

  
  const url = URL.createObjectURL(blob);
  saveAs(url, fileName ?? "Laporan")
};