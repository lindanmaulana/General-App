
import { Metadata } from "next"
import { FormCreate } from "./_components/FormCreate"
import { OverviewCard } from "./_components/OverviewCard"
import { ShowPrice } from "./_components/ShowPrice"
import { TableFundAccounts } from "./_components/TableFundAccounts"

export const metadata: Metadata = {
    title: "Dashboard | Fund-Accounts"
}

const PageFundAccounts = async () => {

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-3xl font-bold text-gnrDark">Kas & Bank</h3>
                    <p className="text-gnrGray">Kelola semua akun keuangan Anda</p>
                </div>

                <div className="flex items-center gap-2">
                    <ShowPrice />
                    <FormCreate />
                </div>
            </div>
            
            <OverviewCard />
            <TableFundAccounts/>
        </div>
    )
}

export default PageFundAccounts