"use client"

import { appearanceSystemSettingOptions } from "@/lib/queries/settings/appearanceSystemSettingOptions";
import { brandingSystemSettingOptions } from "@/lib/queries/settings/brandingSystemSettingOptions";
import { useQueries } from "@tanstack/react-query";
import { Cog, Database } from "lucide-react";
import { TabsCard } from "../../card/TabsCard";
import { SystemForm } from "./SystemForm";
import { TabsSkeleton } from "../../skeleton/TabsSkeleton";

const SystemSettings = () => {
    const {defaultValues, isLoading, isError} = useQueries({
        queries: [brandingSystemSettingOptions(), appearanceSystemSettingOptions()],
        combine: (results) => {
            return {
                defaultValues: {...results[0].data, ...results[1].data},
                isLoading: results.some(result => result.isLoading),
                isError: results.some(result => result.isError)
            }
        }
    })

    return (
        <TabsCard title="Konfigurasi Umum" description="Pengaturan dasar untuk sistem manajemen keuangan" icon={Database}>
            {isLoading || isError ? <TabsSkeleton icon={Cog} text="Pengaturan Sistem" /> : <SystemForm defaultValues={defaultValues} />}
        </TabsCard>
    );
};

export default SystemSettings;
