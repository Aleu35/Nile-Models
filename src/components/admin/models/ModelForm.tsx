import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ModelFormData } from './ModelFormData';
import { BasicInfoSection } from './components/BasicInfoSection';
import { MediaUploadSection } from './components/MediaUploadSection';
import { SocialMediaSection } from './components/SocialMediaSection';

interface Model {
  id: string;
  name: string;
  category: string;
  bio?: string;
  is_featured?: boolean;
  profile_image_url?: string;
  portfolio_images?: string[];
}

interface ModelFormProps {
  isOpen: boolean;
  editingModel: Model | null;
  formData: ModelFormData;
  onFormDataChange: (data: ModelFormData) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
  onRemovePortfolioImage?: (imageUrl: string) => void;
}

export const ModelForm: React.FC<ModelFormProps> = ({
  isOpen,
  editingModel,
  formData,
  onFormDataChange,
  onSubmit,
  onCancel,
  onRemovePortfolioImage,
}) => {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ModelForm handleSubmit called');
    await onSubmit(e);
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">
          {editingModel ? 'Edit Model' : 'Add New Model'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoSection 
            formData={formData}
            onFormDataChange={onFormDataChange}
          />

          <MediaUploadSection 
            editingModel={editingModel}
            onRemovePortfolioImage={onRemovePortfolioImage}
          />

          <SocialMediaSection 
            formData={formData}
            onFormDataChange={onFormDataChange}
          />

          {/* Form Buttons */}
          <div className="flex space-x-2 pt-4 border-t border-gray-700">
            <Button type="submit" className="bg-white text-black hover:bg-gray-200">
              {editingModel ? 'Update Model' : 'Add Model'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
