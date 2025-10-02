"use client"

import { Bell } from "lucide-react"
import { TabsCard } from "../../card/TabsCard"

export const NotificationSettings = () => {
    return (
        <TabsCard icon={Bell} title="" description="">
            <div className="w-full h-[250px] flex items-center justify-center">
                <h4 className="dark:text-gnrWhite">Segera hadir...</h4>
            </div>
        </TabsCard>
    )
}