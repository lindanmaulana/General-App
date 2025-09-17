import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useActionTable = () => {
    const currentParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handlePagination = useCallback((page: string) => {
        const url = new URLSearchParams(currentParams.toString());

        url.set("page", page);

        router.replace(`${pathname}?${url.toString()}`);
    }, [currentParams, pathname, router]);

    const handleLimit = useCallback((limit: string) => {
        const url = new URLSearchParams(currentParams.toString());

        url.set("limit", limit);
        url.set("page", "1");

        router.replace(`${pathname}?${url.toString()}`);
    }, [currentParams, pathname, router]);

    return {handlePagination, handleLimit}
};
