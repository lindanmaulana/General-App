"use server"

import { errorHandler } from "@/lib/helpers/errorHandler"
import { incomes } from "@/lib/models/incomes"
import { incomesService } from "@/lib/services/incomes.service"
import { incomesShcema, TypeIncomesSchema } from "@/lib/validations/incomes"

export const createIncomes = async (req: TypeIncomesSchema): Promise<incomes> => {
    const validatedFields = incomesShcema.safeParse(req)

    if(!validatedFields.success) throw new Error("Validation invalid")

    const date = validatedFields.data.date ? new Date(validatedFields.data.date) : undefined
    const amount = Number(validatedFields.data.amount)
    try {
        const result = await incomesService.create({...validatedFields.data, date, amount})

        return result
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}