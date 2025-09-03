import { NextRequest } from 'next/server';
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAXIMUM_LIMIT } from '../../../../lib/constants/pagination';
import { RESPONSE_MESSAGE } from '../../../../lib/constants/response-message';
import { events, eventsCreateRequest, eventsUpdateRequest } from '../models/events';
import supabase from '../../../../lib/supabase';
import { customAPIError } from '@/lib/helpers/customAPIError';

export class eventsService {
  static table = 'events';

  static async create(req: eventsCreateRequest) {
    await this.checkingDuplicateCode(req.code);

    const result = await supabase.from(this.table).insert(req).select();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.create} event`, result.status);

    return result.data[0];
  }

  static async update(req: eventsUpdateRequest, id: string) {
    const event = await this.checkingEvent(id);

    await this.checkingDuplicateCodeNeId(req.code, event.id);

    const result = await supabase.from(this.table).update(req).eq('id', event.id).single();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.update} event`, result.status);

    return result.data;
  }

  static async delete(id: string) {
    const event = await this.checkingEvent(id);

    const result = await supabase.from(this.table).delete().eq('id', event.id).single();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.delete} event`, result.status);

    return result.data;
  }

  static async getAll(req: NextRequest) {
    const query = supabase.from(this.table).select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(5);

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
      const statusParams = url.searchParams.get('status');
      const accessParams = url.searchParams.get('access');

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

      if (accessParams) {
        if (accessParams.toLowerCase() === 'public') query.eq('is_public', true);
        else if (accessParams.toLowerCase() === 'private') query.eq('is_public', false);
      }

      if (statusParams) query.eq('status', statusParams.toUpperCase());

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
    const result = await supabase.from(this.table).select('id, name, code, date').neq('status', 'CANCELLED');

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} event`, result.status);

    return result.data;
  }

  static async getCount() {
    const result = await supabase.from(this.table).select('*', { count: 'exact' });

    if (result.error) throw new Error('Data event not found');

    return result.count;
  }

  static async getPublicCount() {
    const result = await supabase.from(this.table).select('*', { count: 'exact' }).eq('is_public', true);

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} publik event`, result.status);

    return result.count;
  }

  static async getTotalBudget() {
    const result = await supabase.rpc('get_total_budget');

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} budget event`, result.status);

    return result.data;
  }

  static async checkingEvent(id: string): Promise<events> {
    const result = await supabase.from(this.table).select('*').eq('id', id).single();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} event`, result.status);

    return result.data;
  }

  static async checkingDuplicateCode(code: string) {
    const result = await supabase.from(this.table).select('*').eq('code', code).maybeSingle();

    if (result.data) throw new customAPIError(`Event dengan code ${RESPONSE_MESSAGE.error.duplicate}`, result.status);

    return result;
  }

  static async checkingDuplicateCodeNeId(id: string, code: string) {
    const result = await supabase.from(this.table).select('*').eq('code', code).neq('id', id).maybeSingle();

    if (result.data) throw new customAPIError(`Event dengan code ${RESPONSE_MESSAGE.error.duplicate}`, 400);

    return result;
  }

  static async checkingStatusNotCancelled(id: string) {
    const result = await supabase.from(this.table).select('*').eq('id', id).neq('status', 'CANCELLED').limit(1).maybeSingle();

    if (result.error) throw new customAPIError(`${RESPONSE_MESSAGE.error.read} event`, result.status);

    if (!result.data) throw new customAPIError(`${RESPONSE_MESSAGE.error.read}, event telah di batalkan`, 400);

    return result.data;
  }
}
