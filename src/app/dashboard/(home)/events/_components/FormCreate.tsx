"use client"

import { createEvents } from "@/actions/events"
import { ButtonFormSubmit } from "@/components/ButtonFormSubmit"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { errorHandler } from "@/lib/helpers/errorHandler"
import { eventsCreateSchema, TypeEventsCreateSchema } from "@/lib/validations/events"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const FormCreate = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const form = useForm<TypeEventsCreateSchema>({
        resolver: zodResolver(eventsCreateSchema),
        defaultValues: {
            code: "",
            name: "",
            description: "",
            date: "",
            budget: "0",
            status: "SCHEDULED",
            is_public: false
        }
    })

    const mutationCreate = useMutation({
        mutationKey: ['createEvents'],
        mutationFn: (req: TypeEventsCreateSchema) => createEvents(req)
    })

    const handleForm = form.handleSubmit((value: TypeEventsCreateSchema) => {
        mutationCreate.mutate(value, {
            onSuccess: () => {
                setIsOpen(false)
                toast.success("Event berhasil di buat")
                // queryClient.invalidateQueries({queryKey: ['']})
                form.reset()
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
                <Button>
                    <Plus />
                    <span>Tambah Event Baru</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={handleForm} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Tambah Event Baru</DialogTitle>
                        <DialogDescription>Buat event baru dengan mengisi form di bawah ini.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Kode Event</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" placeholder="Contoh - AAA-232" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Tanggal (Opsional)</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="date" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nama Event</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Nama event" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Deskripsi (Opsional)</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Deskripsi event" className="resize-none" />
                                        </FormControl>
                                            <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <Select {...field} value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                                                        <SelectItem value="RUNNING">Ongoing</SelectItem>
                                                        <SelectItem value="COMPLETED">Completed</SelectItem>
                                                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="budget"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Budget (Opsional)</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="number" min={0} placeholder="0" />
                                            </FormControl>
                                                <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="is_public"
                                render={({field}) => (
                                    <FormItem className="flex items-center gap-3">
                                        <FormControl>
                                            <Switch checked={field.value ?? false} onCheckedChange={field.onChange} className="" />
                                        </FormControl>
                                        <FormLabel>Event Publik</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant={"outline"}>Batal</Button>
                            </DialogClose>
                            <ButtonFormSubmit type="submit" style="bg-gnrPrimary text-gnrWhite hover:bg-gnrPrimary/70" title="Simpan" />
                        </div>
                    </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}