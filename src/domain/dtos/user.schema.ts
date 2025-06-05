import { z } from 'zod';

export const RegisterUserSchema = z.object({
  name: z.string().min(3, 'Name is required, minimum 3 characters')
    .refine((val) => !/<\/?[a-z][\s\S]*>/i.test(val), {
      message: 'Name contains invalid characters',
    }),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
    .refine(val => /[a-z]/.test(val), { message: 'Must contain at least one lowercase letter' })
    .refine(val => /[A-Z]/.test(val), { message: 'Must contain at least one uppercase letter' })
    .refine(val => /\d/.test(val), { message: 'Must contain at least one number' })
    .refine(val => /[\W_]/.test(val), { message: 'Must contain at least one symbol' }),
  confirmPassword: z.string().min(6, 'Confirmation is required'),
  rut: z.string().min(12, 'RUT is required, minimum 12 characters'),
  recaptchaToken: z.string().min(1, 'reCAPTCHA token is missing'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const LoginUserSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  recaptchaToken: z.string().min(1, 'reCAPTCHA token is missing'),
});

export const ChangePasswordSchema = z.object({
  password: z.string().min(6, 'Current password must be at least 6 characters long'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters long'),
});
