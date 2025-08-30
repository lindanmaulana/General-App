'use server';

import { ActionResult } from '@/actions/index';
import { AuthService } from '@/app/api/_lib/services/auth.service';
import { signIn, signOut } from '@/auth';
import { errorHandler } from '@/lib/helpers/errorHandler';
import { AuthLoginCredentialsSchema, AuthRegisterCredentialsSchema } from '@/lib/validations/auth';
import { redirect } from 'next/navigation';

export const AuthLogin = async (prevState: unknown, formData: FormData): Promise<ActionResult> => {
  const validatedFields = AuthLoginCredentialsSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      error: 'Invalid Credentials',
    };
  }

  try {
    await signIn('credentials', {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirect: false,
    });
  } catch (err) {
    const errorMessage = errorHandler(err);
    console.log({ errorMessage });

    return {
      status: 'error',
      error: 'Invalid Credentials',
    };
  }

  redirect('/dashboard');
};

export const AuthLogout = async () => {
  await signOut({redirectTo: "/dashboard/login"})
}

export const AuthRegister = async (prevState: unknown, formData: FormData): Promise<ActionResult> => {
  const validatedFields = AuthRegisterCredentialsSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      error: 'Failed Register',
    };
  }

  try {
    await AuthService.register(validatedFields.data);

    return {
      status: 'success',
    };
  } catch (err) {
    const errorMessage = errorHandler(err);

    return {
      status: 'error',
      error: errorMessage,
    };
  }
};
