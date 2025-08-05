import bcrypt from "bcrypt";
import supabase from "../supabase";
import { TypeAuthRegisterCredentialsSchema } from "../validations/auth";

export class AuthService {
    static table = "users"
    static async register(req: TypeAuthRegisterCredentialsSchema) {
        const checkDuplicate = await this.checkEmail(req.email)

        if(checkDuplicate.data) throw new Error("Email already exists!")

        const hashPassword = await bcrypt.hash(req.password, 10)

        const result = await supabase.from(this.table).insert({
            name: req.name,
            email: req.email,
            password: hashPassword
        })

        return result
    }   

    static async checkEmail(email: string) {
        const result = await supabase.from(this.table).select("*").eq("email", email).single()

        if(!result) throw new Error("User not found!")

        return result
    }
}