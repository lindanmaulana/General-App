import { AUTHSECRET, TABLEUSERS } from "@/lib/config";
import supabase from "@/lib/supabase";
import { AuthLoginCredentialsSchema } from "@/lib/validations/auth";
import bcrypt from "bcrypt";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
    providers: [
        Credentials({
            authorize: async (credentials) => {
                try {
                    const validatedFields = AuthLoginCredentialsSchema.safeParse({email: credentials.email, password: credentials.password})

                    if(!validatedFields.success) return null

                    const result = await supabase.from(TABLEUSERS).select("*").eq("email", validatedFields.data.email).single()

                    if(result.error) return null

                    if(result.data.password && validatedFields.data.password) {
                        const isValidPassword = await bcrypt.compare(validatedFields.data.password, result.data.password)

                        if(!isValidPassword) return null
                    }

                    return result.data
                } catch {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.role = user.role
                token.picture = user.image ?? ""
            }

            return token
        },

        async session({session, token}) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email
            session.user.role = token.role
            session.user.image = token.picture ?? ""

            return session
        }
    },
    secret: AUTHSECRET
} satisfies NextAuthConfig