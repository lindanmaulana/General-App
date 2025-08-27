'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { queryGetProfileUsersOptions } from '@/lib/queries/users';
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
    return queryGetProfileUsersOptions(data ? data.id : "")
  }, [data])

  const queryUser = useQuery(options)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
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
