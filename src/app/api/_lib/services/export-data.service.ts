import { RESPONSE_MESSAGE } from "@/lib/constants/response-message";
import { customAPIError } from "@/lib/helpers/customAPIError";
import supabase from "@/lib/supabase";
import { exportDataCustomSchema } from "@/lib/validations/export-data";
import { exportDataCustomRequest, exportDataCustomResponse } from "../models/export-data";
import { expensesService } from "./expenses.service";
import { incomesService } from "./incomes.service";

export class ExportDataService {
    static async custom(req: exportDataCustomRequest): Promise<exportDataCustomResponse> {
        const validatedFields = exportDataCustomSchema.safeParse(req)

        if(!validatedFields.success) throw new customAPIError("Error validation", 400)

        let queryIncomes
        let queryExpenses

        if(validatedFields.data.category_data.incomes) {
            const query = supabase.from(incomesService.table).select("*, events!inner(id, code, name), fund_accounts!inner(id, name, type)")

            if(validatedFields.data.date_file.start_date && validatedFields.data.date_file.end_date) {
                query.gte("date", validatedFields.data.date_file.start_date).lte("date", validatedFields.data.date_file.end_date)

                if(validatedFields.data.events.length > 0) {
                    query.in("events.code", validatedFields.data.events)
                }
            }

            queryIncomes = query
        }

        if(validatedFields.data.category_data.expenses) {
            const query = supabase.from(expensesService.table).select("*, events!inner(id, code, name), fund_accounts!inner(id, name, type)")

            if(validatedFields.data.date_file.start_date && validatedFields.data.date_file.end_date) {
                query.gte("date", validatedFields.data.date_file.start_date).lte("date", validatedFields.data.date_file.end_date)

                if(validatedFields.data.events.length > 0) {
                    query.in("events.code", validatedFields.data.events)
                }
            }

            queryExpenses = query
        }

        const resultIncomes = await queryIncomes

        if(resultIncomes?.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} Pemasukan`, resultIncomes.status)

        const resultExpenses = await queryExpenses

        if(resultExpenses?.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} Pengeluaran`, resultExpenses.status)

        return {
            incomes: resultIncomes?.data ?? [],
            expenses: resultExpenses?.data ?? []
        }
    }

    static async getDataIncomes(event_id: string[], date: {start_date: string, end_date: string}) {

    }

    static async getDataExpenses(event_id: string[], date: {start_date: string, end_date: string}) {

    }
}

    // const formatFile = useExportData((state) => state.format)
    // const dateFile = useExportData((state) => state.date)
    // const categoryDataFile = useExportData((state) => state.category_data)
    // const eventsFile = useExportData((state) => state.events)
    // PostgrestFilterBuilder<any, any, any[], string, unknown> 