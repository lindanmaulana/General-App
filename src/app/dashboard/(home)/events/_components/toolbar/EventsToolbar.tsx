'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionToolbar } from '@/app/dashboard/(home)/events/_hooks/useActionToolbar';

export const EventsToolbar = () => {
    const currentParams = useSearchParams()

    const {handleSearch, handleFilter} = useActionToolbar()
    
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
