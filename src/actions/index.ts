
export interface ActionResult {
    status: "idle" | "error" | "success"
    message?: string
    error?: string
    errors?: {field: string, message: string}[]
}