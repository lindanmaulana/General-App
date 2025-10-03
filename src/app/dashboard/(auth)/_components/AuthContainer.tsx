"use client"

import { useSystemSettingStore } from "@/hooks/useSystemSettingStore"
import { getPublicUrlImage } from "@/lib/supabase/getPublicUrl"
import { BUCKET_APP_IMAGES } from "@/lib/supabase/index"
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

interface AuthContainerProps {
    children: ReactNode
    title: string
    description: string
    type: "LOGIN" | "REGISTER"
}

export const AuthContainer = ({children, title, description}: AuthContainerProps) => {
    const {app_name, logo_url} = useSystemSettingStore()

    return (
        <div className="dark:border-white/30 w-full px-6 py-8 rounded-md border shadow-md hover:shadow-xl transition-global duration-200">
            <Link href={"/"} className="dark:text-white text-gnrDarkBlue font-bold text-lg text-left flex items-center gap-2"><Image src={logo_url ? getPublicUrlImage(BUCKET_APP_IMAGES, logo_url) : logo_url} alt={app_name} width={40} height={40}className="size-12 rounded-full" />{app_name}</Link>
            <div className="w-full mt-8 space-y-6">
                <div>
                    <h3 className="dark:text-white text-3xl font-semibold text-gnrDarkBlue">{title}</h3>
                    <p className="text-base font-normal text-gnrGray">{description}</p>
                </div>
                {children}
                <div className="flex items-center justify-center">
                    <p className="text-gnrWhiteGray text-sm">{app_name}</p>
                </div>
            </div>
        </div>
    )
}