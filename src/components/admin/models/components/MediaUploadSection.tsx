
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface MediaUploadSectionProps {
  editingModel: any;
  onRemovePortfolioImage?: (imageUrl: string) => void;
}

export const MediaUploadSection: React.FC<MediaUploadSectionProps> = ({
  editingModel,
  onRemovePortfolioImage,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Media</h3>
      
      <div className="space-y-2">
        <Label htmlFor="profileImage" className="text-white">Profile Image</Label>
        <Input
          id="profileImage"
          name="profileImage"
          type="file"
          accept="image/*"
          className="bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded file:px-3 file:py-1"
        />
        {editingModel?.profile_image_url && (
          <div className="mt-2">
            <p className="text-sm text-gray-400 mb-2">Current Profile Image:</p>
            <div className="w-24 h-32 bg-gray-800 rounded border border-gray-700 overflow-hidden">
              <img
                src={editingModel.profile_image_url}
                alt="Current profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Portfolio Images Section */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-white border-b border-gray-600 pb-1">Portfolio Images</h4>
        
        {/* Current Portfolio Images Display */}
        {editingModel?.portfolio_images && Array.isArray(editingModel.portfolio_images) && editingModel.portfolio_images.length > 0 && (
          <div className="space-y-3">
            <Label className="text-white text-sm">Current Portfolio Images</Label>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {editingModel.portfolio_images.map((imageUrl: string, index: number) => (
                <div key={`${imageUrl}-${index}`} className="relative group">
                  <div className="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden border border-gray-600 hover:border-gray-500 transition-colors">
                    <img
                      src={imageUrl}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(`Failed to load portfolio image ${index + 1}:`, imageUrl);
                      }}
                    />
                  </div>
                  {onRemovePortfolioImage && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-600 hover:bg-red-700"
                      onClick={() => onRemovePortfolioImage(imageUrl)}
                      title={`Remove image ${index + 1}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload New Portfolio Images */}
        <div className="space-y-2">
          <Label htmlFor="portfolioImages" className="text-white">
            {editingModel?.portfolio_images && Array.isArray(editingModel.portfolio_images) && editingModel.portfolio_images.length > 0 
              ? 'Add More Portfolio Images' 
              : 'Upload Portfolio Images'
            }
          </Label>
          <Input
            id="portfolioImages"
            name="portfolioImages"
            type="file"
            accept="image/*"
            multiple
            className="bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded file:px-3 file:py-1"
          />
          <p className="text-xs text-gray-400">Select multiple images to add to the portfolio</p>
        </div>
      </div>
    </div>
  );
};
