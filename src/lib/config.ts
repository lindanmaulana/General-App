
const SUPABASEURL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const SUPABASEKEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ""
const AUTHSECRET = process.env.AUTH_SECRET ?? ""
const APIURL = process.env.NEXT_PUBLIC_API_URL ?? ""

const TABLEUSERS = "users"

export {
    SUPABASEKEY,
    SUPABASEURL,
    AUTHSECRET,
    TABLEUSERS,
    APIURL
}