import z from "zod";

export const AuthLoginCredentialsSchema = z.object({
    email: z.email(),
    password: z.string()
})

export type TypeAuthLoginCredentialsSchema = z.infer<typeof AuthLoginCredentialsSchema>