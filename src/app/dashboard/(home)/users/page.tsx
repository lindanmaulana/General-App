const PageUsers = () => {
    return (
        <div className="space-y-5">
            <div className="flex flex-col items-center justify-between gap-3">
                <div className="w-full">
                    <h3 className="dark:text-white text-3xl font-bold text-gnrDark">Pengaturan Sistem</h3>
                    <p className="text-gnrGray">Konfigurasi dan pengaturan aplikasi CashFlow</p>
                </div>
            </div>

            {/* <SettingsTabs session={session?.user} /> */}
        </div>
    );
};

export default PageUsers;
