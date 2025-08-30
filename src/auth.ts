import authConfig from "@/auth.config";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth from "next-auth";
import { SUPABASESERVICEROLE, SUPABASEURL } from "./lib/config";

export const {auth, handlers, signIn, signOut} = NextAuth({
    adapter: SupabaseAdapter({
        url: SUPABASEURL,
        secret: SUPABASESERVICEROLE
    }),
    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
        updateAge: 10 * 60
    },
    ...authConfig
})