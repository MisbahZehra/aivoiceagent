import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.string().trim().email('Please provide a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().trim().email('Please provide a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email('Please provide a valid email address'),
});

export const googleLoginSchema = z.object({
  idToken: z.string().min(1, 'Google token is required'),
});
