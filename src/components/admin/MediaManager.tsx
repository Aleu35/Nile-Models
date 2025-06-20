
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Image, Video, Music, File, Trash2, Edit, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'audio' | 'document';
  size: string;
  uploadDate: string;
  alt?: string;
  description?: string;
}

const MediaManager = () => {
  const { toast } = useToast();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'hero-background.mp4',
      url: '/placeholder-video.mp4',
      type: 'video',
      size: '15.2 MB',
      uploadDate: '2024-01-15',
      description: 'Main hero background video'
    },
    {
      id: '2',
      name: 'agency-logo.png',
      url: '/placeholder-logo.png',
      type: 'image',
      size: '256 KB',
      uploadDate: '2024-01-10',
      alt: 'Agency Logo',
      description: 'Main agency logo'
    }
  ]);

  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [editingFile, setEditingFile] = useState<MediaFile | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    alt: '',
    description: '',
  });

  const resetForm = () => {
    setFormData({
      alt: '',
      description: '',
    });
    setEditingFile(null);
    setIsFormOpen(false);
  };

  const handleEdit = (file: MediaFile) => {
    setEditingFile(file);
    setFormData({
      alt: file.alt || '',
      description: file.description || '',
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingFile) {
      setMediaFiles(files => 
        files.map(file => 
          file.id === editingFile.id 
            ? { ...file, ...formData }
            : file
        )
      );
      toast({
        title: "Success",
        description: "Media file updated successfully",
      });
    }

    resetForm();
  };

  const handleDelete = (fileId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    setMediaFiles(files => files.filter(file => file.id !== fileId));
    setSelectedFiles(selected => selected.filter(id => id !== fileId));
    toast({
      title: "Success",
      description: "Media file deleted successfully",
    });
  };

  const handleBulkDelete = () => {
    if (selectedFiles.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedFiles.length} file(s)?`)) return;
    
    setMediaFiles(files => files.filter(file => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
    toast({
      title: "Success",
      description: `${selectedFiles.length} file(s) deleted successfully`,
    });
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-8 w-8" />;
      case 'video': return <Video className="h-8 w-8" />;
      case 'audio': return <Music className="h-8 w-8" />;
      default: return <File className="h-8 w-8" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Media Management</h2>
        <div className="flex space-x-2">
          {selectedFiles.length > 0 && (
            <Button 
              onClick={handleBulkDelete}
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-900"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected ({selectedFiles.length})
            </Button>
          )}
          <Button className="bg-white text-black hover:bg-gray-200">
            <Upload className="h-4 w-4 mr-2" />
            Upload Media
          </Button>
        </div>
      </div>

      {/* Upload Area */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-8">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">Upload Media Files</h3>
            <p className="text-gray-400 mb-4">Drag and drop files here, or click to select files</p>
            <input
              type="file"
              multiple
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
              className="hidden"
              id="file-upload"
            />
            <label 
              htmlFor="file-upload"
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 cursor-pointer inline-block"
            >
              Choose Files
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Media Library */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Media Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mediaFiles.map((file) => (
              <div 
                key={file.id}
                className={`relative p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedFiles.includes(file.id) 
                    ? 'border-white bg-gray-800' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => toggleFileSelection(file.id)}
              >
                <div className="flex flex-col items-center space-y-2">
                  {file.type === 'image' ? (
                    <img 
                      src={file.url} 
                      alt={file.alt || file.name}
                      className="w-full h-32 object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-800 rounded flex items-center justify-center text-gray-400">
                      {getFileIcon(file.type)}
                    </div>
                  )}
                  
                  <div className="text-center w-full">
                    <h4 className="text-white text-sm font-medium truncate">{file.name}</h4>
                    <p className="text-gray-400 text-xs">{file.size}</p>
                    <p className="text-gray-500 text-xs">{file.uploadDate}</p>
                  </div>
                </div>

                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(file.url, '_blank');
                    }}
                    className="h-6 w-6 p-0 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(file);
                    }}
                    className="h-6 w-6 p-0 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file.id);
                    }}
                    className="h-6 w-6 p-0 border-red-600 text-red-400 hover:bg-red-900"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>

                {selectedFiles.includes(file.id) && (
                  <div className="absolute top-2 left-2">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Form */}
      {isFormOpen && editingFile && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Edit Media File</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">File Name</Label>
                  <Input
                    value={editingFile.name}
                    disabled
                    className="bg-gray-800 border-gray-700 text-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="alt" className="text-white">Alt Text</Label>
                  <Input
                    id="alt"
                    value={formData.alt}
                    onChange={(e) => setFormData({...formData, alt: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Alternative text for accessibility"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="File description for internal reference"
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                  Update File
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetForm}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MediaManager;
