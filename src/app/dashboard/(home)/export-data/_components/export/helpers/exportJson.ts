import { expenses } from "@/app/api/_lib/models/expenses";
import { incomes } from "@/app/api/_lib/models/incomes";

interface handleExportJsonProps {
  dataIncomes: incomes[]
  dataExpenses: expenses[]
  fileName: string
}

export const handleExportJson = ({dataIncomes, dataExpenses, fileName}: handleExportJsonProps) => {
    const allData = {
        Pemasukan: dataIncomes,
        Pengeluaran: dataExpenses
    }

    const jsonString = JSON.stringify(allData, null, 2)
  
  const blob = new Blob([jsonString], { type: 'application/json' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', fileName ? fileName : 'Laporan');
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};