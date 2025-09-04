import { clsx, type ClassValue } from 'clsx';
import Papa from "papaparse";
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// interface handleExportCsvProps {
//   data: unknown[] | Papa.UnparseObject<unknown>
//   fileName: string
// }

// export const handleExportCsv = ({data, fileName}: handleExportCsvProps) => {
//   const csv = Papa.unparse(data, {
//     header: true,
//     delimiter: ';',
//   });

//   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.setAttribute('href', url);
//   link.setAttribute('download', fileName ? fileName : 'Laporan');
//   link.style.display = 'none';

//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };