
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ModelFormData } from '../ModelFormData';

export const useModelOperations = (refetch: () => void) => {
  const { toast } = useToast();

  const handleRemovePortfolioImage = async (editingModel: any, setEditingModel: (model: any) => void, imageUrl: string) => {
    if (!editingModel) return;

    try {
      console.log('Removing portfolio image:', imageUrl);
      
      // Get current portfolio images, ensuring it's an array
      const currentPortfolioImages = Array.isArray(editingModel.portfolio_images) 
        ? editingModel.portfolio_images 
        : [];
      
      const updatedPortfolioImages = currentPortfolioImages.filter(
        (url: string) => url !== imageUrl
      );

      console.log('Updated portfolio images:', updatedPortfolioImages);

      const { error } = await supabase
        .from('models')
        .update({ 
          portfolio_images: updatedPortfolioImages.length > 0 ? updatedPortfolioImages : null 
        })
        .eq('id', editingModel.id);

      if (error) throw error;

      setEditingModel({
        ...editingModel,
        portfolio_images: updatedPortfolioImages
      });

      toast({
        title: "Success",
        description: "Portfolio image removed successfully",
      });

      refetch();
    } catch (error) {
      console.error('Error removing portfolio image:', error);
      toast({
        title: "Error",
        description: "Failed to remove portfolio image",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
    formData: ModelFormData,
    editingModel: any,
    resetForm: () => void,
    profileImageFile?: File | null,
    portfolioFiles?: File[],
    handleFileUpload?: (file: File, folder?: string) => Promise<string | null>,
    handleMultipleImageUpload?: (files: File[]) => Promise<string[]>
  ) => {
    e.preventDefault();
    
    try {
      console.log('Starting form submission with data:', formData);
      console.log('Profile image file:', profileImageFile);
      console.log('Portfolio files:', portfolioFiles);
      
      // Validate required fields
      if (!formData.name || !formData.category) {
        throw new Error('Name and category are required');
      }
      
      let profileImageUrl = editingModel?.profile_image_url;
      let portfolioImages = Array.isArray(editingModel?.portfolio_images) ? [...editingModel.portfolio_images] : [];
      
      // Upload new profile image if selected
      if (profileImageFile && handleFileUpload) {
        console.log('Uploading profile image...');
        profileImageUrl = await handleFileUpload(profileImageFile, 'model-images');
        if (!profileImageUrl) {
          throw new Error('Failed to upload profile image');
        }
        console.log('Profile image uploaded:', profileImageUrl);
      }

      // Upload new portfolio images if selected
      if (portfolioFiles && portfolioFiles.length > 0 && handleMultipleImageUpload) {
        console.log('Uploading portfolio images...');
        const newPortfolioUrls = await handleMultipleImageUpload(portfolioFiles);
        if (newPortfolioUrls.length > 0) {
          portfolioImages = [...portfolioImages, ...newPortfolioUrls];
          console.log('Combined portfolio images:', portfolioImages);
        }
      }

      const modelData = {
        name: formData.name,
        category: formData.category,
        bio: formData.bio || null,
        is_featured: editingModel?.is_featured || false,
        profile_image_url: profileImageUrl || null,
        portfolio_images: portfolioImages.length > 0 ? portfolioImages : null,
        social_instagram: formData.social_instagram || null,
        social_facebook: formData.social_facebook || null,
        social_twitter: formData.social_twitter || null,
        social_tiktok: formData.social_tiktok || null,
        // Explicitly set measurement fields to null for new models
        height: editingModel?.height || null,
        measurements: editingModel?.measurements || null,
        experience_level: editingModel?.experience_level || null,
      };

      console.log('Submitting model data:', modelData);

      if (editingModel) {
        const { error } = await supabase
          .from('models')
          .update(modelData)
          .eq('id', editingModel.id);
        
        if (error) {
          console.error('Update error:', error);
          throw error;
        }
        
        toast({
          title: "Success",
          description: "Model updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('models')
          .insert([modelData]);
        
        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
        
        toast({
          title: "Success",
          description: "Model added successfully",
        });
      }

      resetForm();
      refetch();
    } catch (error) {
      console.error('Error saving model:', error);
      toast({
        title: "Error",
        description: `Failed to save model: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
      throw error; // Re-throw to handle in calling function
    }
  };

  const handleDelete = async (modelId: string) => {
    if (!confirm('Are you sure you want to delete this model?')) return;

    try {
      const { error } = await supabase
        .from('models')
        .delete()
        .eq('id', modelId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Model deleted successfully",
      });
      
      refetch();
    } catch (error) {
      console.error('Error deleting model:', error);
      toast({
        title: "Error",
        description: "Failed to delete model",
        variant: "destructive",
      });
    }
  };

  return {
    handleRemovePortfolioImage,
    handleSubmit,
    handleDelete,
  };
};
