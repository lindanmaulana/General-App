'use client';

import { updateEvents } from '@/actions/events';
import { ButtonFormSubmit } from '@/components/ButtonFormSubmit';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { STATUS_EVENT } from '@/lib/constants/status-events';
import { errorHandler } from '@/lib/helpers/errorHandler';
import { handleParseDate } from '@/lib/helpers/parsing';
import { events } from '@/app/api/_lib/models/events';
import { eventsSchema, TypeEventsSchema } from '@/lib/validations/events';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { eventsKeys } from '@/lib/queries/events/queryKeys';

interface FormUpdateProps {
  data: events;
}

export const FormUpdate = ({ data }: FormUpdateProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const eventDate = handleParseDate(data.date, 'YYYY-MM-DD');

  const form = useForm<TypeEventsSchema>({
    resolver: zodResolver(eventsSchema),
    defaultValues: {
      code: data.code,
      name: data.name,
      description: data.description,
      status: data.status as STATUS_EVENT,
      date: eventDate,
      budget: data.budget.toString(),
      is_public: data.is_public,
    },
  });

  const mutationUpdate = useMutation({
    mutationKey: ['updateEvents'],
    mutationFn: async (req: TypeEventsSchema) => updateEvents(req, data.id),
  });

  const handleForm = form.handleSubmit((value: TypeEventsSchema) => {
    mutationUpdate.mutate(value, {
      onSuccess: () => {
        setIsOpen(false);
        toast.success('Event berhasil di perbarui');
        
        queryClient.invalidateQueries({ queryKey: eventsKeys.lists() });
        queryClient.invalidateQueries({ queryKey: eventsKeys.options() });
      },

      onError: (err) => {
        const errorMessage = errorHandler(err);
        toast.error(errorMessage);
      },
    });
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} variant={'ghost'} className="size-5 cursor-pointer">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className='dark:bg-black dark:border-white/30'>
        <Form {...form}>
          <form onSubmit={handleForm} className="space-y-4">
            <DialogHeader>
              <DialogTitle className='dark:text-white'>Ubah Event</DialogTitle>
              <DialogDescription>Update informasi event yang dipilih.</DialogDescription>
            </DialogHeader>
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='dark:text-gnrWhite'>Kode Event</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" placeholder="Contoh - AAA-232" className='dark:text-gnrWhite dark:border-white/20' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='dark:text-gnrWhite'>Tanggal (Opsional)</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" className='dark:text-gnrWhite dark:border-white/20 block' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='dark:text-gnrWhite'>Nama Event</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Nama event" className='dark:text-gnrWhite dark:border-white/20' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='dark:text-gnrWhite'>Deskripsi (Opsional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Deskripsi event" className="dark:text-gnrWhite dark:border-white/20 resize-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='dark:text-gnrWhite'>Status</FormLabel>
                        <FormControl>
                          <Select {...field} value={field.value} onValueChange={field.onChange} defaultValue={data.status}>
                            <SelectTrigger className="dark:text-gnrWhite dark:border-white/20 w-full cursor-pointer">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className='dark:bg-black dark:text-gnrWhite dark:border-white/20'>
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='dark:text-gnrWhite'>Budget (Opsional)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min={0} placeholder="0" className='dark:text-gnrWhite dark:border-white/20' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="is_public"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <Switch checked={field.value ?? false} onCheckedChange={field.onChange} className="cursor-pointer" />
                      </FormControl>
                      <FormLabel className='dark:text-gnrWhite'>Event Publik</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                <DialogClose asChild>
                  <Button variant={'outline'} className='dark:text-gnrWhite dark:hover:text-gnrWhite/80 dark:border-white/20'>Batal</Button>
                </DialogClose>
                <ButtonFormSubmit type="submit" style="bg-gnrPrimary text-gnrWhite hover:bg-gnrPrimary/70" title="Update" />
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
