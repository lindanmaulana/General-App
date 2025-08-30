'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './navbar/Navbar';

export const Header = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard') || pathname === '/session-expire') return null;

  return (
    <header className="fixed top-0 right-0 w-full py-4">
      <Navbar />
    </header>
  );
};
