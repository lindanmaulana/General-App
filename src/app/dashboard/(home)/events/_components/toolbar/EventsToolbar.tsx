'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { queryGetAllEventsOptions } from "@/lib/queries/events";
import { useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

export const EventsToolbar = () => {
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

        queryClient.prefetchQuery(queryGetAllEventsOptions(url.toString()))
        router.replace(`${pathname}?${url.toString()}`)
    }, 1000)

    const handleFilter = (filter: "access" | "status", params: string) => {
        const url = new URLSearchParams(currentParams.toString())

        if(filter === "access") {
            if(params !== "default") {
                url.set("access", params)
                url.set("page", "1")
            } else {
                url.delete("access")
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

        queryClient.prefetchQuery(queryGetAllEventsOptions(url.toString()))
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
          placeholder="Cari event..."
          type="text"
          className="dark:text-gnrWhite dark:border-white/20 pl-8 font-normal"
        />
      </Label>
      <Select onValueChange={(value) => handleFilter('status', value)} defaultValue={currentParams.get('status') ? currentParams.get('status')?.toString() : 'default'}>
        <SelectTrigger className="dark:text-gnrWhite dark:border-white/20 w-full">
          <SelectValue placeholder="Semua Status" />
        </SelectTrigger>
        <SelectContent className='dark:bg-black dark:text-gnrWhite dark:border-white/20'>
          <SelectGroup>
            <SelectItem value="default">Semua Status</SelectItem>
            <SelectItem value="SCHEDULED">Scheduled</SelectItem>
            <SelectItem value="RUNNING">Running</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilter('access', value)} defaultValue={currentParams.get('access') ? currentParams.get('access')?.toString() : 'default'}>
        <SelectTrigger className="dark:text-gnrWhite dark:border-white/20 w-full">
          <SelectValue placeholder="Semua Akses" />
        </SelectTrigger>
        <SelectContent className='dark:bg-black dark:text-gnrWhite dark:border-white/20'>
          <SelectGroup>
            <SelectItem value="default">Semua Akses</SelectItem>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
