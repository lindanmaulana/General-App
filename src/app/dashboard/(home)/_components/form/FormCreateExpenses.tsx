"use client"

import { createExpenses } from '@/actions/expenses';
import { events } from '@/app/api/_lib/models/events';
import { fundAccounts } from '@/app/api/_lib/models/fund-accounts';
import { ButtonSubmit } from '@/components/ButtonSubmit';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { errorHandler } from '@/lib/helpers/errorHandler';
import { handleParseDate } from '@/lib/helpers/parsing';
import { queryGetAllEventsOnlyOptions } from '@/lib/queries/events';
import { queryGetAllFundAccountsOnlyOptions } from '@/lib/queries/fund-accounts';
import { expensesSchema, TypeExpensesSchema } from '@/lib/validations/expenses';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface FormCreateExpensesProps {
    setIsOpen: (open: boolean) => void
}

export const FormCreateExpenses = ({setIsOpen}: FormCreateExpensesProps) => {
    const queryClient = useQueryClient();
    const queryEvents = useQuery(queryGetAllEventsOnlyOptions());
    const queryFundAccounts = useQuery(queryGetAllFundAccountsOnlyOptions());

    const dateNow = handleParseDate(new Date(), 'YYYY-MM-DDTHH:mm');
    const form = useForm<TypeExpensesSchema>({
        resolver: zodResolver(expensesSchema),
        defaultValues: {
        event_id: '',
        fund_account_id: '',
        date: dateNow,
        amount: '',
        source: '',
        note: '',
        },
    });

    const mutationCreate = useMutation({
        mutationKey: ['createExpenses'],
        mutationFn: (req: TypeExpensesSchema) => createExpenses(req),
    });

    const handleForm = form.handleSubmit((value: TypeExpensesSchema) => {
        mutationCreate.mutate(value, {
        onSuccess: () => {
            setIsOpen(false);
            toast.success('Pengeluaran berhasil di simpan');
            form.reset();
            queryClient.invalidateQueries({ queryKey: ['getTotalAmountThisMonthExpenses'] });
            queryClient.invalidateQueries({ queryKey: ['getAllExpenses'] });
            queryClient.invalidateQueries({ queryKey: ['getTotalBalanceFundAccounts'] });
            queryClient.invalidateQueries({ queryKey: ['getTotalBalanceNonCashFundAccounts'] });
            queryClient.invalidateQueries({ queryKey: ['getTotalBalanceCashFundAccounts'] });
            queryClient.invalidateQueries({ queryKey: ['getFinancialSummaryMonthly'] });
        },

        onError: (err) => {
            const errorMessage = errorHandler(err);
            toast.error(errorMessage);
        },
        });
    });
    return (
         <Form {...form}>
          <form onSubmit={handleForm} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Tambah Pengeluaran Baru</DialogTitle>
              <DialogDescription>Masukkan detail pengeluaran yang akan dicatat</DialogDescription>
            </DialogHeader>
            <div className="space-y-8">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal</FormLabel>
                      <FormControl>
                        <Input {...field} type="datetime-local" className="block" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="event_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Acara</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih acara" />
                          </SelectTrigger>
                          <SelectContent>
                            {queryEvents.isLoading ? (
                              <SelectItem value="loading...">Loading...</SelectItem>
                            ) : queryEvents.isError ? (
                              <SelectItem value="error">Error</SelectItem>
                            ) : (
                              queryEvents.data.map((event: events) => (
                                <SelectItem key={event.id} value={event.id}>
                                  {event.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fund_account_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Akun Tujuan</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih akun" />
                          </SelectTrigger>
                          <SelectContent>
                            {queryFundAccounts.isLoading ? (
                              <SelectItem value="loading...">Loading...</SelectItem>
                            ) : queryFundAccounts.isError ? (
                              <SelectItem value="error">Error</SelectItem>
                            ) : (
                              queryFundAccounts.data.map((fundAccount: fundAccounts) => (
                                <SelectItem key={fundAccount.id} value={fundAccount.id}>
                                  {fundAccount.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="0" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori pengeluaran</FormLabel>
                      <FormControl>
                        <div>
                          <Input {...field} type="text" placeholder="Peralatan, Sewa Tempat, Konsumsi" />
                          <span className="text-xs text-gnrGray">Masukkan kategorinya, misalnya Peralatan, Sewa Tempat, atau Konsumsi.</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catatan tambahan (Opsional) </FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Keterangan tambahan" className="resize-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                <DialogClose asChild>
                  <Button variant={'outline'}>Batal</Button>
                </DialogClose>
                <ButtonSubmit type="submit" style="bg-gnrPrimary text-gnrWhite hover:bg-gnrPrimary/70" title="Simpan" isLoading={mutationCreate.isPending} />
              </div>
            </div>
          </form>
        </Form>
    )
}