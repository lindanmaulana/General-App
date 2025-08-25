import { NextRequest } from 'next/server';
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAXIMUM_LIMIT } from '../../../../lib/constants/pagination';
import { fundAccountsCreateRequest, fundAccountsUpdateRequest } from '../models/fund-accounts';
import supabase from '../../../../lib/supabase';
import { RESPONSE_MESSAGE } from '../../../../lib/constants/response-message';
import { customAPIError } from '@/lib/helpers/customAPIError';

export class fundAccountsService {
  static table = 'fund_accounts';

  static async create(req: fundAccountsCreateRequest) {
    const result = await supabase.from(this.table).insert(req).select();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.create} akun`, result.status);

    return result.data[0];
  }

  static async update(req: fundAccountsUpdateRequest, id: string) {
    const checkFundAccount = await this.checkingFundAccount(id);

    const result = await supabase.from(this.table).update(req).eq('id', checkFundAccount.id).select();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.update} akun`, result.status);

    return result.data[0];
  }

  static async delete(id: string) {
    const checkFundAccount = await this.checkingFundAccount(id);

    const result = await supabase.from(this.table).delete().eq('id', checkFundAccount.id).single();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.delete} akun`, result.status);

    return result.data;
  }

  static async getAll(req: NextRequest) {
    const query = supabase.from(this.table).select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(5);

    let limit: number = DEFAULT_LIMIT;
    let page: number = DEFAULT_PAGE;

    let totalPage: number = 1;
    let nextPage: number | null = null;
    let prevPage: number | null = null;
    let links: number[] = [1];

    if (req) {
      const url = new URL(req.url);

      const limitParams = url.searchParams.get('limit');
      const pageParams = url.searchParams.get('page');
      const keywordParams = url.searchParams.get('keyword');
      const typeParams = url.searchParams.get('type');
      const statusParams = url.searchParams.get('status');

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

      if (keywordParams) query.ilike('name', `%${keywordParams}%`);

      if (typeParams) query.eq('type', typeParams.toUpperCase());

      if (statusParams) {
        if (statusParams.toLowerCase() === 'aktif') query.eq('is_active', true);
        else if (statusParams.toLowerCase() === 'nonaktif') query.eq('is_active', false);
      }

      const start = (page - 1) * limit;
      const end = start + limit - 1;

      query.range(start, end);
    }

    const result = await query;

    if (result.error) throw new Error(`Gagal mengambil data akun: ${result.error.message}`);

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

  static async getAllOptions() {
    const result = await supabase.from(this.table).select('id, name').eq('is_active', true);

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} akun`, result.status);

    return result.data;
  }

  static async getActiveCount() {
    const result = await supabase.from(this.table).select('*', { count: 'exact', head: true }).eq('is_active', true);

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} akun aktif`, result.status);

    return result.count;
  }

  static async getTotalBalance() {
    const result = await supabase.rpc('get_total_balance').single();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} total balance`, result.status);

    return result.data;
  }

  static async getTotalBalanceCash() {
    const result = await supabase.rpc('get_total_balance_cash').single();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} total cash`, result.status);

    return result.data;
  }

  static async getTotalBalanceNonCash() {
    const result = await supabase.rpc('get_total_balance_non_cash').single();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} total saldo non cash`, result.status);

    return result.data;
  }

  static async getActiveNonCashCount() {
    const result = await supabase.from(this.table).select('*', { count: 'exact' }).neq('type', 'CASH').eq('is_active', true);

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} akun non cash aktif`, result.status);

    return result.count;
  }

  static async checkingFundAccount(id: string) {
    const result = await supabase.from(this.table).select('*').eq('id', id).select().single();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} akun`, result.status);

    return result.data;
  }

  static async checkingFundAccountActive(id: string) {
    const result = await supabase.from(this.table).select('*').eq('id', id).eq('is_active', true).single();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} akun`, result.status);

    if (!result.data) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} akun non aktif`, result.status);

    return result.data;
  }
}
