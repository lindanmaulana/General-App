import { createClient } from "@supabase/supabase-js"
import { SUPABASEKEY, SUPABASEURL } from "./config"

const supabase = createClient(
    SUPABASEURL,
    SUPABASEKEY
)

export default supabase