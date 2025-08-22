import { api } from "../axios-instance"
import { errorHandler } from "../helpers/errorHandler"

interface expensesParams {
    params?: string
}

export const apiExpensesGetAll = async ({params}: expensesParams) => {
    try {
        const response = await api.get(`/expenses?${params}`)

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const apiExpensesGetTotalAmountThisMonth = async () => {
    try {
        const response = await api.get("/expenses/total-amount/this-month")

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}