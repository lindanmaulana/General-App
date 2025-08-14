import { EventsCreateRequest } from "../models/events"
import supabase from "../supabase"

export class EventsService {
    static table = "events"

    static async create(req: EventsCreateRequest) {

        const result = await supabase.from(this.table).insert(req).select()

        if(!result.data) throw new Error("Tambah event gagal")

        return result
    }
}