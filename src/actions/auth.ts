"use server"

import { ActionResult } from "@/actions/index"
import { signIn } from "@/auth"
import { errorHandler } from "@/lib/helpers/errorHandler"
import { AuthService } from "@/lib/services/auth.service"
import { AuthLoginCredentialsSchema, AuthRegisterCredentialsSchema } from "@/lib/validations/auth"
import { redirect } from "next/navigation"

export const AuthLogin = async (prevState: unknown, formData: FormData): Promise<ActionResult> => {
    const validatedFields = AuthLoginCredentialsSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })

    if(!validatedFields.success) throw new Error("Error validation")

    try {
        await signIn("credentials", {
            email: validatedFields.data.email,
            password: validatedFields.data.password,
            redirect: false
        })
    } catch (err) {
        const errorMessage = errorHandler(err)
        console.log({errorMessage})

        return {
            errorMessage
        }
    }

    redirect("/dashboard")
}

export const AuthRegister = async (prevState: unknown, formData: FormData): Promise<ActionResult> => {
    const validatedFields = AuthRegisterCredentialsSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    })

    if(!validatedFields.success) {
        return {
            errorMessage: "Error Validation"
        }
    }

    try {
        await AuthService.register(validatedFields.data)

        return {
            success: true,
            successMessage: "Registrasi berhasil"
        }
    } catch (err) {
        const errorMessage = errorHandler(err)

        return {
            errorMessage
        }
    }
}