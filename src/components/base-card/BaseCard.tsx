'use client';

import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface BaseCardProps {
  title?: string;
  description?: string;
  Icon?: LucideIcon;
  children?: ReactNode;
  style?: string;
}

export const BaseCard = (props: BaseCardProps) => {
  const { children, style } = props;
  return (
    <Card className={`${style} dark:bg-black dark:border-white/20`}>
        {children}
    </Card>
  );
};
