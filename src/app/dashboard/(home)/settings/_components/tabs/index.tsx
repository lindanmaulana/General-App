import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bell, Cog, FileText, User } from 'lucide-react'
import { Users } from '../../_types/profile'
import { NotificationSettings } from './notification'
import PdfDocumentSettings from './pdf-document'
import { ProfileSettings } from './profile'
import SystemSettings from './system'

interface SettingsTabsProps {
  session?: Users | null
}

const SettingsTabs = ({session}: SettingsTabsProps) => {
  return (
    <div className='w-full flex flex-col gap-6'>
      <Tabs defaultValue='system'>
        <TabsList className='dark:bg-gnrGray w-full h-10 grid grid-cols-4 gap-3 bg-gnrPrimary/5'>
            <TabsTrigger value='system' className='dark:data-[state=active]:bg-gnrDark dark:data-[state=active]:border-none dark:data-[state=active]:text-gnrWhite dark:text-gnrDark/60 data-[state=active]:text-gnrDark '> <Cog /> Sistem</TabsTrigger>
            <TabsTrigger value='profile' className='dark:data-[state=active]:bg-gnrDark dark:data-[state=active]:border-none dark:data-[state=active]:text-gnrWhite dark:text-gnrDark/60 data-[state=active]:text-gnrDark '> <User /> Profile </TabsTrigger>
            <TabsTrigger value='document' className='dark:data-[state=active]:bg-gnrDark dark:data-[state=active]:border-none dark:data-[state=active]:text-gnrWhite dark:text-gnrDark/60 data-[state=active]:text-gnrDark '> <FileText /> Dokumen PDF <Badge className='bg-gnrPrimary text-xs'>Beta</Badge> </TabsTrigger>
            <TabsTrigger value='notifikasi' className='dark:data-[state=active]:bg-gnrDark dark:data-[state=active]:border-none dark:data-[state=active]:text-gnrWhite dark:text-gnrDark/60 data-[state=active]:text-gnrDark '> <Bell /> Notifikasi</TabsTrigger>
        </TabsList>

        <TabsContent value='system'>
            <SystemSettings />
        </TabsContent>

        <TabsContent value="profile">
          <ProfileSettings session={session} />
        </TabsContent>

        <TabsContent value="document">
          <PdfDocumentSettings />
        </TabsContent>

        <TabsContent value='notifikasi'>
            <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsTabs