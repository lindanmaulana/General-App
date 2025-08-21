import { CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonTable = () => {
  return (
    <CardContent className="w-full p-0">
      <Skeleton className="h-68 p-7 space-y-4">
        <Skeleton className="bg-gnrGray/20 h-40" />
        <Skeleton className="bg-gnrGray/20 h-10" />
      </Skeleton>
    </CardContent>
  );
};
