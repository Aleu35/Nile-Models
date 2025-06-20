import React, { useState, useMemo } from 'react';
import { useModels } from '@/hooks/useModels';
import ModelProfile from './ModelProfile';
import ModelSearch, { SearchFilters } from './ModelSearch';
import ModelGridHeader from './ModelGridHeader';
import ModelCard from './ModelCard';

interface ModelGridProps {
  category?: string;
  title: string;
}

const ModelGrid: React.FC<ModelGridProps> = ({ category, title }) => {
  const { data: models, isLoading, error } = useModels(category);
  const [selectedModel, setSelectedModel] = useState(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});

  console.log('ModelGrid - Category:', category, 'Models:', models);

  const filteredModels = useMemo(() => {
    if (!models) return [];

    return models.filter(model => {
      // Name filter
      if (searchFilters.name && !model.name.toLowerCase().includes(searchFilters.name.toLowerCase())) {
        return false;
      }

      // Height filters
      if (searchFilters.heightMin && model.height && model.height < searchFilters.heightMin) {
        return false;
      }
      if (searchFilters.heightMax && model.height && model.height > searchFilters.heightMax) {
        return false;
      }

      // Experience level filter
      if (searchFilters.experienceLevel && model.experience_level !== searchFilters.experienceLevel) {
        return false;
      }

      // Featured filter
      if (searchFilters.isFeatured !== undefined && model.is_featured !== searchFilters.isFeatured) {
        return false;
      }

      return true;
    });
  }, [models, searchFilters]);

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

  const handleClearSearch = () => {
    setSearchFilters({});
  };

  const handleModelClick = (model) => {
    setSelectedModel(model);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading models...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl text-red-400">Error loading models: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <ModelGridHeader title={title} />
        
        {/* Only show search component if no category is specified */}
        {!category && (
          <>
            <ModelSearch onSearch={handleSearch} onClear={handleClearSearch} />
            
            {/* Results Summary */}
            {filteredModels.length !== models?.length && (
              <div className="mb-6 text-center">
                <p className="text-gray-400">
                  Showing {filteredModels.length} of {models?.length || 0} models
                </p>
              </div>
            )}
          </>
        )}
        
        {!models || models.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400 font-light">No models found in this category yet.</p>
            <p className="text-gray-500 mt-2 font-light">Check back soon for new additions!</p>
          </div>
        ) : (category ? models : filteredModels).length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400 font-light">No models match your search criteria.</p>
            <p className="text-gray-500 mt-2 font-light">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {(category ? models : filteredModels).map((model) => (
              <ModelCard 
                key={model.id} 
                model={model} 
                onModelClick={handleModelClick}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Model Profile Modal */}
      {selectedModel && (
        <ModelProfile 
          model={selectedModel} 
          onClose={() => setSelectedModel(null)} 
        />
      )}
    </div>
  );
};

export default ModelGrid;
