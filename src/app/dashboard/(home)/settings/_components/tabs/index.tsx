import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Cog, FileText, User } from 'lucide-react'
import { Users } from '../../_types/profile'
import { ProfileSettings } from './profile'
import SystemSettings from './system'
import { PdfDocumentSettings } from './pdf-document'

interface SettingsTabsProps {
  session?: Users | null
}

const SettingsTabs = ({session}: SettingsTabsProps) => {
  return (
    <div className='w-full flex flex-col gap-6'>
      <Tabs defaultValue='system'>
        <TabsList className='dark:bg-gnrGray w-full h-10 grid grid-cols-3 md:gap-3 bg-gnrPrimary/5 overflow-x-auto'>
            <TabsTrigger value='system' className='dark:data-[state=active]:bg-gnrDark dark:data-[state=active]:border-none dark:data-[state=active]:text-gnrWhite dark:text-gnrDark/60 data-[state=active]:text-gnrDark '> <Cog /> Sistem</TabsTrigger>
            <TabsTrigger value='profile' className='dark:data-[state=active]:bg-gnrDark dark:data-[state=active]:border-none dark:data-[state=active]:text-gnrWhite dark:text-gnrDark/60 data-[state=active]:text-gnrDark '> <User /> Profile </TabsTrigger>
            <TabsTrigger value='document' className='dark:data-[state=active]:bg-gnrDark dark:data-[state=active]:border-none dark:data-[state=active]:text-gnrWhite dark:text-gnrDark/60 data-[state=active]:text-gnrDark '> <FileText /> Dokumen PDF </TabsTrigger>
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
      </Tabs>
    </div>
  )
}

export default SettingsTabs