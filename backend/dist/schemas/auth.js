"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLoginSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(1, 'Name is required'),
    email: zod_1.z.string().trim().email('Please provide a valid email address'),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: zod_1.z.string().min(8, 'Password confirmation is required'),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().trim().email('Please provide a valid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().trim().email('Please provide a valid email address'),
});
exports.googleLoginSchema = zod_1.z.object({
    idToken: zod_1.z.string().min(1, 'Google token is required'),
});
