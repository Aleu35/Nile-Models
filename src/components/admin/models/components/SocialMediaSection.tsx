
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModelFormData } from '../ModelFormData';

interface SocialMediaSectionProps {
  formData: ModelFormData;
  onFormDataChange: (data: ModelFormData) => void;
}

export const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({
  formData,
  onFormDataChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Social Media URLs</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="social_instagram" className="text-white">Instagram URL</Label>
          <Input
            id="social_instagram"
            type="url"
            value={formData.social_instagram}
            onChange={(e) => onFormDataChange({...formData, social_instagram: e.target.value})}
            placeholder="https://instagram.com/username"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="social_facebook" className="text-white">Facebook URL</Label>
          <Input
            id="social_facebook"
            type="url"
            value={formData.social_facebook}
            onChange={(e) => onFormDataChange({...formData, social_facebook: e.target.value})}
            placeholder="https://facebook.com/username"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="social_twitter" className="text-white">Twitter/X URL</Label>
          <Input
            id="social_twitter"
            type="url"
            value={formData.social_twitter}
            onChange={(e) => onFormDataChange({...formData, social_twitter: e.target.value})}
            placeholder="https://twitter.com/username"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="social_tiktok" className="text-white">TikTok URL</Label>
          <Input
            id="social_tiktok"
            type="url"
            value={formData.social_tiktok}
            onChange={(e) => onFormDataChange({...formData, social_tiktok: e.target.value})}
            placeholder="https://tiktok.com/@username"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>
    </div>
  );
};
