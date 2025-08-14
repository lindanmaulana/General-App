import { api } from "../axios-instance"
import { errorHandler } from "../helpers/errorHandler"

interface FundAccountsParams {
    params: string
}

export const ApiFundAccountsGetAll = async ({params}: FundAccountsParams) => {
    try {
        const response = await api.get(`/fund-accounts?${params}`)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const ApiFundAccountsGetAllIsActive = async () => {
    try {
        const response = await api.get(`/fund-accounts/count`)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}