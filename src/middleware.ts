import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { AUTHSECRET } from "./lib/config";
import { APIPREFIX, REDIRECT_AUTH, REDIRECT_HOME, ROUTESPREFIXADMIN, ROUTESPUBLIC } from "./routes";

export default async function middleware(req: NextRequest) {
  const {nextUrl} = req
  
  const token = await getToken({req, secret: AUTHSECRET})

  const isLoggedIn = !!token

  const isApiRoute = nextUrl.pathname.startsWith(APIPREFIX)
  const isAdminRoute = req.nextUrl.pathname.startsWith(ROUTESPREFIXADMIN);
  const isPublicRoute = ROUTESPUBLIC.includes(nextUrl.pathname)

  if(isApiRoute) return NextResponse.next();

  if(isLoggedIn) {
    if(token) {
      if(!token.exp || Date.now() > token.exp * 1000) {
          const response = NextResponse.redirect(new URL("/auth/login", nextUrl))

            response.cookies.set("authjs.session-token", "", { maxAge: 0 });
            response.cookies.set("__Secure-next-auth.session-token", "", { maxAge: 0 });
            response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });

          return response
      }

      if(isAdminRoute && token.role !== "ADMIN") return NextResponse.redirect(new URL(REDIRECT_HOME, nextUrl), 307)
    }

    if(!token) return NextResponse.redirect(new URL(REDIRECT_AUTH, nextUrl))
  }

  if(!isLoggedIn && !isPublicRoute) return NextResponse.redirect(new URL(REDIRECT_AUTH, nextUrl))

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};