
import { Metadata } from "next"
import { FormCreate } from "./_components/FormCreate"
import { OverviewCard } from "./_components/OverviewCard"
import { TableFundAccounts } from "./_components/TableFundAccounts"
import { ShowPrivate } from "../_components/ShowPrivate"

export const metadata: Metadata = {
    title: "Dashboard | Fund-Accounts"
}

const PageFundAccounts = () => {
    return (
        <div className="space-y-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="w-full">
                    <h3 className="text-3xl font-bold text-gnrDark">Kas & Bank</h3>
                    <p className="text-gnrGray">Kelola semua akun keuangan Anda</p>
                </div>

                <div className="w-full md:w-fit flex flex-col md:flex-row items-center gap-2">
                    <ShowPrivate />
                    <FormCreate />
                </div>
            </div>
            
            <OverviewCard />
            <TableFundAccounts/>
        </div>
    )
}

export default PageFundAccounts