import { RESPONSE_MESSAGE } from '@/lib/constants/response-message';
import { customAPIError } from '@/lib/helpers/customAPIError';
import supabase from '@/lib/supabase';

export class financialSummaryService {
  static async getMonthly() {
    const year = new Date().getFullYear();
    const result = await supabase.rpc('get_monthly_financial_summary_by_year', {
      target_year: year,
    });

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} ringkasan keuangan bulanan`, result.status);

    return result.data;
  }
}
