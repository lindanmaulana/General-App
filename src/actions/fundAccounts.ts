"use server"

import { errorHandler } from "@/lib/helpers/errorHandler"
import { FundAccountsService } from "@/lib/services/fundAccounts.service"
import { FundAccountsCreate, FundAccountsUpdate } from "@/lib/validations/fund-accounts"
import { revalidatePath } from "next/cache"
import { ActionResult } from "."

export const createFundAccounts = async (prevState: unknown, formData: FormData): Promise<ActionResult> => {
    const validatedFields = FundAccountsCreate.safeParse({
        name: formData.get("name"),
        provider_name: formData.get("provider_name"),
        type: formData.get("type"),
        account_number: formData.get("account_number"),
        holder_name: formData.get("holder_name")
    })

    if(!validatedFields.success) {
        const errorDesc = validatedFields.error.issues.map((issue) => ({field: issue.path.join("."), message: issue.message}))

        return {
            status: "error",
            error: "Validated error",
            errors: errorDesc
        }
    }

    try {
        const result = await FundAccountsService.create(validatedFields.data)
        
        if(!result.data) {
            return {
                status: "error",
                error: result.error ?? ""
            }
        }

        revalidatePath("/dashboard/fund-accounts")
        return {
            status: "success"
        }
    } catch (err) {
        const errorMessage = errorHandler(err)
        
        return {
            status: "error",
            error: errorMessage
        }
    }
}

export const getAllIsActiveFundAccounts = async (): Promise<number> => {
    try {
        const result = await FundAccountsService.getAllIsActive()

        return result
    } catch (err) {
        const errorMessage = errorHandler(err)
        console.log({errorMessage})

        return 0
    }
}

const updateSchema = FundAccountsUpdate.partial()
export const updateFundAccounts = async (prevState: unknown, formData: FormData, id: string): Promise<ActionResult> => {
    const validatedFields = updateSchema.safeParse({
        name: formData.get("name"),
        provider_name: formData.get("provider_name"),
        type: formData.get("type"),
        account_number: formData.get("account_number"),
        holder_name: formData.get("holder_name"),
        is_active: formData.get("is_active")
    })

    if(!validatedFields.success) {
        const errorDesc = validatedFields.error.issues.map((issue) => ({field: issue.path.join("."), message: issue.message}))

        return {
            status: "error",
            error: "Error validation!",
            errors: errorDesc
        }
    }

    try {
        const result = await FundAccountsService.update(validatedFields.data, id)

        if(!result.data) {
            return {
                status: "error",
                error: result.error ?? ""
            }
        }

        revalidatePath("/dashboard/fund-accounts")
        return {
            status: "success"
        }
    } catch (err) {
        const errorMessage = errorHandler(err)

        return {
            status: "error",
            error: errorMessage
        }
    }
}

export const deleteFundAccounts = async (id: string): Promise<ActionResult> => {
    try {
        const result = await FundAccountsService.delete(id)

        if(!result.data) {
            return {
                status: "error",
                error: result.error ?? ""
            }
        }

        revalidatePath("/dashboard/fund-accounts")

        return {
            status: "success",
            message: "Akun berhasil di hapus"
        }
    } catch (err) {
        const errorMessage = errorHandler(err)

        return {
            status: "error",
            error: errorMessage
        }
    }
}