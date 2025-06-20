
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Save, Plus, Trash2, Edit, Menu } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NavigationItem {
  id: string;
  label: string;
  url: string;
  isExternal: boolean;
  isVisible: boolean;
  order: number;
}

const NavigationManager = () => {
  const { toast } = useToast();
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([
    { id: '1', label: 'MEN', url: '/men', isExternal: false, isVisible: true, order: 1 },
    { id: '2', label: 'WOMEN', url: '/women', isExternal: false, isVisible: true, order: 2 },
    { id: '3', label: 'NEW FACES', url: '/new-faces', isExternal: false, isVisible: true, order: 3 },
    { id: '4', label: 'TALENT', url: '/talent', isExternal: false, isVisible: true, order: 4 },
    { id: '5', label: 'ABOUT', url: '/about', isExternal: false, isVisible: true, order: 5 },
    { id: '6', label: 'SERVICES', url: '/services', isExternal: false, isVisible: true, order: 6 },
    { id: '7', label: 'CONTACT', url: '/contact', isExternal: false, isVisible: true, order: 7 },
    { id: '8', label: 'APPLY', url: '/apply', isExternal: false, isVisible: true, order: 8 },
  ]);

  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    label: '',
    url: '',
    isExternal: false,
    isVisible: true,
  });

  const resetForm = () => {
    setFormData({
      label: '',
      url: '',
      isExternal: false,
      isVisible: true,
    });
    setEditingItem(null);
    setIsFormOpen(false);
  };

  const handleEdit = (item: NavigationItem) => {
    setEditingItem(item);
    setFormData({
      label: item.label,
      url: item.url,
      isExternal: item.isExternal,
      isVisible: item.isVisible,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      setNavigationItems(items => 
        items.map(item => 
          item.id === editingItem.id 
            ? { ...item, ...formData }
            : item
        )
      );
      toast({
        title: "Success",
        description: "Navigation item updated successfully",
      });
    } else {
      const newItem: NavigationItem = {
        id: Date.now().toString(),
        ...formData,
        order: navigationItems.length + 1,
      };
      setNavigationItems([...navigationItems, newItem]);
      toast({
        title: "Success",
        description: "Navigation item created successfully",
      });
    }

    resetForm();
  };

  const handleDelete = (itemId: string) => {
    if (!confirm('Are you sure you want to delete this navigation item?')) return;
    
    setNavigationItems(items => items.filter(item => item.id !== itemId));
    toast({
      title: "Success",
      description: "Navigation item deleted successfully",
    });
  };

  const moveItem = (itemId: string, direction: 'up' | 'down') => {
    setNavigationItems(items => {
      const sortedItems = [...items].sort((a, b) => a.order - b.order);
      const index = sortedItems.findIndex(item => item.id === itemId);
      
      if (direction === 'up' && index > 0) {
        [sortedItems[index], sortedItems[index - 1]] = [sortedItems[index - 1], sortedItems[index]];
      } else if (direction === 'down' && index < sortedItems.length - 1) {
        [sortedItems[index], sortedItems[index + 1]] = [sortedItems[index + 1], sortedItems[index]];
      }
      
      return sortedItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Navigation Management</h2>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="bg-white text-black hover:bg-gray-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Navigation Item
        </Button>
      </div>

      {isFormOpen && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">
              {editingItem ? 'Edit Navigation Item' : 'Create New Navigation Item'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="label" className="text-white">Label *</Label>
                  <Input
                    id="label"
                    value={formData.label}
                    onChange={(e) => setFormData({...formData, label: e.target.value})}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="e.g., HOME, ABOUT"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-white">URL *</Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="/about or https://external.com"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="external"
                    checked={formData.isExternal}
                    onCheckedChange={(checked) => setFormData({...formData, isExternal: checked})}
                  />
                  <Label htmlFor="external" className="text-white">External Link</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="visible"
                    checked={formData.isVisible}
                    onCheckedChange={(checked) => setFormData({...formData, isVisible: checked})}
                  />
                  <Label htmlFor="visible" className="text-white">Visible</Label>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                  {editingItem ? 'Update Item' : 'Create Item'}
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

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Current Navigation Items</h3>
        {navigationItems
          .sort((a, b) => a.order - b.order)
          .map((item) => (
          <Card key={item.id} className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Menu className="h-4 w-4 text-gray-400" />
                  <div>
                    <h4 className="text-white font-medium">{item.label}</h4>
                    <p className="text-gray-400 text-sm">{item.url}</p>
                  </div>
                  <div className="flex space-x-2">
                    {item.isExternal && (
                      <span className="px-2 py-1 rounded text-xs bg-blue-900 text-blue-300">
                        External
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.isVisible ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                    }`}>
                      {item.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveItem(item.id, 'up')}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    ↑
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveItem(item.id, 'down')}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    ↓
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(item.id)}
                    className="border-red-600 text-red-400 hover:bg-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NavigationManager;
