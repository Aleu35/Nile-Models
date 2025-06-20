
import { useState } from 'react';
import { ModelFormData, createEmptyFormData } from '../ModelFormData';

export const useModelFormState = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<any>(null);
  const [formData, setFormData] = useState<ModelFormData>(createEmptyFormData());

  const resetForm = () => {
    setFormData(createEmptyFormData());
    setEditingModel(null);
    setIsFormOpen(false);
  };

  const handleEdit = (model: any) => {
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
