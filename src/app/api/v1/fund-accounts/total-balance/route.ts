import { errorApiCatch } from "@/lib/helpers/errorApiCatch";
import { fundAccountsService } from "@/lib/services/fund-accounts.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const result = await fundAccountsService.getTotalBalance()

        return NextResponse.json(result)
    } catch (err) {
        const error = errorApiCatch(err)

        return NextResponse.json({error: error.message}, {status: error.statusCode})
    }
}