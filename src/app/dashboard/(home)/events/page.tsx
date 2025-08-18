import { ShowPrivate } from "@/app/dashboard/(home)/_components/ShowPrivate"
import { FormCreate } from "@/app/dashboard/(home)/events/_components/FormCreate"
import { OverviewCard } from "@/app/dashboard/(home)/events/_components/OverviewCard"
import { TableEvents } from "./_components/TableEvents"

const PageEvents = () => {
    return (
        <div className="space-y-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="w-full">
                    <h3 className="text-3xl font-bold text-gnrDark">Event Management</h3>
                    <p className="text-gnrGray">Kelola semua event dan acara kampung</p>
                </div>
        
                <div className="w-full md:w-fit flex flex-col md:flex-row items-center gap-2">
                    <ShowPrivate />
                    <FormCreate />
                </div>
            </div>
                    
            <OverviewCard />
        
            <TableEvents />
        </div>
    )
}

export default PageEvents