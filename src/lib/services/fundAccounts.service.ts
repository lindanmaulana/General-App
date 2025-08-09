import supabase from "../supabase";
import { TypeFundAccountsCreate } from "../validations/fund-accounts";

export class FundAccountsService {
    static table = "fund_accounts"

    static async create(req: TypeFundAccountsCreate) {
        const result = await supabase.from(this.table).insert(req).select()

        if(!result.data) throw new Error("Tambah akun gagal!")

        return result
    }

    static async getAll() {
        const result = await supabase.from(this.table).select("*")

        return result
    }
}