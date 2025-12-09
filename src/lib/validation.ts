/**
 * Validation Schemas and Utilities
 *
 * @description Common Zod validation schemas for forms
 *
 * @ai-guide
 * Available Schemas:
 * - `emailSchema`: Email validation
 * - `passwordSchema`: Password with strength requirements
 * - `phoneSchema`: Phone number validation
 * - `urlSchema`: URL validation
 * - `requiredString`: Non-empty string
 * - `optionalString`: Optional string
 *
 * Usage:
 * ```tsx
 * import { z } from 'zod';
 * import { emailSchema, passwordSchema } from '@/lib/validation';
 *
 * const loginSchema = z.object({
 *   email: emailSchema,
 *   password: passwordSchema,
 * });
 * ```
 *
 * To add custom validations:
 * 1. Create a new schema using z.string(), z.number(), etc.
 * 2. Add refinements with .refine() or .superRefine()
 * 3. Export with descriptive name
 */

import { z } from 'zod';

// ============================================
// String Schemas
// ============================================

/**
 * Required non-empty string
 * @example requiredString // "Name is required"
 */
export const requiredString = z.string().min(1, 'This field is required');

/**
 * Optional string (empty string becomes undefined)
 */
export const optionalString = z
  .string()
  .optional()
  .transform((val) => (val === '' ? undefined : val));

// ============================================
// Email Validation
// ============================================

/**
 * Email validation schema
 * @example emailSchema // "john@example.com"
 */
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

// ============================================
// Password Validation
// ============================================

/**
 * Password validation with strength requirements
 * Requirements: min 8 chars, uppercase, lowercase, number
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

/**
 * Simple password (just min length)
 * Use for login forms where you don't want to reveal requirements
 */
export const simplePasswordSchema = z.string().min(1, 'Password is required');

/**
 * Confirm password schema
 * Use with .refine() for password confirmation
 *
 * @example
 * const schema = z.object({
 *   password: passwordSchema,
 *   confirmPassword: confirmPasswordSchema,
 * }).refine(data => data.password === data.confirmPassword, {
 *   message: "Passwords don't match",
 *   path: ['confirmPassword'],
 * });
 */
export const confirmPasswordSchema = z.string().min(1, 'Please confirm your password');

// ============================================
// Phone Validation
// ============================================

/**
 * Phone number validation
 * Accepts: +1234567890, 123-456-7890, (123) 456-7890
 */
export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    'Please enter a valid phone number'
  );

/**
 * Optional phone number
 */
export const optionalPhoneSchema = z
  .string()
  .regex(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    'Please enter a valid phone number'
  )
  .optional()
  .or(z.literal(''));

// ============================================
// URL Validation
// ============================================

/**
 * URL validation
 */
export const urlSchema = z.string().min(1, 'URL is required').url('Please enter a valid URL');

/**
 * Optional URL
 */
export const optionalUrlSchema = z
  .string()
  .url('Please enter a valid URL')
  .optional()
  .or(z.literal(''));

// ============================================
// Number Validation
// ============================================

/**
 * Required positive number
 */
export const positiveNumberSchema = z.number().positive('Must be a positive number');

/**
 * Number from string input (for text inputs)
 */
export const numberFromString = z
  .string()
  .min(1, 'This field is required')
  .transform((val) => parseFloat(val))
  .refine((val) => !isNaN(val), 'Must be a valid number');

// ============================================
// Date Validation
// ============================================

/**
 * Date string validation (YYYY-MM-DD)
 */
export const dateStringSchema = z
  .string()
  .min(1, 'Date is required')
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date (YYYY-MM-DD)');

/**
 * Date object validation
 */
export const dateSchema = z.date({
  message: 'Please enter a valid date',
});

// ============================================
// Credit Card Validation
// ============================================

/**
 * Credit card number (Luhn algorithm check)
 */
export const creditCardSchema = z
  .string()
  .min(1, 'Card number is required')
  .transform((val) => val.replace(/\s/g, ''))
  .refine((val) => /^\d{13,19}$/.test(val), 'Please enter a valid card number')
  .refine((val) => luhnCheck(val), 'Please enter a valid card number');

/**
 * CVV validation
 */
export const cvvSchema = z
  .string()
  .min(1, 'CVV is required')
  .regex(/^\d{3,4}$/, 'Please enter a valid CVV');

/**
 * Expiry date (MM/YY)
 */
export const expiryDateSchema = z
  .string()
  .min(1, 'Expiry date is required')
  .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please enter a valid expiry date (MM/YY)')
  .refine((val) => {
    const [month, year] = val.split('/');
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
    return expiry > new Date();
  }, 'Card has expired');

// ============================================
// Common Patterns
// ============================================

/**
 * Username (alphanumeric, underscore, 3-20 chars)
 */
export const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must be at most 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores');

/**
 * Postal/ZIP code
 */
export const postalCodeSchema = z
  .string()
  .min(1, 'Postal code is required')
  .regex(/^[A-Za-z0-9\s-]{3,10}$/, 'Please enter a valid postal code');

// ============================================
// Helper Functions
// ============================================

/**
 * Luhn algorithm for credit card validation
 */
function luhnCheck(cardNumber: string): boolean {
  let sum = 0;
  let isEven = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Create a password confirmation schema
 *
 * @example
 * const signupSchema = createPasswordConfirmSchema('password', 'confirmPassword');
 */
export function createPasswordConfirmSchema(
  passwordField: string = 'password',
  confirmField: string = 'confirmPassword'
) {
  return z
    .object({
      [passwordField]: passwordSchema,
      [confirmField]: confirmPasswordSchema,
    })
    .refine((data) => data[passwordField] === data[confirmField], {
      message: "Passwords don't match",
      path: [confirmField],
    });
}

// ============================================
// Pre-built Form Schemas
// ============================================

/**
 * Login form schema
 */
export const loginFormSchema = z.object({
  email: emailSchema,
  password: simplePasswordSchema,
});

/**
 * Registration form schema
 */
export const registerFormSchema = z
  .object({
    name: requiredString.min(2, 'Name must be at least 2 characters'),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

/**
 * Profile form schema
 */
export const profileFormSchema = z.object({
  name: requiredString.min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  phone: optionalPhoneSchema,
  bio: z.string().max(500, 'Bio must be at most 500 characters').optional(),
});

/**
 * Contact form schema
 */
export const contactFormSchema = z.object({
  name: requiredString.min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  subject: requiredString,
  message: requiredString.min(10, 'Message must be at least 10 characters'),
});

// Export types
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;
export type ProfileFormData = z.infer<typeof profileFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
