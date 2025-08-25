'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { queryGetAllFundAccountsOptions } from "@/lib/queries/fund-accounts";
import { useQueryClient } from "@tanstack/react-query";
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

export const FundAccountsToolbar = () => {
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

    const handleFilter = (filter: "type" | "status", params: string) => {
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
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        handleDebounceSearch(value)
    }

  return (
    <div className="w-full md:w-fit flex flex-col md:flex-row items-center gap-3">
      <Label className="relative w-full">
        <Search className="absolute left-2 size-4 text-gnrGray" />
        <Input
          id="filter-search"
          onChange={handleSearch}
          defaultValue={currentParams.get('keyword') ? currentParams.get('keyword')?.toString() : ''}
          placeholder="Cari akun..."
          type="text"
          className="pl-8 font-normal"
        />
      </Label>
      <Select onValueChange={(value) => handleFilter('type', value)} defaultValue={currentParams.get('type') ? currentParams.get('type')?.toString() : 'default'}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Semua Jenis" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="default">Semua Jenis</SelectItem>
            <SelectItem value="Bank">Bank</SelectItem>
            <SelectItem value="Cash">Cash</SelectItem>
            <SelectItem value="Ewallet">Ewallet</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilter('status', value)} defaultValue={currentParams.get('status') ? currentParams.get('status')?.toString() : 'default'}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Semua Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="default">Semua Status</SelectItem>
            <SelectItem value="aktif">Aktif</SelectItem>
            <SelectItem value="nonaktif">NonAktif</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
