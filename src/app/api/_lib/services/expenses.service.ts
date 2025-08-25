import { NextRequest } from 'next/server';
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAXIMUM_LIMIT } from '../../../../lib/constant/pagination';
import { RESPONSE_MESSAGE } from '../../../../lib/constant/response-message';
import { expenses, expensesCreateRequest } from '../models/expenses';
import supabase from '../../../../lib/supabase';
import { eventsService } from './events.service';
import { fundAccountsService } from './fund-accounts.service';
import { TypeExpensesSchema } from '../../../../lib/validations/expenses';
import { customAPIError } from '@/lib/helpers/customAPIError';

export class expensesService {
  static table = 'expenses';

  static async create(req: expensesCreateRequest) {
    const event = await eventsService.checkingEvent(req.event_id);

    const checkStatusEvent = await eventsService.checkingStatusNotCancelled(event.id)

    const fundAccount = await fundAccountsService.checkingFundAccount(req.fund_account_id);

    const fundAccountActive = await fundAccountsService.checkingFundAccountActive(fundAccount.id);

    const result = await supabase
      .from(this.table)
      .insert({ ...req, event_id: checkStatusEvent.id, fund_account_id: fundAccountActive.id })
      .single();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.create} pengeluaran`, result.status);

    return result.data;
  }

  static async update(req: TypeExpensesSchema, id: string): Promise<expenses> {
    const checkIncomes = await this.checkingIncomes(id);

    const result = await supabase.from(this.table).update(req).eq('id', checkIncomes.id).select().single();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.delete} pengeluaran`, result.status);

    return result.data;
  }

  static async delete(id: string): Promise<expenses> {
    const checkIncomes = await this.checkingIncomes(id);

    const result = await supabase.from(this.table).delete().eq('id', checkIncomes.id).select().single();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.delete} pengeluaran`, result.status);

    return result.data;
  }

  static async getAll(req: NextRequest) {
    const query = supabase.from(this.table).select('*, events!inner(id, code, name), fund_accounts!inner(id, name)', { count: 'exact' }).limit(5);

    let limit = DEFAULT_LIMIT;
    let page = DEFAULT_PAGE;

    let totalPage: number = 1;
    let nextPage: number | null = null;
    let prevPage: number | null = null;
    let links: number[] = [1];

    if (req) {
      const url = new URL(req.url);

      const limitParams = url.searchParams.get('limit');
      const pageParams = url.searchParams.get('page');

      const keywordParams = url.searchParams.get('keyword');
      const eventParams = url.searchParams.get('event');
      const accountParams = url.searchParams.get('account');
      const sortParams = url.searchParams.get('sort');
      const startDateParams = url.searchParams.get('start-date');
      const endDateParams = url.searchParams.get('end-date');

      if (limitParams) {
        const parseLimit = Number(limitParams);

        if (parseLimit > MAXIMUM_LIMIT) {
          limit = DEFAULT_LIMIT;
        } else {
          limit = parseLimit;
        }
      }

      if (pageParams) {
        const parsePage = Number(pageParams);

        if (parsePage < DEFAULT_PAGE) {
          page = DEFAULT_PAGE;
        } else {
          page = parsePage;
        }
      }

      if (keywordParams) query.ilike('source', `%${keywordParams}%`);

      if (eventParams) query.eq('events.code', eventParams);

      if (accountParams) query.eq('fund_accounts.name', accountParams);

      if (sortParams) query.order('amount', { ascending: sortParams === 'asc' });
      else query.order('created_at', { ascending: false });

      if (startDateParams && endDateParams) query.gte('date', startDateParams).lte('date', endDateParams);

      const start = (page - 1) * limit;
      const end = start + limit - 1;

      query.range(start, end);
    }

    const result = await query;

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} pengeluaran`, result.status);

    if (result.count) {
      totalPage = Math.ceil(result.count / limit);
      nextPage = page > 0 && page < totalPage ? page + 1 : null;
      prevPage = page > 1 ? page - 1 : null;
      links = Array.from({ length: totalPage }, (_, index) => index + 1);
    }

    const response = {
      ...result,
      pagination: {
        totalPage,
        currentPage: page,
        limit,
        links,
        nextPage,
        prevPage,
      },
    };

    return response;
  }

  static async getTotalThisMonth() {
    const result = await supabase.rpc('get_total_expenses_this_month');

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} total pengeluaran bulan ini`, result.status);

    return result.data;
  }

  static async checkingIncomes(id: string): Promise<expenses> {
    const result = await supabase.from(this.table).select('*').eq('id', id).select().single();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} pengeluaran`, result.status);

    return result.data;
  }
}
