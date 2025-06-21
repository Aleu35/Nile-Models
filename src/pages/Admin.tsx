import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Users, FileText, Settings, Inbox, Image, Navigation, Shield, Database } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ModelsManager from '@/components/admin/ModelsManager';
import NewsManager from '@/components/admin/NewsManager';
import SiteSettingsManager from '@/components/admin/SiteSettingsManager';
import ApplicationsManager from '@/components/admin/ApplicationsManager';
import NavigationManager from '@/components/admin/NavigationManager';
import MediaManager from '@/components/admin/MediaManager';
import ContentManager from '@/components/admin/ContentManager';
import SecurityManager from '@/components/admin/SecurityManager';
import DatabaseManager from '@/components/admin/DatabaseManager';

// A simplified layout to debug the CSS loading issue.
const Admin = () => {
  const { user, isAdmin, signOut, isLoading } = useAuth();
  const [activeTab, setActiveTab] = React.useState('models');

  if (isLoading) {
    return <div className="bg-gray-900 text-white min-h-screen p-8">Loading Admin Panel...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="bg-gray-900 text-white min-h-screen p-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">You do not have permission to view this page.</p>
            <Button onClick={signOut} variant="outline">Sign Out</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'models': return <ModelsManager />;
      case 'applications': return <ApplicationsManager />;
      case 'news': return <NewsManager />;
      case 'content': return <ContentManager />;
      case 'navigation': return <NavigationManager />;
      case 'media': return <MediaManager />;
      case 'settings': return <SiteSettingsManager />;
      case 'security': return <SecurityManager />;
      case 'database': return <DatabaseManager />;
      default: return <ModelsManager />;
    }
  };
  
  const navItems = [
    { key: 'models', label: 'Models', icon: Users },
    { key: 'applications', label: 'Applications', icon: Inbox },
    { key: 'news', label: 'News & Blog', icon: FileText },
    { key: 'content', label: 'Page Content', icon: FileText },
    { key: 'navigation', label: 'Navigation', icon: Navigation },
    { key: 'media', label: 'Media', icon: Image },
    { key: 'settings', label: 'Site Settings', icon: Settings },
    { key: 'security', label: 'Security', icon: Shield },
    { key: 'database', label: 'Database', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-xl font-bold">NILES Admin</h1>
        <div>
          <span className="mr-4 text-sm text-gray-400">Welcome, {user.email}</span>
          <Button onClick={signOut} variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>
      
      <div className="p-4 md:p-8">
        <div className="flex flex-wrap gap-2 border-b border-gray-700 pb-4 mb-4">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <Button key={item.key} onClick={() => setActiveTab(item.key)} variant={activeTab === item.key ? 'secondary' : 'ghost'}>
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </div>

        <div className="mt-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
