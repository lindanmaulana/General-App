import z from "zod";

export const AuthLoginCredentialsSchema = z.object({
    email: z.email(),
    password: z.string()
})
export type TypeAuthLoginCredentialsSchema = z.infer<typeof AuthLoginCredentialsSchema>


export const AuthRegisterCredentialsSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string()
})
export type TypeAuthRegisterCredentialsSchema = z.infer<typeof AuthRegisterCredentialsSchema>