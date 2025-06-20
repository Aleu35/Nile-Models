
import React, { useState, useEffect, useMemo } from 'react';
import { useModels } from '@/hooks/useModels';
import { X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: allModels } = useModels();
  const navigate = useNavigate();

  // Filter models based on search query
  const filteredModels = useMemo(() => {
    if (!allModels || !searchQuery.trim()) return [];
    
    return allModels.filter(model => 
      model.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 10); // Limit to 10 results
  }, [allModels, searchQuery]);

  // Clear search when overlay closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Handle model selection
  const handleModelClick = (model: any) => {
    // Navigate to the appropriate category page and close overlay
    const category = model.category || 'men'; // Default to men if no category
    navigate(`/${category}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl mx-4">
        {/* Search Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-light tracking-wide">Search Models</h2>
          <button
            onClick={onClose}
            className="text-white hover:opacity-70 transition-opacity"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Type model name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-900 border-gray-700 text-white text-lg placeholder:text-gray-500 focus:border-white"
            autoFocus
          />
        </div>

        {/* Search Results */}
        {searchQuery.trim() && (
          <div className="bg-gray-900 rounded-lg border border-gray-700 max-h-96 overflow-y-auto">
            {filteredModels.length > 0 ? (
              <div className="p-2">
                {filteredModels.map((model) => (
                  <div
                    key={model.id}
                    onClick={() => handleModelClick(model)}
                    className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
                  >
                    {/* Model Image/Video Thumbnail */}
                    <div className="w-16 h-20 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                      {model.profile_image_url ? (
                        <img
                          src={model.profile_image_url}
                          alt={model.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    
                    {/* Model Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-lg truncate">
                        {model.name}
                      </h3>
                      <p className="text-gray-400 text-sm capitalize">
                        {model.category || 'Model'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-400">No models found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}

        {/* Search Tips */}
        {!searchQuery.trim() && (
          <div className="text-center text-gray-400 mt-8">
            <p>Start typing to search for models by name</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
