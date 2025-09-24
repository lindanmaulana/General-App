import { getSession } from "@/actions/getSession";
import { ProfileCard } from "./_components/card/ProfileCard";
import SettingsTabs from "./_components/tabs";

const PageSettings = async () => {
    const session = await getSession();

    return (
        <div className="space-y-5">
            <div className="flex flex-col items-center justify-between gap-3">
                <div className="w-full">
                    <h3 className="dark:text-white text-3xl font-bold text-gnrDark">Pengaturan Sistem</h3>
                    <p className="text-gnrGray">Konfigurasi dan pengaturan aplikasi CashFlow</p>
                </div>
            </div>

            <SettingsTabs />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ProfileCard data={session?.user} />
            </div>

        </div>
    );
};

export default PageSettings;
