import bcrypt from 'bcrypt';
import supabase from '../../../../lib/supabase';
import { TypeAuthRegisterCredentialsSchema } from '../../../../lib/validations/auth';
import { userService } from './users.service';

export class AuthService {
  static table = 'users';
  static async register(req: TypeAuthRegisterCredentialsSchema) {
    const checkDuplicate = await userService.checkingEmail(req.email);

    if (checkDuplicate.data) throw new Error('Email already exists!');

    const hashPassword = await bcrypt.hash(req.password, 10);

    const result = await supabase.from(this.table).insert({
      name: req.name,
      email: req.email,
      password: hashPassword,
    });

    return result;
  }
}