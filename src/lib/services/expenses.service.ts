import { RESPONSE_MESSAGE } from "../constant/response-message";
import { errorApiCustom } from "../helpers/errorApiCustom";
import { expensesCreateRequest } from "../models/expenses";
import supabase from "../supabase";
import { eventsService } from "./events.service";
import { fundAccountsService } from "./fund-accounts.service";

export class expensesService {
    static table = "expenses"

    static async create(req: expensesCreateRequest) {
        const event = await eventsService.checkingEvent(req.event_id)

        const fundAccount = await fundAccountsService.checkingFundAccount(req.fund_account_id)

        const result = await supabase.from(this.table).insert({...req, event_id: event.id, fund_account_id: fundAccount.id}).single()

        if(result.error) throw new errorApiCustom(`${RESPONSE_MESSAGE.error.create} pemasukan`, result.status)

        return result.data
    }

    static async getTotalThisMonth() {
        const result = await supabase.rpc('get_total_expenses_this_month')

        if(result.error) throw new errorApiCustom(`${RESPONSE_MESSAGE.error.read} total pengeluaran bulan ini`, result.status)

        return result.data
    }
}