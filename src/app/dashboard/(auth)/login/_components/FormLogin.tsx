'use client';

import { AuthLogin } from '@/actions/auth';
import { ButtonFormSubmit } from '@/components/ButtonFormSubmit';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { INITIAL_STATE_ACTION } from '@/lib/constants/initial-state';
import { AuthLoginCredentialsSchema, TypeAuthLoginCredentialsSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';

export const FormLogin = () => {
  const form = useForm<TypeAuthLoginCredentialsSchema>({
    resolver: zodResolver(AuthLoginCredentialsSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [state, formAction] = useActionState(AuthLogin, INITIAL_STATE_ACTION);

  return (
    <Form {...form}>
      {state.status === 'error' && (
        <div className="bg-red-200 rounded-md p-3">
          <p className="text-sm font-semibold text-red-500">{state.error}</p>
        </div>
      )}
      <form action={formAction} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='dark:text-gnrWhite'>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Masukan email anda..." type="email" className='dark:text-gnrWhite dark:border-white/20' required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='dark:text-gnrWhite'>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Masukan password anda..." type="password" className='dark:text-gnrWhite dark:border-white/20' required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <ButtonFormSubmit type="submit" title="Sign in" style="bg-gnrPrimary w-full text-gnrWhite hover:bg-gnrPrimary/70" />
      </form>
    </Form>
  );
};
