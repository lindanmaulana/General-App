"use client"

import { systemSettingListOptions } from "@/lib/queries/settings/systemSettingListOptions";
import { useQuery } from "@tanstack/react-query";
import { Cog, Database } from "lucide-react";
import { TabsCard } from "../../card/TabsCard";
import { TabsSkeleton } from "../../skeleton/TabsSkeleton";
import { SystemForm } from "./SystemForm";

const SystemSettings = () => {
    const {data, isLoading, isError} = useQuery(systemSettingListOptions())

    return (
        <TabsCard title="Konfigurasi Umum" description="Pengaturan dasar untuk sistem manajemen keuangan" icon={Database}>
            {isLoading || isError ? <TabsSkeleton icon={Cog} text="Pengaturan Sistem" /> : <SystemForm defaultValues={data} />}
        </TabsCard>
    );
};

export default SystemSettings;