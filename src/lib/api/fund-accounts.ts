import { api } from "../axios-instance"
import { errorHandler } from "../helpers/errorHandler"

interface FundAccountsParams {
    params: string
}

export const apiFundAccountsGetAll = async ({params}: FundAccountsParams) => {
    try {
        const response = await api.get(`/fund-accounts?${params}`)

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const apiFundAccountsGetAllOptions = async () => {
    try {
        const response = await api.get("/fund-accounts/options")

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const apiFundAccountsGetCountActive = async () => {
    try {
        const response = await api.get(`/fund-accounts/active/count`)

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const apiFundAccountsGetTotalBalance = async () => {
    try {
        const response = await api.get('/fund-accounts/total-balance')

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const apiFundAccountsGetTotalBalanceNonCash = async () => {
    try {
        const response = await api.get('/fund-accounts/total-balance/non-cash')

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const apiFundAccountsGetTotalBalanceCash = async () => {
    try {
        const response = await api.get('/fund-accounts/total-balance/cash')

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const apiFundAccountsGetCountActiveNonCash = async () => {
    try {
        const response = await api.get('/fund-accounts/active/non-cash/count')

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}