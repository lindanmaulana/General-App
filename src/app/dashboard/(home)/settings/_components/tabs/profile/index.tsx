"use client";

import { User } from "lucide-react";
import { TabsCard } from "../../card/TabsCard";
import { Users } from "../../../_types/profile";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { userProfileOptions } from "@/lib/queries/users/userProfileOptions";
import { TabsSkeleton } from "../../skeleton/TabsSkeleton";
import { ProfileForm } from "../../form/ProfileForm";

interface ProfileSettingsProps {
    session?: Users | null;
}

export const ProfileSettings = ({ session }: ProfileSettingsProps) => {
    const options = useMemo(() => {
        return userProfileOptions(session ? session.id : "");
    }, [session]);

    const { data, isLoading, isError } = useQuery(options);

    return (
        <TabsCard title="Profile" description="Pengaturan profile pengguna" icon={User}>
            {isLoading || isError ? (
                <TabsSkeleton icon={User} text="Pengaturan Profile" />
            ) : (
                <ProfileForm id={session?.id || ""} defaultValue={data} />
            )}
        </TabsCard>
    );
};
