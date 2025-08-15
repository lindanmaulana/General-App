import { RESPONSE_MESSAGE } from "../constant/response-message"
import { errorApiCustom } from "../helpers/errorApiCustom"
import { eventsCreateRequest } from "../models/events"
import supabase from "../supabase"

export class eventsService {
    static table = "events"

    static async create(req: eventsCreateRequest) {
        const result = await supabase.from(this.table).insert(req).select()

        if(result.error) throw new errorApiCustom(`${RESPONSE_MESSAGE.error.create} event`, result.status)

        return result.data[0]
    }

    static async getCount() {
        const result = (await supabase.from(this.table).select("*", {count: "exact"}))

        if(result.error) throw new Error("Data event not found")

        return result.count
    }

    static async getCountIsPublic() {
        const result = (await supabase.from(this.table).select("*", {count: "exact"}).eq("is_public", true))

        if(result.error) throw new errorApiCustom(`${RESPONSE_MESSAGE.error.read} publik event`, result.status)

        return result.count
    }

    static async getTotalBudget() {
        const result = await supabase.rpc("get_total_budget");

        if(result.error) throw new errorApiCustom(`${RESPONSE_MESSAGE.error.read} budget event`, result.status)

        return result
    }
}