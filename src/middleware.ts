import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { AUTHSECRET } from "./lib/config";
import { APIPREFIX, ROUTESAUTHADMIN, ROUTESPREFIXADMIN, ROUTESPUBLIC } from "./routes";

export default async function middleware(req: NextRequest) {
  const {nextUrl, url} = req
  const token = await getToken({req, secret: AUTHSECRET})

  const isLoggedIn = !!token

  const isApiRoute = nextUrl.pathname.startsWith(APIPREFIX)
  const isProtectedRoute = req.nextUrl.pathname.startsWith(ROUTESPREFIXADMIN);
  const isPublicRoute = ROUTESPUBLIC.includes(nextUrl.pathname)
  const isAuthAdminRoute = ROUTESAUTHADMIN.includes(nextUrl.pathname)

  // if(!isLoggedIn) return NextResponse.redirect(new URL("/dashboard/login", url))

  console.log({token, isProtectedRoute, isLoggedIn})

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};