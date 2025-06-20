
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ModelSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
}

export interface SearchFilters {
  name?: string;
  category?: string;
  heightMin?: number;
  heightMax?: number;
  experienceLevel?: string;
  isFeatured?: boolean;
}

const ModelSearch: React.FC<ModelSearchProps> = ({ onSearch, onClear }) => {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({});
    setShowAdvanced(false);
    onClear();
  };

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof SearchFilters];
    return value !== undefined && value !== '' && value !== null;
  });

  return (
    <Card className="bg-gray-900/50 border-gray-800 mb-6">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Compact Search Bar */}
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
              <Input
                placeholder="Search models..."
                value={filters.name || ''}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                className="pl-8 h-8 text-sm bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <Select 
              value={filters.category || 'all'} 
              onValueChange={(value) => setFilters({ ...filters, category: value === 'all' ? undefined : value })}
            >
              <SelectTrigger className="w-32 h-8 text-sm bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="women">Women</SelectItem>
                <SelectItem value="new_faces">New Faces</SelectItem>
                <SelectItem value="talent">Talent</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleSearch}
              size="sm"
              className="h-8 px-3 bg-white text-black hover:bg-gray-200"
            >
              <Search className="h-3.5 w-3.5" />
            </Button>
            <Button
              onClick={() => setShowAdvanced(!showAdvanced)}
              variant="outline"
              size="sm"
              className="h-8 px-3 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <Filter className="h-3.5 w-3.5" />
            </Button>
            {hasActiveFilters && (
              <Button 
                onClick={handleClear} 
                variant="outline" 
                size="sm"
                className="h-8 px-3 border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>

          {/* Advanced Filters - More Compact */}
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-gray-700">
              <div className="space-y-1">
                <label className="text-white text-xs font-medium">Height (cm)</label>
                <div className="flex gap-1">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.heightMin || ''}
                    onChange={(e) => setFilters({ ...filters, heightMin: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="h-8 text-sm bg-gray-800 border-gray-700 text-white"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.heightMax || ''}
                    onChange={(e) => setFilters({ ...filters, heightMax: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="h-8 text-sm bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-white text-xs font-medium">Experience</label>
                <Select 
                  value={filters.experienceLevel || 'any'} 
                  onValueChange={(value) => setFilters({ ...filters, experienceLevel: value === 'any' ? undefined : value })}
                >
                  <SelectTrigger className="h-8 text-sm bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="experienced">Experienced</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-white text-xs font-medium">Featured</label>
                <Select 
                  value={filters.isFeatured !== undefined ? filters.isFeatured.toString() : 'any'} 
                  onValueChange={(value) => setFilters({ ...filters, isFeatured: value === 'any' ? undefined : value === 'true' })}
                >
                  <SelectTrigger className="h-8 text-sm bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">All</SelectItem>
                    <SelectItem value="true">Featured</SelectItem>
                    <SelectItem value="false">Regular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelSearch;
