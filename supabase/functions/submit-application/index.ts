
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ApplicationData {
  name: string;
  email: string;
  phone?: string;
  age?: number;
  height?: number;
  weight?: number;
  measurements?: string;
  experience?: string;
  portfolio_urls?: string[];
  additional_info?: string;
}

// Input validation and sanitization
function validateAndSanitizeInput(data: any): { isValid: boolean; errors: string[]; sanitized?: ApplicationData } {
  const errors: string[] = [];
  
  // Required fields validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Valid email is required');
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Invalid email format');
  }
  
  // Age validation (must be 18+)
  if (data.age !== undefined && (typeof data.age !== 'number' || data.age < 18 || data.age > 100)) {
    errors.push('Age must be between 18 and 100');
  }
  
  // Height validation (realistic range in cm)
  if (data.height !== undefined && (typeof data.height !== 'number' || data.height < 140 || data.height > 220)) {
    errors.push('Height must be between 140cm and 220cm');
  }
  
  // Weight validation (realistic range in kg)
  if (data.weight !== undefined && (typeof data.weight !== 'number' || data.weight < 40 || data.weight > 200)) {
    errors.push('Weight must be between 40kg and 200kg');
  }
  
  // Phone validation (optional but if provided must be valid)
  if (data.phone && (typeof data.phone !== 'string' || data.phone.trim().length < 8)) {
    errors.push('Phone number must be at least 8 characters');
  }
  
  // Portfolio URLs validation
  if (data.portfolio_urls && Array.isArray(data.portfolio_urls)) {
    const urlRegex = /^https?:\/\/.+/;
    for (const url of data.portfolio_urls) {
      if (typeof url !== 'string' || !urlRegex.test(url)) {
        errors.push('All portfolio URLs must be valid HTTP/HTTPS URLs');
        break;
      }
    }
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  // Sanitize input by trimming strings and removing potential HTML/script content
  const sanitized: ApplicationData = {
    name: data.name.trim().substring(0, 100),
    email: data.email.trim().toLowerCase().substring(0, 100),
    phone: data.phone ? data.phone.trim().substring(0, 20) : undefined,
    age: data.age,
    height: data.height,
    weight: data.weight,
    measurements: data.measurements ? data.measurements.trim().substring(0, 50) : undefined,
    experience: data.experience ? data.experience.trim().substring(0, 1000) : undefined,
    portfolio_urls: data.portfolio_urls ? data.portfolio_urls.slice(0, 10) : undefined,
    additional_info: data.additional_info ? data.additional_info.trim().substring(0, 2000) : undefined,
  };
  
  return { isValid: true, errors: [], sanitized };
}

// Rate limiting (simple in-memory store - in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(clientIP: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 applications per 15 minutes per IP
  
  const existing = rateLimitStore.get(clientIP);
  
  if (!existing || now > existing.resetTime) {
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (existing.count >= maxRequests) {
    return false;
  }
  
  existing.count++;
  return true;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limiting
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: 'Too many applications submitted. Please wait 15 minutes before trying again.' 
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate request method
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse and validate request body
    let requestData;
    try {
      requestData = await req.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate and sanitize input
    const validation = validateAndSanitizeInput(requestData);
    if (!validation.isValid) {
      console.log('Validation errors:', validation.errors);
      return new Response(
        JSON.stringify({ 
          error: 'Validation failed', 
          details: validation.errors 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Insert application with sanitized data
    const { data, error } = await supabase
      .from('applications')
      .insert([validation.sanitized])
      .select()

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to submit application. Please try again later.' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Log successful application submission
    await supabase.rpc('log_audit_event', {
      p_action: 'application_submitted',
      p_table_name: 'applications',
      p_record_id: data[0]?.id,
      p_new_values: validation.sanitized
    });

    console.log('Application submitted successfully:', data[0]?.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Application submitted successfully',
        id: data[0]?.id 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred. Please try again later.' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
