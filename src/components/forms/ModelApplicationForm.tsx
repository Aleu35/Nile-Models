import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { applicationSchema, type ApplicationFormData, sanitizeInput, generateCSRFToken } from '@/lib/validation';
import { InputField, SelectField, DateField, CountryField, TextArea, FileInput, SubmitButton } from '@/components/forms/FormComponents';
import {
  Input as UiInput,
  Select as UiSelect,
  DateInput as UiDateInput,
  CountrySelect as UiCountrySelect,
  Textarea as UiTextarea,
  FileUpload,
} from '@/components/forms/FormComponents';

const ModelApplicationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [portfolioUrls, setPortfolioUrls] = useState<string[]>(['']);
  const [csrfToken, setCsrfToken] = useState('');
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onChange'
  });

  // Generate CSRF token on component mount
  useEffect(() => {
    const token = generateCSRFToken();
    setCsrfToken(token);
    sessionStorage.setItem('csrf_token', token);
  }, []);

  const addPortfolioUrl = () => {
    if (portfolioUrls.length < 10) {
      const newUrls = [...portfolioUrls, ''];
      setPortfolioUrls(newUrls);
      setValue('portfolio_urls', newUrls.filter(url => url.trim() !== ''));
    } else {
      toast({
        title: "Maximum URLs reached",
        description: "You can add up to 10 portfolio URLs.",
        variant: "destructive",
      });
    }
  };

  const removePortfolioUrl = (index: number) => {
    const newUrls = portfolioUrls.filter((_, i) => i !== index);
    setPortfolioUrls(newUrls);
    setValue('portfolio_urls', newUrls.filter(url => url.trim() !== ''));
  };

  const updatePortfolioUrl = (index: number, value: string) => {
    const newUrls = [...portfolioUrls];
    newUrls[index] = value;
    setPortfolioUrls(newUrls);
    setValue('portfolio_urls', newUrls.filter(url => url.trim() !== ''));
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    
    try {
      // CSRF validation
      const storedToken = sessionStorage.getItem('csrf_token');
      if (!storedToken || storedToken !== csrfToken) {
        throw new Error('Security validation failed. Please refresh the page and try again.');
      }

      // Sanitize all text inputs
      const sanitizedData = {
        ...data,
        name: sanitizeInput(data.name),
        email: data.email.toLowerCase().trim(),
        phone: data.phone ? sanitizeInput(data.phone) : undefined,
        measurements: data.measurements ? sanitizeInput(data.measurements) : undefined,
        experience: data.experience ? sanitizeInput(data.experience) : undefined,
        additional_info: data.additional_info ? sanitizeInput(data.additional_info) : undefined,
        portfolio_urls: data.portfolio_urls?.filter(url => url.trim() !== ''),
      };

      console.log('Submitting application with data:', sanitizedData);

      const body = {
        first_name : data.firstName,
        last_name  : data.lastName,
        gender     : data.gender,
        dob        : data.dob,
        city       : data.city,
        state      : data.state,
        country    : data.country,
        email      : data.email,
        phone      : data.phone,
        instagram  : data.instagram,
        tiktok     : data.tiktok,
        facebook   : data.facebook,
        twitter    : data.twitter,
        height     : data.height,
        chest      : data.chest,
        waist      : data.waist,
        hips       : data.hips,
        shoes      : data.shoes,
        inseam     : data.inseam,
        hair       : data.hair,
        eyes       : data.eyes,
        ethnicity  : data.ethnicity,
        bio        : data.bio,
        digitals   : data.portfolio_urls,
      };

      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      setSubmitSuccess(true);
      reset();
      setPortfolioUrls(['']);
      
      toast({
        title: "Application Submitted",
        description: "Application received – we'll be in touch 👋",
      });

      // Generate new CSRF token for next submission
      const newToken = generateCSRFToken();
      setCsrfToken(newToken);
      sessionStorage.setItem('csrf_token', newToken);

    } catch (error) {
      console.error('Application submission error:', error);
      
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-gray-700 max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-light text-white mb-4">Application Submitted!</h2>
          <p className="text-gray-300 mb-6">
            Thank you for your application. Our team will review your information and contact you within 48-72 hours.
          </p>
          <Button 
            onClick={() => setSubmitSuccess(false)}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-gray-700 max-w-2xl mx-auto">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="h-6 w-6 text-blue-500" />
          <CardTitle className="text-2xl font-light text-white tracking-wide">
            Model Application
          </CardTitle>
        </div>
        <p className="text-gray-400 text-sm">
          All information is securely encrypted and protected. Fields marked with * are required.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <hr className="border-t border-gray-700" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6 md:grid-cols-2 md:gap-x-8 bg-black text-white space-y-12"
        >
          {/* ---------- LEFT COLUMN ---------- */}
          <div className="space-y-6">
            <InputField name="firstName"  label="FIRST NAME"   required />
            <InputField name="lastName"   label="LAST NAME"    required />
            <SelectField name="gender"    label="GENDER"       required
              options={['Female','Male','Non-binary','Prefer not to say']} />
            <DateField   name="dob"       label="DATE OF BIRTH" required />
            <InputField name="city"       label="CITY"         required />
            <InputField name="state"      label="STATE / PROVINCE / REGION" required />
            <CountryField name="country"  label="COUNTRY"      required />
            <InputField name="email"      label="E-MAIL ADDRESS" required />
            <InputField name="phone"      label="PHONE"        required />
            <InputField name="instagram"  label="INSTAGRAM"    />
            <InputField name="tiktok"     label="TIKTOK"       />
            <InputField name="facebook"   label="FACEBOOK"     />
            <InputField name="twitter"    label="X"            />
          </div>

          {/* ---------- RIGHT COLUMN ---------- */}
          <div className="space-y-6">
            <InputField name="height"   label="HEIGHT"    required />
            <InputField name="chest"    label="CHEST"     required />
            <InputField name="waist"    label="WAIST"     required />
            <InputField name="hips"     label="HIPS"      required />
            <InputField name="shoes"    label="SHOES"     required />
            <InputField name="inseam"   label="INSEAM"    required />
            <InputField name="hair"     label="HAIR"      required />
            <InputField name="eyes"     label="EYES"      required />
            <InputField name="ethnicity" label="ETHNICITY" required />
            <TextArea   name="bio"      label="SHORT BIO" required rows={4} />
            <FileInput  name="files"    label="UPLOAD YOUR DIGITALS"
              accept=".jpg,.jpeg"
              maxFiles={8}
              maxSize={5 * 1024 * 1024}   /* 5 MB */
            />
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ModelApplicationForm;
