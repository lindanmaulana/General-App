"use client";

import { createIncomes } from "@/actions/incomes";
import { ButtonSubmit } from "@/components/ButtonSubmit";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { errorHandler } from "@/lib/helpers/errorHandler";
import { handleParseDate } from "@/lib/helpers/parsing";
import { events } from "@/lib/models/events";
import { fundAccounts } from "@/lib/models/fund-accounts";
import { queryGetAllEventsOnlyOptions } from "@/lib/queries/events";
import { queryGetAllFundAccountsOnlyOptions } from "@/lib/queries/fund-accounts";
import { incomesShcema, TypeIncomesSchema } from "@/lib/validations/incomes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const FormCreate = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const queryEvents = useQuery(queryGetAllEventsOnlyOptions())
    const queryFundAccounts = useQuery(queryGetAllFundAccountsOnlyOptions())

    const dateNow = handleParseDate(new Date(), "YYYY-MM-DDTHH:mm")
    const form = useForm<TypeIncomesSchema>({
        resolver: zodResolver(incomesShcema),
        defaultValues: {
            event_id: "",
            fund_account_id: "",
            date: dateNow,
            amount: "",
            source: "",
            note: ""
        }
    })

    const mutationCreate = useMutation({
        mutationKey: ['createIncomes'],
        mutationFn: (req: TypeIncomesSchema) => createIncomes(req)
    })

    const handleForm = form.handleSubmit((value: TypeIncomesSchema) => {
        mutationCreate.mutate(value, {
            onSuccess: () => {
                setIsOpen(false)
                toast.success("Pemasukan berhasil di simpan")
                form.reset()
                queryClient.invalidateQueries({queryKey: ['getTotalAmountThisMonthIncomes']})
                queryClient.invalidateQueries({queryKey: ['getAllIncomes']})
                queryClient.invalidateQueries({queryKey: ['getTotalBalanceFundAccounts']})
                queryClient.invalidateQueries({queryKey: ['getTotalCashFundAccounts']})
            },

            onError: (err) => {
                const errorMessage = errorHandler(err)
                toast.error(errorMessage)
            }
        })
    })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)} className="w-full md:w-fit bg-gnrPrimary cursor-pointer hover:bg-gnrPrimary/80">
                <Plus />
                <span>Tambah Pemasukan</span>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <Form {...form}>
                <form onSubmit={handleForm} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Tambah Pemasukan Baru</DialogTitle>
                        <DialogDescription>Masukkan detail pemasukan yang akan dicatat</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <FormField 
                                control={form.control}
                                name="date"
                                render={({field}) => (
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
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Acara</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Pilih acara" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                {queryEvents.isLoading ? <SelectItem value="loading...">Loading...</SelectItem> : queryEvents.isError ? <SelectItem value="error">Error</SelectItem> : queryEvents.data.map((event: events) => (
                                                    <SelectItem key={event.id} value={event.id}>{event.name}</SelectItem>
                                                ))}
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
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Akun Tujuan</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Pilih akun" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {queryFundAccounts.isLoading ? <SelectItem value="loading...">Loading...</SelectItem> : queryFundAccounts.isError ? <SelectItem value="error">Error</SelectItem> : queryFundAccounts.data.map((fundAccount: fundAccounts) => (
                                                        <SelectItem key={fundAccount.id} value={fundAccount.id}>{fundAccount.name}</SelectItem>
                                                    ))}
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
                                render={({field}) => (
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
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Sumber pendapatan</FormLabel>
                                        <FormControl>
                                            <div>
                                                <Input {...field} type="text" placeholder="Sponsor, Donatur, Penjualan Tiket" />
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
                                render={({field}) => (
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
                                <Button variant={"outline"}>Batal</Button>
                            </DialogClose>
                            <ButtonSubmit type="submit" style="bg-gnrPrimary text-gnrWhite hover:bg-gnrPrimary/70" title="Simpan" isLoading={mutationCreate.isPending} />
                        </div>
                    </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  );
};
