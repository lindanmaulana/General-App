'use client';

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { DEFAULT_QUERY_PARAMS, DEFAULT_ROUTE } from '@/lib/constants/default-route';
import { Calendar, Download, LayoutDashboard, Settings, TrendingDown, TrendingUp, Wallet, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FormLogout } from './FormLogout';

interface Item {
  title: string;
  url: string;
  icon: LucideIcon;
}

const items: Item[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Pemasukan',
    url: `${DEFAULT_ROUTE.incomes}?${DEFAULT_QUERY_PARAMS}`,
    icon: TrendingUp,
  },
  {
    title: 'Pengeluaran',
    url: `${DEFAULT_ROUTE.expenses}?${DEFAULT_QUERY_PARAMS}`,
    icon: TrendingDown,
  },
  {
    title: 'Kas & Bank',
    url: `${DEFAULT_ROUTE.fund_accounts}?${DEFAULT_QUERY_PARAMS}`,
    icon: Wallet,
  },
  {
    title: 'Events',
    url: `${DEFAULT_ROUTE.events}?${DEFAULT_QUERY_PARAMS}`,
    icon: Calendar,
  },
];

export const AppSidebar = () => {
  const pathname = usePathname();

  const getActiveRoute = (route: string) => {
    const cleanPathname = pathname.split('?')[0];
    const cleanRoute = route.split('?')[0];

    const exactMatchRoutes = ['/dashboard'];

    if (exactMatchRoutes.includes(cleanRoute)) {
      return cleanPathname === cleanRoute ? 'bg-gnrPrimary text-white border-2 border-blue-800' : '';
    }

    return cleanPathname === cleanRoute || cleanPathname.startsWith(cleanRoute + '/') ? 'bg-gnrPrimary text-white border-2 border-blue-800' : '';
  };

  return (
    <Sidebar>
      <SidebarHeader className="bg-white dark:bg-black dark:border-white/20 flex flex-row items-center gap-2 p-4 border-b">
        <Image src={'/images/logo/general.png'} alt="General Muncangela" width={40} height={40} />
        <div>
          <h2 className="text-gnrDarkBlue dark:text-white font-bold">General CashFlow</h2>
          <p className="text-sm text-gnrGray">Management</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white dark:bg-black py-4 px-2">
        <SidebarGroup>
          <SidebarGroupLabel className='dark:text-white'>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className={`${getActiveRoute(item.url)} hover:bg-gnrPrimary/40`} asChild>
                    <Link href={item.url} className="dark:text-white font-medium flex items-center gap-3 py-5">
                      <item.icon />
                      <h3>{item.title}</h3>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className={`${getActiveRoute('/dashboard/settings')} hover:bg-gnrPrimary/40`} asChild>
                  <Link href={"/dashboard/settings"} className='dark:text-white font-medium flex items-center gap-3 py-5'>
                    <Settings />
                    <h3>Pengaturan</h3>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className={`${getActiveRoute('/dashboard/export-data')} hover:bg-gnrPrimary/40`} asChild>
                  <Link href={"/dashboard/export-data"} className='dark:text-white font-medium flex items-center gap-3 py-5'>
                    <Download />
                    <h3>Export Data</h3>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='bg-white dark:bg-black'>
        <SidebarMenu>
          <SidebarMenuItem className="px-2">
            <SidebarMenuButton asChild>
              <FormLogout />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
