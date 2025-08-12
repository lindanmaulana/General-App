import { NextRequest } from "next/server";
import { FundAccountsCreateRequest, FundAccountsUpdateRequest } from "../models/fund-accounts";
import supabase from "../supabase";
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAXIMUM_LIMIT } from "../constant/pagination";

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

    static async getAllNew(req: NextRequest) {
        const query = supabase.from(this.table).select("*", {count: "exact"}).limit(5)

        let limit: number = DEFAULT_LIMIT
        let page: number = DEFAULT_PAGE

        let totalPage: number = 1
        let nextPage: number | null = null
        let prevPage: number | null = null
        let links: number[] = [1]

        if(req) {
            const url = new URL(req.url)

            const limitParams = url.searchParams.get("limit")
            const pageParams = url.searchParams.get("page")
            const keywordParams = url.searchParams.get("keyword")

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

            const start = (page - 1) * limit
            const end = start + limit - 1

            query.range(start, end)
        }

        const result = await query

        if(result.error) throw new Error(`Gagal mengambil data akun: ${result.error.message}`)

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

    static async getAllIsActive() {
        const result = (await supabase.from(this.table).select("*", {"count": "exact", head: true}).eq("is_active", true)).count

        if(!result) throw new Error("Gagal mengambil jumlah akun aktif!")

        return result
    }

    static async update(req: FundAccountsUpdateRequest, id: string) {
        const checkFundAccount = await this.checkingFundAccount(id)

        const result = await supabase.from(this.table).update({...req, is_active: req.is_active === "1"}).eq("id", checkFundAccount.data.id).select()

        if(!result.data) throw new Error(result.error.message)
        
        return result
    }

    static async delete(id: string) {
        const checkFundAccount = await this.checkingFundAccount(id)

        const result = await supabase.from(this.table).delete().eq("id", checkFundAccount.data.id).select()

        if(!result.data) throw new Error("Delete akun gagal!")

        return result
    }

    static async checkingFundAccount(id: string) {
        const result = await supabase.from(this.table).select("*").eq("id", id).select().single()

        if(!result.data) throw new Error("FundAccount not found!")

        return result
    }
}