import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export const ErrorFundAccounts = () => {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4">
          <h1 className="text-6xl md:text-9xl font-bold mb-4">404</h1>
          <p className="text-2xl md:text-3xl mb-8">Gagal mengambil sumber daya.</p>
          <p className="text-lg mb-8">Maaf, terjadi kesalahan saat mencoba memuat data dari server.</p>
          <Link href="/dashboard" passHref>
            <div className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">
              Kembali ke Halaman Utama
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
