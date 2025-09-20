"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export const Header = () => {
    const pathname = usePathname();

    if (pathname.startsWith("/dashboard") || pathname === "/session-expire") return null;

    return (
        <header
            className={`dark:border-white/10 w-full fixed top-0 py-3 px-4 z-50 backdrop-blur-xs bg-transparent border-b`}
        >
            <Navbar />
        </header>
    );
};
