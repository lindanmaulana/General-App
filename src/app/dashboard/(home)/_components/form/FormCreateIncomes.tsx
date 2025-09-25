"use client"

import { createIncomes } from '@/actions/incomes';
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
import { eventOptions } from '@/lib/queries/events/eventOptions';
import { financialSummaryKeys } from '@/lib/queries/financial-summary/queryKeys';
import { fundAccountOptions } from '@/lib/queries/fund-accounts/fundAccountOptions';
import { fundAccountsKeys } from '@/lib/queries/fund-accounts/queryKeys';
import { incomesKeys } from '@/lib/queries/incomes/queryKeys';
import { incomesShcema, TypeIncomesSchema } from '@/lib/validations/incomes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface FormCreateIncomesProps {
    setIsOpen: (open: boolean) => void
}

export const FormCreateIncomes = ({setIsOpen}: FormCreateIncomesProps) => {
  const queryClient = useQueryClient();

  const {isLoading, isError, allEventOptions, allFundAccountOptions} = useQueries({
    queries: [eventOptions(), fundAccountOptions()],
    combine: (results) => {
      return {
        allEventOptions: results[0].data,
        allFundAccountOptions: results[1].data,
        isLoading: results.some(result => result.isLoading),
        isError: results.some(result => result.isError)
      }
    }
  })

  const form = useForm<TypeIncomesSchema>({
    resolver: zodResolver(incomesShcema),
    defaultValues: {
      event_id: '',
      fund_account_id: '',
      date: handleParseDate(new Date(), 'YYYY-MM-DDTHH:mm'),
      amount: '',
      source: '',
      note: '',
    },
  });

  const mutationCreate = useMutation({
    mutationKey: ['createIncomes'],
    mutationFn: (req: TypeIncomesSchema) => createIncomes(req),
  });

  const handleForm = form.handleSubmit((value: TypeIncomesSchema) => {
    mutationCreate.mutate(value, {
      onSuccess: () => {
        setIsOpen(false);
        toast.success('Pemasukan berhasil di simpan');

        form.reset();

        queryClient.invalidateQueries({queryKey: incomesKeys.total.amount.month()})
        queryClient.invalidateQueries({queryKey: incomesKeys.lists()})
        queryClient.invalidateQueries({queryKey: fundAccountsKeys.totals.balances.all()})
        queryClient.invalidateQueries({queryKey: financialSummaryKeys.monthly()})
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
              <DialogTitle className='dark:text-white'>Tambah Pemasukan Baru</DialogTitle>
              <DialogDescription>Masukkan detail pemasukan yang akan dicatat</DialogDescription>
            </DialogHeader>
            <div className="space-y-8">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='dark:text-gnrWhite'>Tanggal</FormLabel>
                      <FormControl>
                        <Input {...field} type="datetime-local" className="block dark:border-white/20 dark:text-gnrWhite" />
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
                      <FormLabel className='dark:text-gnrWhite'>Acara</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full dark:border-white/20 dark:text-gnrWhite">
                            <SelectValue placeholder="Pilih acara" />
                          </SelectTrigger>
                          <SelectContent className='dark:bg-black dark:text-gnrWhite dark:border-white/20'>
                            {isLoading ? (
                              <SelectItem value="loading...">Loading...</SelectItem>
                            ) : isError ? (
                              <SelectItem value="error">Error</SelectItem>
                            ) : (
                              allEventOptions && allEventOptions.map((event: events) => (
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
                      <FormLabel className='dark:text-gnrWhite'>Akun Tujuan</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full dark:border-white/20 dark:text-gnrWhite">
                            <SelectValue placeholder="Pilih akun" />
                          </SelectTrigger>
                          <SelectContent className='dark:bg-black dark:text-gnrWhite dark:border-white/20'>
                            {isLoading ? (
                              <SelectItem value="loading...">Loading...</SelectItem>
                            ) : isError ? (
                              <SelectItem value="error">Error</SelectItem>
                            ) : (
                              allFundAccountOptions && allFundAccountOptions.map((fundAccount: fundAccounts) => (
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
                      <FormLabel className='dark:text-gnrWhite'>Jumlah</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="0" className='dark:border-white/20 dark:text-gnrWhite' />
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
                      <FormLabel className='dark:text-gnrWhite'>Sumber pendapatan</FormLabel>
                      <FormControl>
                        <div>
                          <Input {...field} type="text" placeholder="Sponsor, Donatur, Penjualan Tiket" className='dark:border-white/20 dark:text-gnrWhite' />
                          <span className="text-xs text-gnrGray">Masukkan asal pemasukan, misalnya Sponsor, Donatur, atau Tiket.</span>
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
                      <FormLabel className='dark:text-gnrWhite'>Catatan tambahan (Opsional) </FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Keterangan tambahan" className="resize-none dark:border-white/20 dark:text-gnrWhite" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                <DialogClose asChild>
                  <Button variant={'outline'} className=' dark:border-white/20 dark:text-gnrWhite dark:hover:text-gnrWhite/80 cursor-pointer'>Batal</Button>
                </DialogClose>
                <ButtonSubmit type="submit" style="bg-gnrPrimary text-gnrWhite hover:bg-gnrPrimary/70" title="Simpan" isLoading={mutationCreate.isPending} />
              </div>
            </div>
          </form>
        </Form>
    )
}