'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './navbar/Navbar';

export const Header = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard') || pathname === '/session-expire') return null;

  return (
    <header className={`w-full max-w-5xl fixed top-4 right-1/2 translate-x-1/2 py-2 px-4 z-50 backdrop-blur-xs border-2 border-white/20 rounded-full`}>
      <Navbar />
    </header>
  );
};
