
export interface ActionResult {
    status: "idle" | "error" | "success"
    error?: string
    errors?: {field: string, message: string}[]
}