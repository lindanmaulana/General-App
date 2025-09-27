"use client"

import { useSystemSettingStore } from "@/hooks/useSystemSettingStore"
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
    const {app_name} = useSystemSettingStore()
    const isAuth = type === "LOGIN" ? "Tidak punya akun ?" : "Sudah punya akun ?"

    return (
        <div className="dark:border-white/30 w-full px-6 py-8 rounded-md border shadow-md hover:shadow-xl transition-global duration-200">
            <Link href={"/"} className="dark:text-white text-gnrDarkBlue font-bold text-lg text-left flex items-center gap-2"><Image src={"/images/logo/general.png"} alt="General13 Official" width={28} height={28} />{app_name}</Link>
            <div className="w-full mt-8 space-y-6">
                <div>
                    <h3 className="dark:text-white text-3xl font-semibold text-gnrDarkBlue">{title}</h3>
                    <p className="text-base font-normal text-gnrGray">{description}</p>
                </div>
                {children}
                <div className="flex items-center justify-center">
                    <p className="text-gnrWhiteGray text-sm">{isAuth}</p>
                    <Link href={type === "LOGIN" ? "/" : "/dashboard/login"} className="relative dark:text-gnrWhite text-sm font-medium text-gnrDarkBlue">{type === "LOGIN" ? "Daftar disini" : "Masuk"}<Image src={'/images/auth/auth-vector.svg'} alt="general-vector-auth" width={100} height={100} className="absolute top-6" /></Link>
                </div>
            </div>
        </div>
    )
}