
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Edit, Trash2 } from 'lucide-react';

interface ModelCardProps {
  model: any;
  onEdit: (model: any) => void;
  onDelete: (modelId: string) => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, onEdit, onDelete }) => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg">{model.name}</CardTitle>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(model)}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(model.id)}
              className="border-red-600 text-red-400 hover:bg-red-900"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-gray-400 text-sm space-y-1">
            <p><span className="text-white">Category:</span> {model.category}</p>
            {model.is_featured && <p className="text-yellow-400">⭐ Featured Model</p>}
          </div>
          
          {/* Bio Preview */}
          {model.bio && (
            <div className="space-y-2">
              <Label className="text-white text-xs">Bio Preview:</Label>
              <p className="text-gray-300 text-sm line-clamp-3">{model.bio}</p>
            </div>
          )}
          
          {/* Images Preview */}
          <div className="space-y-2">
            {model.profile_image_url && (
              <div>
                <Label className="text-white text-xs">Profile Image:</Label>
                <img 
                  src={model.profile_image_url} 
                  alt={model.name}
                  className="w-full h-32 object-cover rounded mt-1"
                />
              </div>
            )}
            
            {model.portfolio_images && model.portfolio_images.length > 0 && (
              <div>
                <Label className="text-white text-xs">Portfolio ({model.portfolio_images.length} images):</Label>
                <div className="grid grid-cols-4 gap-1 mt-1">
                  {model.portfolio_images.slice(0, 4).map((imageUrl: string, index: number) => (
                    <img 
                      key={index}
                      src={imageUrl} 
                      alt={`${model.name} portfolio ${index + 1}`}
                      className="w-full aspect-square object-cover rounded"
                    />
                  ))}
                  {model.portfolio_images.length > 4 && (
                    <div className="w-full aspect-square bg-gray-800 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs">+{model.portfolio_images.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
