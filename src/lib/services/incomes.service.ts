import { api } from "../axios-instance"
import { errorHandler } from "../helpers/errorHandler"

interface incomesParams {
    params: string
}

export const getAllIncomes = async ({params}: incomesParams) => {
    try {
        const response = await api.get(`/incomes?${params}`)

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const getTotalAmountIncomeThisMonth = async () => {
    try {
        const response = await api.get("/incomes/total-amount/this-month")

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}