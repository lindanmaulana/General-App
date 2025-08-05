import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

interface AuthContainerProps {
    children: ReactNode
    title: string
    description: string
    type: "LOGIN" | "REGISTER"
}

export const AuthContainer = ({children, title, description, type}: AuthContainerProps) => {
    const isAuth = type === "LOGIN" ? "Tidak punya akun ?" : "Sudah punya akun ?"

    return (
        <div className="w-full mt-10 space-y-6">
            <div>
                <h3 className="text-3xl font-semibold text-gnrDarkBlue">{title}</h3>
                <p className="text-base font-normal text-gnrGray">{description}</p>
            </div>
            {children}
            <div className="flex items-center justify-center">
                <p className="text-gnrWhiteGray text-sm">{isAuth}</p>
                <Link href={type === "LOGIN" ? "/dashboard/register" : "/dashboard/login"} className="relative text-sm font-medium text-gnrDarkBlue">{type === "LOGIN" ? "Daftar disini" : "Masuk"}<Image src={'/images/auth/auth-vector.svg'} alt="general-vector-auth" width={100} height={100} className="absolute top-6" /></Link>
            </div>
        </div>
    )
}