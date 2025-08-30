import z from "zod";

export const oauthSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    email: z.string(),
    provider: z.string().optional(),
    providerAccountId: z.string().optional(),
    image: z.string().optional()
})

export type typeOauthSchema = z.infer<typeof oauthSchema>