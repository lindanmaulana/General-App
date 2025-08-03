"use server"

import { ActionResult } from "@/actions/index"
import { signIn } from "@/auth"
import { errorHandler } from "@/lib/helpers/errorHandler"
import { AuthLoginCredentialsSchema } from "@/lib/validations/auth"

export const AuthLogin = async (prevState: unknown, formData: FormData): Promise<ActionResult> => {
    const validatedFields = AuthLoginCredentialsSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })

    if(!validatedFields.success) {
        const errorDesc = validatedFields.error.issues.map((issue) => issue.message)
        return {
            success: false,
            errorTitle: "Failed validation",
            errorDesc
        }
    }


    try {
        await signIn("credentials", {
            email: validatedFields.data.email,
            password: validatedFields.data.password,
            redirect: false
        })

        return {
            success: true
        }
    } catch (err) {
        const errorMessage = errorHandler(err)
        console.log({errorMessage})

        return {
            success: false,
            errorTitle: "Authentication Failed",
            errorDesc: ["Invalid credentials"]
        }
    }
}