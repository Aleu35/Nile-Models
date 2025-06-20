
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, Edit, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PageContent {
  id: string;
  page: string;
  section: string;
  title: string;
  content: string;
  isVisible: boolean;
  lastUpdated: string;
}

const ContentManager = () => {
  const { toast } = useToast();
  const [pageContents, setPageContents] = useState<PageContent[]>([
    {
      id: '1',
      page: 'Homepage',
      section: 'Hero Section',
      title: 'NILES',
      content: 'Premier modeling agency representing exceptional talent worldwide.',
      isVisible: true,
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      page: 'About',
      section: 'Main Content',
      title: 'About NILES',
      content: 'We are a leading modeling agency with over 20 years of experience in the fashion industry...',
      isVisible: true,
      lastUpdated: '2024-01-10'
    },
    {
      id: '3',
      page: 'Services',
      section: 'Services List',
      title: 'Our Services',
      content: 'Model representation, casting services, talent development, and more.',
      isVisible: true,
      lastUpdated: '2024-01-08'
    },
    {
      id: '4',
      page: 'Contact',
      section: 'Contact Info',
      title: 'Get In Touch',
      content: 'Ready to work with us? Contact our team today.',
      isVisible: true,
      lastUpdated: '2024-01-05'
    }
  ]);

  const [editingContent, setEditingContent] = useState<PageContent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isVisible: true,
  });

  const handleEdit = (content: PageContent) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      content: content.content,
      isVisible: content.isVisible,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingContent) {
      setPageContents(contents => 
        contents.map(content => 
          content.id === editingContent.id 
            ? { 
                ...content, 
                ...formData, 
                lastUpdated: new Date().toISOString().split('T')[0] 
              }
            : content
        )
      );
      
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      
      setEditingContent(null);
    }
  };

  const handleCancel = () => {
    setEditingContent(null);
    setFormData({
      title: '',
      content: '',
      isVisible: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Page Content Management</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Page Contents</h3>
          {pageContents.map((content) => (
            <Card key={content.id} className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">{content.page}</CardTitle>
                    <p className="text-gray-400 text-sm">{content.section}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      content.isVisible ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                    }`}>
                      {content.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(content)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="text-white font-medium mb-2">{content.title}</h4>
                <p className="text-gray-400 text-sm line-clamp-3 mb-2">{content.content}</p>
                <p className="text-gray-500 text-xs">Last updated: {content.lastUpdated}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Form */}
        <div className="space-y-4">
          {editingContent ? (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">
                  Edit: {editingContent.page} - {editingContent.section}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-white">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white min-h-[200px]"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="visible"
                      checked={formData.isVisible}
                      onCheckedChange={(checked) => setFormData({...formData, isVisible: checked})}
                    />
                    <Label htmlFor="visible" className="text-white">Visible on Site</Label>
                  </div>

                  <div className="flex space-x-2">
                    <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleCancel}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 text-center">
                <Edit className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white text-lg font-medium mb-2">Select Content to Edit</h3>
                <p className="text-gray-400">Choose a content section from the left to start editing</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManager;
