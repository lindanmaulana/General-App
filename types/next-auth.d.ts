// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {        
            id: string
            name: string?;
            email: string
            role: "ADMIN" | "USER" 
            image: string | ""
        }
    }

    interface User {
        id: string
        name: string?;
        email: strin
        role: "ADMIN" | "USER"
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string
        name: string?;
        email: strin
        role: "ADMIN" | "USER"
        image: string | ""
    }
}