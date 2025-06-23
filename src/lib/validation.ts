import { z } from 'zod';

// Application form validation schema
export const applicationSchema = z.object({
  firstName:  z.string().min(1),
  lastName:   z.string().min(1),
  gender:     z.string().min(1),
  dob:        z.string().min(1),
  city:       z.string().min(1),
  state:      z.string().min(1),
  country:    z.string().min(1),
  email:      z.string().email(),
  phone:      z.string().min(5),
  instagram:  z.string().url().optional(),
  tiktok:     z.string().url().optional(),
  facebook:   z.string().url().optional(),
  twitter:    z.string().url().optional(),
  height:     z.string().min(1),
  chest:      z.string().min(1),
  waist:      z.string().min(1),
  hips:       z.string().min(1),
  shoes:      z.string().min(1),
  inseam:     z.string().min(1),
  hair:       z.string().min(1),
  eyes:       z.string().min(1),
  ethnicity:  z.string().min(1),
  bio:        z.string().min(10),
  files:      z.array(z.any()).min(4).max(8),
  portfolio_urls: z.array(z.string()).optional(),
  measurements: z.string().optional(),
  experience: z.string().optional(),
  additional_info: z.string().optional(),
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
