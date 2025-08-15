import { api } from "../axios-instance"
import { errorHandler } from "../helpers/errorHandler"

interface FundAccountsParams {
    params: string
}

export const ApiFundAccountsGetAll = async ({params}: FundAccountsParams) => {
    try {
        const response = await api.get(`/fund-accounts?${params}`)

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const ApiFundAccountsGetAllIsActive = async () => {
    try {
        const response = await api.get(`/fund-accounts/count`)

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}