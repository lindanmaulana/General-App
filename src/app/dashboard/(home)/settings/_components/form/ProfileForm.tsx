"use client"

import { profileSetting } from '@/actions/settings';
import { ButtonSubmit } from '@/components/ButtonSubmit';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { errorHandler } from '@/lib/helpers/errorHandler';
import { profileSettingSchema, typeProfileSettingSchema } from '@/lib/validations/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Users } from '../../_types/profile';


interface ProfileFormProps {
    id: string
    defaultValue: Users
}

export const ProfileForm = ({defaultValue, id}: ProfileFormProps) => {
    const queryClient = useQueryClient()
    const form = useForm<typeProfileSettingSchema>({
        resolver: zodResolver(profileSettingSchema),
        defaultValues: {
          name: defaultValue.name || "",
          email: defaultValue.email,
          password: ""
        }
    });
    
    const mutation = useMutation({
        mutationKey: ["settingProfile"],
        mutationFn: (value: typeProfileSettingSchema) => profileSetting(value, id)
    })
    
    const handleForm = form.handleSubmit((value) => {
        mutation.mutate(value, {
          onSuccess: () => {
            toast.success("Berhasil memperbarui profile")
            queryClient.invalidateQueries({queryKey: ["getProfileUsers"]})
          },
    
          onError: (err) => {
            const errorMessage = errorHandler(err)
    
            toast.error(errorMessage)
          }
        })
    });

    return (
        <Form {...form}>
          <form onSubmit={handleForm} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='dark:text-gnrWhite'>Nama</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukan nama anda" className='dark:text-gnrWhite dark:border-white/20' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name='email'
                render={({field}) => (
                  <FormItem>
                    <FormLabel className='dark:text-gnrWhite'>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type='email' placeholder='Masukan email anda' className='dark:text-gnrWhite dark:border-white/20' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name='password'
                render={({field}) => (
                  <FormItem>
                    <FormLabel className='dark:text-gnrWhite'>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type='password' placeholder='Kosongkan jika tidak ingin merubah' className='dark:text-gnrWhite dark:border-white/20' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex items-center justify-end'>
              <ButtonSubmit isLoading={mutation.isPending} type='submit' title='Simpan' style='bg-gnrPrimary hover:bg-gnrPrimary/80' />
            </div>
          </form>
        </Form>
    )
}