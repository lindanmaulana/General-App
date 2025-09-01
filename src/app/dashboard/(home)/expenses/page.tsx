import { FormCreate } from './_components/form/FormCreate';
import { ExpensesTableCard } from './_components/table/ExpensesTableCard';
import { OverviewExpensesAmount } from './_components/OverviewExpensesAmount';

const PageExpenses = () => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="w-full">
          <h3 className="dark:text-white text-3xl font-bold text-gnrDark">Pengeluaran</h3>
          <p className="text-gnrGray">Kelola dan lacak semua pengeluaran Anda</p>
        </div>

        <FormCreate />
      </div>

      <OverviewExpensesAmount />
      <ExpensesTableCard />
    </div>
  );
};

export default PageExpenses;
