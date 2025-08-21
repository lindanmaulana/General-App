"use server"

import { errorHandler } from "@/lib/helpers/errorHandler"
import { expenses } from "@/lib/models/expenses"
import { expensesService } from "@/lib/services/expenses.service"
import { expensesSchema, TypeExpensesSchema } from "@/lib/validations/expenses"

export const createExpenses = async (req: TypeExpensesSchema): Promise<expenses> => {
    const validatedFields = expensesSchema.safeParse(req)

    if(!validatedFields.success) throw new Error("Validation invalid")

    const date = validatedFields.data.date ? new Date(validatedFields.data.date) : undefined
    const amount = Number(validatedFields.data.amount)
    try {
        const result = await expensesService.create({...validatedFields.data, date, amount})

        return result
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}