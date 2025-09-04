import { expenses } from "./expenses"
import { incomes } from "./incomes"

export interface exportDataCustomRequest {
    format_file: string
    date_file: {
        start_date: string
        end_date: string
    },
    category_data: {
        incomes: boolean,
        expenses: boolean
    },
    events: string[]
}
    // const formatFile = useExportData((state) => state.format)
    // const dateFile = useExportData((state) => state.date)
    // const categoryDataFile = useExportData((state) => state.category_data)
    // const eventsFile = useExportData((state) => state.events)

    // export const exportDataCustomSchema = z.object({
    //     format_file: z.string().min(1, "Format file harus di isi"),
    //     date_file: {
    //         start_date: z.string(),
    //         end_date: z.string()
    //     },
    //     category_data: {
    //         incomes: z.boolean(),
    //         expenses: z.boolean()
    //     },
    //     events: z.string().array()
    // })

export interface exportDataCustomResponse {
    incomes: incomes[] | []
    expenses: expenses[] | []
}

// pemasukan
    // jumlah


// pengeluaran
    // jumlah

//saldo akhir
    // saldo tersedia
    // pemasukan yang di get
    // pengeluaran yang di get
    // saldo akhir