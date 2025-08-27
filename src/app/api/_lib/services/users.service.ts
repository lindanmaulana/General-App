import { customAPIError } from "@/lib/helpers/customAPIError"
import supabase from "@/lib/supabase"

export class userService {
    static table = "users"


    static async getOne(id: string){
        const result = await this.checkingUser(id)

        return result
    }

    static async checkingUser(id: string) {
        const result = await supabase.from(this.table).select("*").eq("id", id).single()

        if(result.error) throw new customAPIError("User not found", result.status)

        return result.data
    }

    static async checkingEmail(email: string) {
        const result = await supabase.from(this.table).select('*').eq('email', email).single();

        if (!result) throw new Error('User not found!');

        return result;
    }

    static async checkingDuplicateEmail(email: string, id: string) {
        const result = await supabase.from(this.table).select("*").eq("email", email).neq("id", id).single()

        if(result.data) throw new customAPIError("Email is already to use", result.status)

        return result
    }
}