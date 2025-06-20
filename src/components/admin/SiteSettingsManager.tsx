
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SiteSettingsManager = () => {
  const { data: settings, isLoading, refetch } = useSiteSettings();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    agency_name: '',
    tagline: '',
    contact_email: '',
    contact_phone: '',
    social_facebook: '',
    social_instagram: '',
    social_twitter: '',
    background_video_url: '',
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        agency_name: settings.agency_name || '',
        tagline: settings.tagline || '',
        contact_email: settings.contact_email || '',
        contact_phone: settings.contact_phone || '',
        social_facebook: settings.social_facebook || '',
        social_instagram: settings.social_instagram || '',
        social_twitter: settings.social_twitter || '',
        background_video_url: settings.background_video_url || '',
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (settings) {
        // Update existing settings
        const { error } = await supabase
          .from('site_settings')
          .update(formData)
          .eq('id', settings.id);
        
        if (error) throw error;
      } else {
        // Create new settings
        const { error } = await supabase
          .from('site_settings')
          .insert([formData]);
        
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Site settings updated successfully",
      });
      
      refetch();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Site Settings</h2>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agency_name" className="text-white">Agency Name</Label>
                <Input
                  id="agency_name"
                  value={formData.agency_name}
                  onChange={(e) => setFormData({...formData, agency_name: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tagline" className="text-white">Tagline</Label>
                <Input
                  id="tagline"
                  value={formData.tagline}
                  onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email" className="text-white">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                  placeholder="info@nilemodels.com"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact_phone" className="text-white">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  value={formData.contact_phone}
                  onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="background_video_url" className="text-white">Background Video URL</Label>
              <Input
                id="background_video_url"
                value={formData.background_video_url}
                onChange={(e) => setFormData({...formData, background_video_url: e.target.value})}
                placeholder="https://example.com/video.mp4"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-medium">Social Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="social_facebook" className="text-white">Facebook URL</Label>
                  <Input
                    id="social_facebook"
                    value={formData.social_facebook}
                    onChange={(e) => setFormData({...formData, social_facebook: e.target.value})}
                    placeholder="https://facebook.com/yourpage"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="social_instagram" className="text-white">Instagram Handle</Label>
                  <Input
                    id="social_instagram"
                    value={formData.social_instagram}
                    onChange={(e) => setFormData({...formData, social_instagram: e.target.value})}
                    placeholder="nilemgmt"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <p className="text-xs text-gray-400">Enter just the handle without @ symbol</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="social_twitter" className="text-white">Twitter URL</Label>
                  <Input
                    id="social_twitter"
                    value={formData.social_twitter}
                    onChange={(e) => setFormData({...formData, social_twitter: e.target.value})}
                    placeholder="https://twitter.com/yourpage"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="bg-white text-black hover:bg-gray-200">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettingsManager;
