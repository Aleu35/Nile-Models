
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

      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(sanitizedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      setSubmitSuccess(true);
      reset();
      setPortfolioUrls(['']);
      
      toast({
        title: "Application Submitted Successfully!",
        description: "Thank you for your application. We'll review it and get back to you soon.",
        variant: "default",
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-light text-white border-b border-gray-700 pb-2">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                <Input
                  id="name"
                  {...register('name')}
                  className="bg-gray-800 border-gray-600 text-white focus:border-blue-500"
                  placeholder="Enter your full name"
                  maxLength={100}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="bg-gray-800 border-gray-600 text-white focus:border-blue-500"
                  placeholder="your.email@example.com"
                  maxLength={100}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className="bg-gray-800 border-gray-600 text-white focus:border-blue-500"
                  placeholder="+1 (555) 123-4567"
                  maxLength={20}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="age" className="text-gray-300">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  {...register('age', { valueAsNumber: true })}
                  className="bg-gray-800 border-gray-600 text-white focus:border-blue-500"
                  placeholder="18"
                  min="18"
                  max="100"
                />
                {errors.age && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.age.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Physical Attributes */}
          <div className="space-y-4">
            <h3 className="text-lg font-light text-white border-b border-gray-700 pb-2">
              Physical Attributes
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="height" className="text-gray-300">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  {...register('height', { valueAsNumber: true })}
                  className="bg-gray-800 border-gray-600 text-white focus:border-blue-500"
                  placeholder="175"
                  min="140"
                  max="220"
                />
                {errors.height && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.height.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="weight" className="text-gray-300">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  {...register('weight', { valueAsNumber: true })}
                  className="bg-gray-800 border-gray-600 text-white focus:border-blue-500"
                  placeholder="65"
                  min="40"
                  max="200"
                />
                {errors.weight && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.weight.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="measurements" className="text-gray-300">Measurements</Label>
                <Input
                  id="measurements"
                  {...register('measurements')}
                  className="bg-gray-800 border-gray-600 text-white focus:border-blue-500"
                  placeholder="86-61-91"
                  maxLength={50}
                />
                {errors.measurements && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.measurements.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Portfolio URLs */}
          <div className="space-y-4">
            <h3 className="text-lg font-light text-white border-b border-gray-700 pb-2">
              Portfolio Links
            </h3>
            
            {portfolioUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={url}
                  onChange={(e) => updatePortfolioUrl(index, e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white focus:border-blue-500 flex-1"
                  placeholder="https://your-portfolio-link.com"
                />
                {portfolioUrls.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removePortfolioUrl(index)}
                    variant="outline"
                    size="sm"
                    className="border-red-600 text-red-400 hover:bg-red-900"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            
            <Button
              type="button"
              onClick={addPortfolioUrl}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
              disabled={portfolioUrls.length >= 10}
            >
              Add Portfolio Link
            </Button>
            
            {errors.portfolio_urls && (
              <p className="text-red-400 text-sm flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {errors.portfolio_urls.message}
              </p>
            )}
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="experience" className="text-gray-300">Experience</Label>
              <Textarea
                id="experience"
                {...register('experience')}
                className="bg-gray-800 border-gray-600 text-white focus:border-blue-500 min-h-[100px]"
                placeholder="Tell us about your modeling experience, previous work, or why you're interested in modeling..."
                maxLength={1000}
              />
              {errors.experience && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="additional_info" className="text-gray-300">Additional Information</Label>
              <Textarea
                id="additional_info"
                {...register('additional_info')}
                className="bg-gray-800 border-gray-600 text-white focus:border-blue-500 min-h-[100px]"
                placeholder="Any additional information you'd like to share..."
                maxLength={2000}
              />
              {errors.additional_info && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors.additional_info.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Application...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ModelApplicationForm;
