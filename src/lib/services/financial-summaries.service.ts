import { api } from "../axios-instance"
import { errorHandler } from "../helpers/errorHandler"

export const getFinancialSummaryMonthly = async () => {
    try {
        const response = await api.get('/financial-summary/monthly')

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}