import z from "zod";


export type TypeFieldEvents = "code" | "name" | "description" | "date" | "status" | "budget" | "is_public"

export const eventsCreateSchema = z.object({
    code: z.string({error: "Kode event tidak boleh kosong!"}).regex(/^[A-Z]{3}-[0-9]{3}$/, "Format kode harus [XXX-111]"),
    name: z.string().min(1, "Nama event tidak boleh kosong"),
    description: z.string().optional(),
    date: z.string().optional(),
    status: z.literal(["SCHEDULED", "RUNNING", "COMPLETED", "CANCELLED"]),
    budget: z.string().optional(),
    is_public: z.boolean().nullable()
})

export type TypeEventsCreateSchema = z.infer<typeof eventsCreateSchema>