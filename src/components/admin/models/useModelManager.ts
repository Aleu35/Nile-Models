
import { useModelFormState } from './hooks/useModelFormState';
import { useFileUpload } from './hooks/useFileUpload';
import { useModelOperations } from './hooks/useModelOperations';

export const useModelManager = (refetch: () => void) => {
  const {
    isFormOpen,
    setIsFormOpen,
    editingModel,
    setEditingModel,
    formData,
    setFormData,
    resetForm,
    handleEdit,
  } = useModelFormState();

  const {
    handleFileUpload,
    handleMultipleImageUpload,
  } = useFileUpload();

  const {
    handleRemovePortfolioImage: baseHandleRemovePortfolioImage,
    handleSubmit: baseHandleSubmit,
    handleDelete,
  } = useModelOperations(refetch);

  const handleRemovePortfolioImage = async (imageUrl: string) => {
    await baseHandleRemovePortfolioImage(editingModel, setEditingModel, imageUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('useModelManager handleSubmit called');
    
    // Get the form data including files
    const form = e.target as HTMLFormElement;
    
    // Capture files from form inputs
    const profileImageInput = form.querySelector('input[name="profileImage"]') as HTMLInputElement;
    const portfolioImagesInput = form.querySelector('input[name="portfolioImages"]') as HTMLInputElement;
    
    let profileImageFile = null;
    let portfolioFiles: File[] = [];
    
    if (profileImageInput?.files?.[0]) {
      profileImageFile = profileImageInput.files[0];
      console.log('Profile image file found:', profileImageFile.name);
    }
    
    if (portfolioImagesInput?.files && portfolioImagesInput.files.length > 0) {
      portfolioFiles = Array.from(portfolioImagesInput.files);
      console.log('Portfolio images found:', portfolioFiles.length, portfolioFiles.map(f => f.name));
    }

    await baseHandleSubmit(
      e,
      formData,
      editingModel,
      resetForm,
      profileImageFile,
      portfolioFiles,
      handleFileUpload,
      handleMultipleImageUpload
    );
  };

  return {
    isFormOpen,
    setIsFormOpen,
    editingModel,
    formData,
    setFormData,
    resetForm,
    handleEdit,
    handleSubmit,
    handleDelete,
    handleRemovePortfolioImage,
  };
};
