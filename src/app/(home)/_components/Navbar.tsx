"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ThemeToogle } from "./ThemeTooggle";
import Link from "next/link";
import { useSystemSettingStore } from "@/hooks/useSystemSettingStore";
import { getPublicUrlImage } from "@/lib/supabase/getPublicUrl";
import { BUCKET_APP_IMAGES } from "@/lib/supabase/index";

export const Navbar = () => {
    const {app_name, organization_address, logo_url} = useSystemSettingStore()

    return (
        <div className="container max-w-5xl mx-auto px-4 lg:px-0">
            <div className="flex items-center justify-between">
                <Link href={"/"} className="flex items-center gap-2">
                    <Image
                        src={getPublicUrlImage(BUCKET_APP_IMAGES, logo_url)}
                        alt={app_name}
                        width={50}
                        height={50}
                        className="size-12 rounded-full"
                    />
                    <div>
                        <h1 className="font-bold text-gnrPrimary">{app_name}</h1>
                        <p className="hidden md:block text-sm text-black dark:text-gnrWhite">
                            {organization_address}
                        </p>
                    </div>
                </Link>

                <div className="flex items-center gap-2">
                    <ThemeToogle />
                    <Button
                        className="dark:bg-white dark:hover:bg-white/80 dark:text-black hidden md:flex py-5 text-white font-semibold shadow-xl bg-gnrPrimary hover:bg-gnrPrimary/80 hover:scale-105 cursor-pointer transition-global duration-300"
                        asChild
                    >
                        <Link href={"/dashboard/login"}>Mulai Sekarang</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
