'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { userProfileOptions } from '@/lib/queries/users/userProfileOptions';
import { useQuery } from '@tanstack/react-query';
import { User } from 'lucide-react';
import { useMemo } from 'react';
import { Users } from '../../_types/profile';
import { ProfileForm } from '../form/ProfileForm';
import { ProfileFormSkeleton } from '../skeleton/ProfileFormSkeleton';

interface ProfileCardProps {
  data?: Users | null;
}
export const ProfileCard = ({ data }: ProfileCardProps) => {
  
  const options = useMemo(() => {
    return userProfileOptions(data ? data.id : "")
  }, [data])

  const queryUser = useQuery(options)

  return (
    <Card className='dark:bg-black dark:border-white/20'>
      <CardHeader>
        <CardTitle className="dark:text-gnrWhite flex items-center gap-1">
          {' '}
          <User className="size-5" /> <span className="text-xl mt-px">Profile Pengguna</span>
        </CardTitle>
        <CardDescription>Kelola informasi personal dan kontak Anda</CardDescription>
      </CardHeader>
      <CardContent>
        {queryUser.isLoading ? <ProfileFormSkeleton /> : queryUser.isError ? <></> : queryUser.data && <ProfileForm id={data?.id || ""} defaultValue={queryUser.data} />}
      </CardContent>
    </Card>
  );
};
