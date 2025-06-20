
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ModelFormData } from '../ModelFormData';

interface BasicInfoSectionProps {
  formData: ModelFormData;
  onFormDataChange: (data: ModelFormData) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formData,
  onFormDataChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Basic Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onFormDataChange({...formData, name: e.target.value})}
            required
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category" className="text-white">Category *</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => onFormDataChange({...formData, category: value})}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="men">Men</SelectItem>
              <SelectItem value="women">Women</SelectItem>
              <SelectItem value="new_faces">New Faces</SelectItem>
              <SelectItem value="talent">Talent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio" className="text-white">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => onFormDataChange({...formData, bio: e.target.value})}
          placeholder="Enter model bio..."
          className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
        />
      </div>
    </div>
  );
};
