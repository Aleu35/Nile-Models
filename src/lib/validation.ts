
import { z } from 'zod';

// Application form validation schema
export const applicationSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters')
    .toLowerCase(),
  
  phone: z.string()
    .min(8, 'Phone number must be at least 8 characters')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Phone number contains invalid characters')
    .optional()
    .or(z.literal('')),
  
  age: z.number()
    .min(18, 'Must be at least 18 years old')
    .max(100, 'Age must be less than 100')
    .optional(),
  
  height: z.number()
    .min(140, 'Height must be at least 140cm')
    .max(220, 'Height must be less than 220cm')
    .optional(),
  
  weight: z.number()
    .min(40, 'Weight must be at least 40kg')
    .max(200, 'Weight must be less than 200kg')
    .optional(),
  
  measurements: z.string()
    .max(50, 'Measurements must be less than 50 characters')
    .regex(/^[\d\s\-\/\.]*$/, 'Measurements can only contain numbers, spaces, hyphens, slashes, and periods')
    .optional()
    .or(z.literal('')),
  
  experience: z.string()
    .max(1000, 'Experience must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
  
  portfolio_urls: z.array(
    z.string().url('Please enter valid URLs')
  ).max(10, 'Maximum 10 portfolio URLs allowed').optional(),
  
  additional_info: z.string()
    .max(2000, 'Additional information must be less than 2000 characters')
    .optional()
    .or(z.literal(''))
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

// Input sanitization function
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
}

// CSRF token generation and validation
export function generateCSRFToken(): string {
  return crypto.randomUUID();
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken && token.length > 0;
}
