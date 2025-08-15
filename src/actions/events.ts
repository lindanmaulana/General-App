"use server"

import { errorHandler } from "@/lib/helpers/errorHandler"
import { events } from "@/lib/models/events"
import { eventsService } from "@/lib/services/events.service"
import { eventsCreateSchema, TypeEventsCreateSchema } from "@/lib/validations/events"

export const createEvents = async (req: TypeEventsCreateSchema): Promise<events> => {
    const validatedFields = eventsCreateSchema.safeParse(req)

    if(!validatedFields.success) throw new Error("Validation invalid")

        const is_public = validatedFields.data.is_public ? true : false
        const date = validatedFields.data.date ? new Date(validatedFields.data.date) : undefined
    
    try {
        const result = await eventsService.create({...validatedFields.data, date, is_public})

        return result.data
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}