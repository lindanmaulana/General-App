import { FundAccountsCreateRequest, FundAccountsUpdateRequest } from "../models/fund-accounts";
import supabase from "../supabase";

export class FundAccountsService {
    static table = "fund_accounts"

    static async create(req: FundAccountsCreateRequest) {
        const result = await supabase.from(this.table).insert(req).select()

        if(!result.data) throw new Error("Tambah akun gagal!")

        return result
    }

    static async getAll() {
        const result = await supabase.from(this.table).select("*")

        return result
    }

    static async update(req: FundAccountsUpdateRequest, id: string) {
        const checkFundAccount = await this.checkingFundAccount(id)
        const result = await supabase.from(this.table).update(req).eq("id", checkFundAccount.data.id).select()

        if(!result.data) throw new Error(result.error.message)
        
        return result
    }

    static async checkingFundAccount(id: string) {
        const result = await supabase.from(this.table).select("*").eq("id", id).select().single()

        if(!result.data) throw new Error("FundAccount not found!")

        return result
    }
}