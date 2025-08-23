import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { AUTHSECRET } from "./lib/config";
import { APIPREFIX, REDIRECT_EXPIRE_SESSION, REDIRECT_HOME, ROUTESPREFIXADMIN, ROUTESPUBLIC } from "./routes";

export default async function middleware(req: NextRequest) {
  const {nextUrl} = req
  
  let token = null

  if(process.env.NODE_ENV === "production") {
    token = await getToken({
      req,
      secret: AUTHSECRET,
      cookieName: "__Secure-authjs.session-token"
    })
  }

  if(!token) {
    token = await getToken({
      req,
      secret: AUTHSECRET
    })
  }

  const isLoggedIn = !!token

  const isApiRoute = nextUrl.pathname.startsWith(APIPREFIX)
  const isAdminRoute = req.nextUrl.pathname.startsWith(ROUTESPREFIXADMIN);
  const isPublicRoute = ROUTESPUBLIC.includes(nextUrl.pathname)

  if(isApiRoute) return NextResponse.next();

  if(!isLoggedIn) {
    
    if(!isPublicRoute) {
      return NextResponse.redirect(new URL(REDIRECT_EXPIRE_SESSION, nextUrl))
    }

    return NextResponse.next()
  }

  if(isLoggedIn && token) {
    if (!token.exp || Date.now() > token.exp * 1000) {
      const response = NextResponse.redirect(new URL("/session-expire", nextUrl));
      
      response.cookies.set("authjs.session-token", "", { maxAge: 0 });
      response.cookies.set("__Secure-next-auth.session-token", "", { maxAge: 0 });
      response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });
      
      return response;
    }

    if(isAdminRoute && token.role !== "ADMIN") return NextResponse.redirect(new URL(REDIRECT_HOME, nextUrl))

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};