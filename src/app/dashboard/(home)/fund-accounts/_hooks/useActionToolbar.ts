import { queryGetAllFundAccountsOptions } from "@/lib/queries/fund-accounts";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";



export const useActionToolbar = () => {
    const currentParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const queryClient = useQueryClient()
    
    const handleDebounceSearch = useDebouncedCallback((params: string) => {
        const url = new URLSearchParams(currentParams.toString())

        switch(params) {
            case "":
                url.delete("keyword")
            break
            default:
                url.set("keyword", params)
                url.set("page", '1')
            break
        }

        queryClient.prefetchQuery(queryGetAllFundAccountsOptions(url.toString()))
        router.replace(`${pathname}?${url.toString()}`)
    }, 1000)

    const handleFilter = useCallback((filter: "type" | "status", params: string) => {
        const url = new URLSearchParams(currentParams.toString())

        if(filter === "type") {
            if(params !== "default") {
                url.set("type", params)
                url.set("page", "1")
            } else {
                url.delete("type")
            }
        }

        if(filter === "status") {
            if(params !== "default") {
                url.set("status", params)
                url.set("page", "1")
            } else {
                url.delete("status")
            }
        }

        queryClient.prefetchQuery(queryGetAllFundAccountsOptions(url.toString()))
        router.replace(`${pathname}?${url.toString()}`)
    }, [currentParams, pathname, queryClient, router])

    const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        handleDebounceSearch(value)
    }, [handleDebounceSearch])


    return {handleFilter, handleSearch}
}