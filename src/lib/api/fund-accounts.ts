import { api } from "../axios-instance"
import { errorHandler } from "../helpers/errorHandler"

interface FundAccountsParams {
    params: string
}

export const ApiFundAccountsGetAll = async ({params}: FundAccountsParams) => {
    try {
        const result = await api.get(params)

        return result
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}