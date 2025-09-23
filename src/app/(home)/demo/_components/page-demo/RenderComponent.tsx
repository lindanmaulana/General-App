import { DashboardDemo } from "./Dashboard"
import { EventsDemo } from "./Events"
import { ExpensesDemo } from "./Expenses"
import { FundAccountsDemo } from "./FundAccounts"
import { IncomesDemo } from "./Incomes"

const pageDemo = {
    DASHBOARD: DashboardDemo,
    INCOMES: IncomesDemo,
    EXPENSES: ExpensesDemo,
    FUNDACCOUNTS: FundAccountsDemo,
    EVENTS: EventsDemo
}

interface RenderComponentProps {
    id: string
}
export const RenderComponent = ({id}: RenderComponentProps) => {
    const Render = pageDemo[id as keyof typeof pageDemo]

    if(Render) return <Render />
    
    return <div>Komponen tidak ditemukan</div>
}