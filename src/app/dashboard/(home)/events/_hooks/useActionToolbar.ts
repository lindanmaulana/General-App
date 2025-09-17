import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useActionToolbar = () => {
    const currentParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleDebounceSearch = useDebouncedCallback((params: string) => {
        const url = new URLSearchParams(currentParams.toString());

        switch (params) {
            case "":
                url.delete("keyword");
                break;
            default:
                url.set("keyword", params);
                url.set("page", "1");
                break;
        }

        router.replace(`${pathname}?${url.toString()}`);
    }, 1000);

    const handleFilter = useCallback(
        (filter: "access" | "status", params: string) => {
            const url = new URLSearchParams(currentParams.toString());

            if (filter === "access") {
                if (params !== "default") {
                    url.set("access", params);
                    url.set("page", "1");
                } else {
                    url.delete("access");
                }
            }

            if (filter === "status") {
                if (params !== "default") {
                    url.set("status", params);
                    url.set("page", "1");
                } else {
                    url.delete("status");
                }
            }

            router.replace(`${pathname}?${url.toString()}`);
        },
        [currentParams, pathname, router]
    );

    const handleSearch = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;

            handleDebounceSearch(value);
        },
        [handleDebounceSearch]
    );

    return { handleFilter, handleSearch };
};
