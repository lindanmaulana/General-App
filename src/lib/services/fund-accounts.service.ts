import { api } from "../axios-instance"
import { errorHandler } from "../helpers/errorHandler"

export const getAllFundAccounts = async (params : string) => {
    try {
        const response = await api.get(`/fund-accounts?${params}`)

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const getFundAccountOptions = async () => {
    try {
        const response = await api.get("/fund-accounts/options")

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const getActiveFundAccountCount = async () => {
    try {
        const response = await api.get(`/fund-accounts/active/count`)

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const getNonCashActiveFundAccountCount = async () => {
    try {
        const response = await api.get('/fund-accounts/active/non-cash/count')

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const getFundAccountTotalBalance = async () => {
    try {
        const response = await api.get('/fund-accounts/total-balance')

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}
export const getNonCashFundAccountTotalBalance = async () => {
    try {
        const response = await api.get('/fund-accounts/total-balance/non-cash')

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const getCashFundAccountTotalBalance = async () => {
    try {
        const response = await api.get('/fund-accounts/total-balance/cash')

        if(response.data.error) throw new Error(response.data.error)

        return response.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}