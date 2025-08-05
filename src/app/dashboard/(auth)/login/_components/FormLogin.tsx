"use client"

import { ActionResult } from "@/actions"
import { AuthLogin } from "@/actions/auth"
import { ButtonFormSubmit } from "@/components/ButtonFormSubmit"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AuthLoginCredentialsSchema, TypeAuthLoginCredentialsSchema } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useActionState } from "react"
import { useForm } from "react-hook-form"

const initialState: ActionResult = {
    errorMessage: ""
}

export const FormLogin = () => {
    const form = useForm<TypeAuthLoginCredentialsSchema>({
        resolver: zodResolver(AuthLoginCredentialsSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const [state, formAction] = useActionState(AuthLogin, initialState)

    return (
        <Form {...form}>
            {state.errorMessage && 
                <div className="bg-red-200 rounded-md p-3">
                    <p className="text-sm font-semibold text-red-500">{state.errorMessage}</p>
                </div>
            }
            <form action={formAction} className="space-y-8">
                <div className="space-y-4">
                    <FormField 
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Masukan email anda..." type="email" required/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Masukan password anda..." type="password" required/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <ButtonFormSubmit type="submit" title="Sign in" />
            </form>
        </Form>
    )
}