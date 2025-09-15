"use client";

import { createFundAccounts } from "@/actions/fundAccounts";
import { ButtonSubmit } from "@/components/ButtonSubmit";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { errorHandler } from "@/lib/helpers/errorHandler";
import { fundAccountsKeys } from "@/lib/queries/fund-accounts/queryKeys";
import { fundAccountsCreateSchema, TypeFundAccountsCreateSchema } from "@/lib/validations/fund-accounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const FormCreate = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const queryClient = useQueryClient()
    
    const form = useForm<TypeFundAccountsCreateSchema>({
        resolver: zodResolver(fundAccountsCreateSchema),
        defaultValues: {
            name: "",
            type: "",
            provider_name: "",
            account_number: "",
            holder_name: "",
            is_active: "0"
        }
    })

    const mutationCreate = useMutation({
        mutationKey: ['createFundAccounts'],
        mutationFn: (req: TypeFundAccountsCreateSchema) => createFundAccounts(req)
    })

    const handleForm = form.handleSubmit((value: TypeFundAccountsCreateSchema) => {
        mutationCreate.mutate(value, {
            onSuccess: () => {
                setIsOpen(false)
                toast.success("Akun berhasil di buat")
                form.reset()

                queryClient.invalidateQueries({queryKey: fundAccountsKeys.lists()})
                queryClient.invalidateQueries({queryKey: fundAccountsKeys.options()})
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
                <span>Tambah Akun</span>
            </Button>
        </DialogTrigger>
        <DialogContent className="dark:bg-black dark:border-white/30">
            <Form {...form}>
                <form onSubmit={handleForm} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle className="dark:text-white">Tambah Akun Baru</DialogTitle>
                        <DialogDescription>Tambahkan akun bank atau kas baru untuk dikelola</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="dark:text-gnrWhite">Nama Akun</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Contoh BRI - Tabungan" className="dark:text-gnrWhite dark:border-white/20" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="dark:text-gnrWhite">Jenis Akun</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="dark:text-gnrWhite dark:border-white/20 w-full">
                                                    <SelectValue placeholder="Jenis Akun" />
                                                </SelectTrigger>
                                                <SelectContent className="dark:bg-black dark:text-gnrWhite dark:border-white/20">
                                                    <SelectItem value="BANK">BANK</SelectItem>
                                                    <SelectItem value="CASH">CASH</SelectItem>
                                                    <SelectItem value="EWALLET">EWALLET</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="holder_name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="dark:text-gnrWhite">Nama Pemilik Akun</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Contoh Jhon doe" className="dark:text-gnrWhite dark:border-white/20" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="is_active"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="dark:text-gnrWhite">Status Akun</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="dark:text-gnrWhite dark:border-white/20 w-full">
                                                    <SelectValue placeholder="Status Akun" />
                                                </SelectTrigger>
                                                <SelectContent className="dark:bg-black dark:text-gnrWhite dark:border-white/20">
                                                    <SelectItem value="1">AKTIF</SelectItem>
                                                    <SelectItem value="0">NON AKTIF</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="provider_name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="dark:text-gnrWhite">Nama Penyedia (opsional)</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Contoh Mandiri / Dana" className="dark:text-gnrWhite dark:border-white/20" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="account_number"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="dark:text-gnrWhite">No Rekening / Ewallet (opsional)</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" placeholder="123456789" className="dark:text-gnrWhite dark:border-white/20" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant={"outline"} className="dark:text-gnrWhite dark:hover:text-gnrWhite/80 dark:border-white/20" >Batal</Button>
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
