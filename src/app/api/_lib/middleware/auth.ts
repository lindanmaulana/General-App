import { getSession } from "@/actions/getSession"
import { NextResponse } from "next/server"

export const authMiddleware = async (handler: () => Promise<NextResponse>) => {
    const session = await getSession()

    if(!session) return NextResponse.json({error: "Unauthorized"}, {status: 401})

    return handler()
}