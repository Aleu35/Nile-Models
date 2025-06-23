import { useState } from 'react';
import { ModelFormData, createEmptyFormData } from '../ModelFormData';

interface Model {
  id: string;
  name: string;
  category: string;
  bio?: string;
  is_featured?: boolean;
  profile_image_url?: string;
  portfolio_images?: string[];
  social_instagram?: string;
  social_facebook?: string;
  social_twitter?: string;
  social_tiktok?: string;
}

export const useModelFormState = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [formData, setFormData] = useState<ModelFormData>(createEmptyFormData());

  const resetForm = () => {
    setFormData(createEmptyFormData());
    setEditingModel(null);
    setIsFormOpen(false);
  };

  const handleEdit = (model: Model) => {
    console.log('Editing model:', model);
    setEditingModel(model);
    setFormData({
      name: model.name || '',
      category: model.category || '',
      bio: model.bio || '',
      social_instagram: model.social_instagram || '',
      social_facebook: model.social_facebook || '',
      social_twitter: model.social_twitter || '',
      social_tiktok: model.social_tiktok || '',
    });
    setIsFormOpen(true);
  };

  return {
    isFormOpen,
    setIsFormOpen,
    editingModel,
    setEditingModel,
    formData,
    setFormData,
    resetForm,
    handleEdit,
  };
};
