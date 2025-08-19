"use server"

import { errorHandler } from "@/lib/helpers/errorHandler"
import { events } from "@/lib/models/events"
import { eventsService } from "@/lib/services/events.service"
import { eventsSchema, TypeEventsSchema } from "@/lib/validations/events"

export const createEvents = async (req: TypeEventsSchema): Promise<events> => {
    const validatedFields = eventsSchema.safeParse(req)

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

export const updateEvents = async (req: TypeEventsSchema, id: string): Promise<events> => {
    const validatedFields = eventsSchema.safeParse(req)

    if(validatedFields.error) throw new Error("Validation invalid")

    const isPublic = validatedFields.data.is_public ? true : false
    const date = validatedFields.data.date ? new Date(validatedFields.data.date) : undefined
    
    try {
        const result = await eventsService.update({...validatedFields.data, date, is_public: isPublic}, id)

        return result
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}

export const deleteEvents = async (id: string): Promise<events> => {
    try {
        const result = await eventsService.delete(id)

        return result
    } catch (err) {
        const errorMessage = errorHandler(err)

        throw new Error(errorMessage)
    }
}