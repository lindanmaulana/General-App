"use server"

import { eventsCreateSchema } from "@/lib/validations/events"
import { ActionResult } from "."
import { errorHandlerValidate } from "@/lib/helpers/errorHandlerValidate"
import { EventsService } from "@/lib/services/events.service"
import { revalidatePath } from "next/cache"
import { DEFAULT_QUERY_PARAMS, DEFAULT_ROUTE } from "@/lib/constant/default-route"
import { errorHandler } from "@/lib/helpers/errorHandler"

export const createEvents = async (prevState: unknown, formData: FormData): Promise<ActionResult> => {
    const validatedFields = eventsCreateSchema.safeParse({
        code: formData.get("code"),
        name: formData.get("name"),
        description: formData.get("description"),
        date: formData.get("date"),
        status: formData.get("status"),
        budget: formData.get("budget"),
        is_public: formData.get("is_public")
    })

    if(!validatedFields.success) {
        const errorDesc = errorHandlerValidate(validatedFields.error)
        return {
            status: "error",
            error: "Validated Error!",
            errors: errorDesc
        }
    }
    
    const is_public = validatedFields.data.is_public ? true : false
    const date = validatedFields.data.date ? new Date(validatedFields.data.date) : undefined

    try {
        const result = await EventsService.create({...validatedFields.data, date, is_public})

        if(!result.data) {
            return {
                status: "error",
                error: result.error ?? "Gagal menambahkan event!"
            }
        }

        revalidatePath(`${DEFAULT_ROUTE.events}?${DEFAULT_QUERY_PARAMS}`)
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