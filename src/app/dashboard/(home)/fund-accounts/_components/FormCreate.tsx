"use client";

import { createFundAccounts } from "@/actions/fundAccounts";
import { ButtonFormSubmit } from "@/components/ButtonFormSubmit";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INITIAL_STATE_ACTION } from "@/lib/constant/initial-state";
import { FundAccountsCreate, TypeFieldFundAcounts, TypeFundAccountsCreate } from "@/lib/validations/fund-accounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const FormCreate = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const form = useForm<TypeFundAccountsCreate>({
        resolver: zodResolver(FundAccountsCreate),
        defaultValues: {
            name: "",
            account_number: "",
            holder_name: ""
        }
    })

    const [state, formAction] = useActionState(createFundAccounts, INITIAL_STATE_ACTION)

    console.log({state})
    useEffect(() => {
        if(state.status === "error" && state.errors) {
            if(state.errors) {
                state.errors.forEach((err) => {
                    form.setError(err.field as TypeFieldFundAcounts, {message: err.message})
                })
            }

            if(state.error) {
                toast(state.error)
            }
        }

        if(state.status === "success") {
            form.reset()
            setIsOpen(false)
        }
    }, [state.errors, form, state.status, state.error])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} className="bg-gnrPrimary cursor-pointer hover:bg-gnrPrimary/80">
                    <Plus />
                    <span>Tambah Akun</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form action={formAction}>
                    <DialogHeader>
                        <DialogTitle>Tambah Akun Baru</DialogTitle>
                        <DialogDescription>Tambahkan akun bank atau kas baru untuk dikelola</DialogDescription>
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
                                            <Select {...field}>
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
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant={"outline"}>Batal</Button>
                            </DialogClose>
                            <ButtonFormSubmit type="submit" style="max-w-1/6" title="Simpan" />
                        </div>
                    </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  );
};
