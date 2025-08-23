export class customAPIError extends Error{
    public statusCode: number
    constructor(message: string, statusCode: number) {
        super(message)
        this.name = "Custom Api Error"
        this.statusCode = statusCode
    }
}