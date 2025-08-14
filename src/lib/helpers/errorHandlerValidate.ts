import z from "zod";

interface responseErrorValidation {
    field: string
    message: string
}

export const errorHandlerValidate = (err: z.ZodError): responseErrorValidation[] => {
    const errorDesc = err.issues.map((issue) => ({field: issue.path.join("."), message: issue.message}))

    return errorDesc
}