import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {SupabaseAdapter} from "@auth/supabase-adapter"
import { SUPABASEKEY, SUPABASEURL } from "./lib/config";

export const {auth, handlers, signIn, signOut} = NextAuth({
    adapter: SupabaseAdapter({
        url: SUPABASEURL,
        secret: SUPABASEKEY
    }),
    session: {strategy: "jwt"},
    ...authConfig
})