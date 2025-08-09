"use client"

import { AuthRegister } from "@/actions/auth"
import { ButtonFormSubmit } from "@/components/ButtonFormSubmit"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { INITIAL_STATE_ACTION } from "@/lib/constant/initial-state"
import { AuthRegisterCredentialsSchema, TypeAuthRegisterCredentialsSchema } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const FormRegister = () => {
    const form = useForm<TypeAuthRegisterCredentialsSchema>({
        resolver: zodResolver(AuthRegisterCredentialsSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const [state, formAction] = useActionState(AuthRegister, INITIAL_STATE_ACTION)
    const router = useRouter()

    console.log({state})

    useEffect(() => {
        if(state.status === "success") {
            toast("Registrasi akun berhasil")
            router.replace("/dashboard/login")
        }
    }, [state, router])

    return (
        <Form {...form}>
            {state.status === "error" && 
                <div className="bg-red-200 rounded-md p-3">
                    <p className="text-sm font-semibold text-red-500">{state.error}</p>
                </div>
            }
            <form action={formAction} className="space-y-8">
                <div className="space-y-4">
                    <FormField 
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Masukan nama anda..." type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Masukan email anda..." type="email" />
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
                                    <Input {...field} placeholder="Masukan password anda..." type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <ButtonFormSubmit type="submit" title="Sign up" />
            </form>
        </Form>
    )
}