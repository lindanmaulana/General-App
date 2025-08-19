import { NextRequest } from "next/server";
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAXIMUM_LIMIT } from "../constant/pagination";
import { RESPONSE_MESSAGE } from "../constant/response-message";
import { errorApiCustom } from "../helpers/errorApiCustom";
import { incomesCreateRequest } from "../models/incomes";
import supabase from "../supabase";
import { eventsService } from "./events.service";
import { fundAccountsService } from "./fund-accounts.service";

export class incomesService {
    static table = "incomes"

    static async create(req: incomesCreateRequest) {
        const event = await eventsService.checkingEvent(req.event_id)

        const fundAccount = await fundAccountsService.checkingFundAccount(req.fund_account_id)

        const result = await supabase.from(this.table).insert({...req, event_id: event.id, fund_account_id: fundAccount.id}).single()

        if(result.error) throw new errorApiCustom(`${RESPONSE_MESSAGE.error.create} pemasukan`, result.status)

        return result.data
    }

       static async getAll(req: NextRequest) {
        const query = supabase.from(this.table).select("*, events(*), fund_accounts(*)", {count: "exact"}).order("created_at", {ascending: false}).limit(5)

        let limit = DEFAULT_LIMIT
        let page = DEFAULT_PAGE

        let totalPage: number = 1
        let nextPage: number | null = null
        let prevPage: number | null = null
        let links: number[] = [1]

        if(req) {
            const url = new URL(req.url)

            const limitParams = url.searchParams.get("limit")
            const pageParams = url.searchParams.get("page")
            const keywordParams = url.searchParams.get("keyword")
            const statusParams = url.searchParams.get("status")
            const accessParams = url.searchParams.get("access")

            if(limitParams) {
                const parseLimit = Number(limitParams)

                if(parseLimit > MAXIMUM_LIMIT) {
                    limit = DEFAULT_LIMIT
                } else {
                    limit = parseLimit
                }
            } 

            if(pageParams) {
                const parsePage = Number(pageParams)

                if(parsePage < DEFAULT_PAGE) {
                    page = DEFAULT_PAGE
                } else {
                    page = parsePage
                }
            }

            if(keywordParams) query.ilike("name", `%${keywordParams}%`)

            if(accessParams) {
                if(accessParams.toLowerCase() === "public") query.eq("is_public", true)
                    else if(accessParams.toLowerCase() === "private") query.eq("is_public", false)
            }

            if(statusParams) query.eq("status", statusParams.toUpperCase())

            const start = (page - 1) * limit
            const end = start + limit - 1

            query.range(start, end)
        }

        const result = await query

        if(result.error) throw new errorApiCustom(`${RESPONSE_MESSAGE.error.read} pemasukan`, result.status)

        if(result.count) {
            totalPage = Math.ceil(result.count / limit)
            nextPage = page > 0 && page < totalPage ? page + 1 : null
            prevPage = page > 1 ? page - 1 : null
            links = Array.from({length: totalPage}, (_, index) => index + 1)
        }

        const response = {
            ...result,
            pagination: {
                totalPage,
                currentPage: page,
                limit,
                links,
                nextPage,
                prevPage
            }
        }

        return response
    }

    static async getTotalAmountThisMonth() {
        const result = await supabase.rpc("get_total_amount_this_month")

        if(result.error) throw new errorApiCustom(`${RESPONSE_MESSAGE.error.read} total pemasukan bulan ini`, result.status)

        return result.data
    }

    static async getTotalBalance() {
        // const result = await supabase.from(this.table).select("*")
    }
}