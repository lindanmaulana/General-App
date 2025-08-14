"use client";

import { updateFundAccounts } from "@/actions/fundAccounts";
import { ButtonSubmit } from "@/components/ButtonSubmit";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { errorHandler } from "@/lib/helpers/errorHandler";
import { FundAccounts } from "@/lib/models/fund-accounts";
import { FundAccountsUpdateSchema, TypeFundAccountsUpdateSchema } from "@/lib/validations/fund-accounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormUpdateProps {
    data: FundAccounts
}

export const FormUpdate = ({data}: FormUpdateProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const form = useForm<TypeFundAccountsUpdateSchema>({
        resolver: zodResolver(FundAccountsUpdateSchema),
        defaultValues: {
            name: data.name ?? "",
            type: data.type ?? "",
            provider_name: data.provider_name ?? "",
            account_number: data.account_number ?? "",
            holder_name: data.holder_name ?? "",
            is_active: data.is_active ? "1" : "0"
        }
    })

    const mutationUpdate = useMutation({
        mutationKey: ['updateFundAccounts'],
        mutationFn: async (req: TypeFundAccountsUpdateSchema) => updateFundAccounts(req, data.id)
    })

    const handleForm = form.handleSubmit((value: TypeFundAccountsUpdateSchema) => {
        mutationUpdate.mutate(value, {
            onSuccess: () => {
                setIsOpen(false)
                toast.success("Akun berhasil di perbarui")
                queryClient.invalidateQueries({queryKey: ['getAllFundAccounts']})
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
            <Button onClick={() => setIsOpen(true)} variant={"ghost"} className="size-5 cursor-pointer">
                <Pencil />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <Form {...form}>
                <form onSubmit={handleForm} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Ubah Akun</DialogTitle>
                        <DialogDescription>Ubah akun bank atau kas baru untuk dikelola</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nama Akun</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Contoh BRI - Tabungan" />
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
                                        <FormLabel>Jenis Akun</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Jenis Akun" />
                                                </SelectTrigger>
                                                <SelectContent>
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
                                        <FormLabel>Nama Pemilik Akun</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Contoh Jhon doe" />
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
                                        <FormLabel>Status Akun</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Jenis Akun" />
                                                </SelectTrigger>
                                                <SelectContent>
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
                                        <FormLabel>Nama Penyedia (opsional)</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Contoh Mandiri / Dana" />
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
                                        <FormLabel>No Rekening (opsional)</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" placeholder="123456789" />
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
                            <ButtonSubmit type="submit" style="bg-gnrPrimary text-gnrWhite hover:bg-gnrPrimary/70" title="Simpan" isLoading={mutationUpdate.isPending} />
                        </div>
                    </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  );
};
