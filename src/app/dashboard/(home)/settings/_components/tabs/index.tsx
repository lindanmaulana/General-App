import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bell, Cog, FileText } from 'lucide-react'
import SystemSettings from './system'

const SettingsTabs = () => {
  return (
    <div className='w-full flex flex-col gap-6'>
      <Tabs defaultValue='system'>
        <TabsList className='w-full grid grid-cols-3 bg-gnrPrimary/5'>
            <TabsTrigger value='system' className='data-[state=active]:text-gnrDark text-gnrGray'> <Cog /> Sistem</TabsTrigger>
            <TabsTrigger value='document' className='data-[state=active]:text-gnrDark text-gnrGray'> <FileText /> Dokumen PDF</TabsTrigger>
            <TabsTrigger value='notifikasi' className='data-[state=active]:text-gnrDark text-gnrGray'> <Bell /> Notifikasi</TabsTrigger>
        </TabsList>

        <TabsContent value='system'>
            <SystemSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsTabs