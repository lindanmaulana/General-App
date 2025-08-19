import { FormCreate } from "./_components/FormCreate"
import { OverviewTotalAmount } from "./_components/OverviewTotalAmount"
import { TableIncomes } from "./_components/TableIncomes"

const PageIncomes = () => {
    return (
        <div className="space-y-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="w-full">
                    <h3 className="text-3xl font-bold text-gnrDark">Pemasukan</h3>
                    <p className="text-gnrGray">Kelola semua sumber pemasukan anda</p>
                </div>
                
               <FormCreate />
            </div>
            
            <OverviewTotalAmount />
            <TableIncomes />
        </div>
    )
}

export default PageIncomes