
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useFileUpload = () => {
  const { toast } = useToast();

  const handleFileUpload = async (file: File, folder: string = 'model-images'): Promise<string | null> => {
    try {
      console.log('Uploading file:', file.name, 'Size:', file.size);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from(folder)
        .upload(fileName, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from(folder)
        .getPublicUrl(fileName);

      console.log('File uploaded successfully:', data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: `Failed to upload file: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
      return null;
    }
  };

  const handleMultipleImageUpload = async (files: File[]): Promise<string[]> => {
    console.log('Uploading multiple images:', files.length);
    
    if (files.length === 0) return [];
    
    const uploadPromises = files.map(file => handleFileUpload(file, 'model-images'));
    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter(url => url !== null) as string[];
    console.log('Successfully uploaded images:', successfulUploads);
    return successfulUploads;
  };

  return {
    handleFileUpload,
    handleMultipleImageUpload,
  };
};
