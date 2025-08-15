import { errorApiCustom } from "./errorApiCustom"

interface errorApiCatchResponse {
    message: string
    statusCode: number
}
export const errorApiCatch = (err: unknown): errorApiCatchResponse => {
    let message = "An unexpected error occurred!"
    let statusCode = 500

    if(err instanceof errorApiCustom) {
        message = err.message
        statusCode = err.statusCode
    }


    return {
        message,
        statusCode
    }
}