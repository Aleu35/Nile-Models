
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useModels } from '@/hooks/useModels';
import { ModelForm } from './models/ModelForm';
import { ModelCard } from './models/ModelCard';
import { useModelManager } from './models/useModelManager';

const ModelsManager = () => {
  const { data: models, isLoading, refetch } = useModels();
  const {
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
  } = useModelManager(refetch);

  if (isLoading) {
    return <div className="text-white">Loading models...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Models Management</h2>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="bg-white text-black hover:bg-gray-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Model
        </Button>
      </div>

      <ModelForm
        isOpen={isFormOpen}
        editingModel={editingModel}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleSubmit}
        onCancel={resetForm}
        onRemovePortfolioImage={handleRemovePortfolioImage}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models?.map((model) => (
          <ModelCard
            key={model.id}
            model={model}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ModelsManager;
