"use server"

import { FundAccountsCreate } from "@/lib/validations/fund-accounts"
import { ActionResult } from "."
import { FundAccountsService } from "@/lib/services/fundAccounts.service"
import { errorHandler } from "@/lib/helpers/errorHandler"
import { redirect } from "next/navigation"

export const CreateFundAccounts = async (prevState: unknown, formData: FormData): Promise<ActionResult> => {
    console.log({formData})
    console.log("hit Action server")
    const validatedFields = FundAccountsCreate.safeParse({
        name: formData.get("name"),
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
                error: result.error?.message
            }
        }
    } catch (err) {
        const errorMessage = errorHandler(err)
        
        return {
            status: "error",
            error: errorMessage
        }
    }

    redirect("/dashboard/fund-accounts")
}