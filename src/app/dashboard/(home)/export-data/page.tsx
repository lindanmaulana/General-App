import { BaseCard } from '@/components/base-card/BaseCard';
import { BaseCardContent } from '@/components/base-card/BaseCardContent';
import { BaseCardHeader } from '@/components/base-card/BaseCardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, FileSpreadsheet, FileText } from 'lucide-react';
import { CategoryDataConfig } from './_components/export/config/CategoryDataConfig';
import { EventConfig } from './_components/export/config/EventConfig';
import { FormatFileConfig } from './_components/export/config/FormatFileConfig';
import { RentangDateConfig } from './_components/export/config/RentangDateConfig';
import { CustomExportToolbar } from './_components/toolbar/CustomExportToolbar';
import { ResetConfigurationExportToolbar } from './_components/toolbar/ResetConfigurationExportToolbar';
import { ExportPdfToolbar } from './_components/fast-export/toolbar/ExportPdfToolbar';

const ExportDataPage = () => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center justify-between gap-3">
        <div className="w-full">
          <h3 className="dark:text-white text-3xl font-bold text-gnrDark">Export Data</h3>
          <p className="text-gnrGray">Unduh data keuangan dalam berbagai format</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
        <Card className="dark:bg-black dark:border-white/20 w-full md:flex-1">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="dark:text-gnrWhite text-xl">Konfigurasi Export</CardTitle>
                <CardDescription>Pilih format, rentang tanggal, dan kategori data yang akan diexport</CardDescription>
              </div>
              <ResetConfigurationExportToolbar />
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <FormatFileConfig />
            <hr className="mt-6 border-1" />
            <RentangDateConfig />
            <hr className="mt-6 border-1" />
            <CategoryDataConfig />
            <hr className="mt-6 border-1" />
            <EventConfig />
          </CardContent>
        </Card>

        <div className="w-full lg:w-[30%] space-y-6">
          <BaseCard key={'export-cepat'} style="w-full">
            <BaseCardHeader title="Export Cepat" description="Template export yang sudah dikonfigurasi"></BaseCardHeader>
            <BaseCardContent style="space-y-3">
              <Button variant={'outline'} className="dark:text-gnrWhite w-full flex items-center justify-start py-5 cursor-pointer">
                <FileSpreadsheet /> Laporan Bulana (Excel)
              </Button>
              <ExportPdfToolbar></ExportPdfToolbar>
              <Button variant={'outline'} className="dark:text-gnrWhite w-full flex items-center justify-start py-5 cursor-pointer">
                <Database /> Backup Lengkap JSON
              </Button>
            </BaseCardContent>
          </BaseCard>
          <BaseCard>
            <BaseCardHeader title="Export Custom" description="Export dengan konfigurasi di atas"></BaseCardHeader>
            <BaseCardContent>
              <CustomExportToolbar />
            </BaseCardContent>
          </BaseCard>
        </div>
      </div>
    </div>
  );
};

export default ExportDataPage;
