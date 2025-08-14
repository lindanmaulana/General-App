import { ShowPrivate } from "@/app/dashboard/(home)/_components/ShowPrivate"
import { FormCreate } from "@/app/dashboard/(home)/events/_components/FormCreate"
import { OverviewCard } from "@/app/dashboard/(home)/events/_components/OverviewCard"

const PageEvents = () => {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-3xl font-bold text-gnrDark">Event Management</h3>
                    <p className="text-gnrGray">Kelola semua event dan acara kampung</p>
                </div>
        
                <div className="flex items-center gap-2">
                    <ShowPrivate />
                    <FormCreate />
                </div>
            </div>
                    
            <OverviewCard />
        
            {/* <TableFundAccounts/> */}
        </div>
    )
}

export default PageEvents