import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { expensesRecord, incomesRecord } from "../types/initial-data";
import { handleParseDate } from "@/lib/helpers/parsing";

interface data {
    incomes: incomesRecord[]
    expenses: expensesRecord[]
}
interface handleExportExcelProps {
    data: data
    fileName: string
}

export const handleExportExcel = async ({data, fileName}: handleExportExcelProps) => {
    const workbook = new ExcelJS.Workbook()

    const dateNow: string = handleParseDate(new Date(), "YYYY-MM-DD")
    const workSheet = workbook.addWorksheet(`${fileName}-${dateNow}`)

    workbook.creator = "Me"
    workbook.lastModifiedBy = "Her"
    workbook.created = new Date()
    workbook.modified = new Date()

    if(data.incomes.length > 0) {
        const filteredData = data.incomes.map(item => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {Jumlah_Rupiah, ...allItem} = item

            return allItem
        })

        const incomesHeaders = Object.keys(filteredData[0]).map(key => key.toUpperCase())
        const incomesValues = filteredData.map(item => Object.values(item))

        workSheet.addRow(['Pemasukan'])
        workSheet.addRow(incomesHeaders)
        workSheet.addRows(incomesValues)
    }

    workSheet.addRow([])

    if(data.expenses.length > 0) {
        const filteredData = data.expenses.map(item => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {Jumlah_Rupiah, ...allItem} = item

            return allItem
        })

        const expensesHeaders = Object.keys(filteredData[0]).map(key => key.toUpperCase())
        const expensesvalues = filteredData.map(item => Object.values(item))


        workSheet.addRow(["Pengeluaran"])
        workSheet.addRow(expensesHeaders)
        workSheet.addRows(expensesvalues)
    }

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    })

    saveAs(blob, `${fileName}-${dateNow}.xlsx`)
}