import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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

const Admin = () => {
  const { user, isAdmin, signOut, isLoading } = useAuth();
  const [activeTab, setActiveTab] = React.useState('models');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading Admin Panel...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-center">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-slate-400 mb-4">You don't have permission to view this page.</p>
            <Button onClick={signOut} variant="outline" className="border-slate-700 hover:bg-slate-800">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const navItems = [
    { key: 'models', label: 'Models', icon: Users, description: "Add, edit, and manage model profiles." },
    { key: 'applications', label: 'Applications', icon: Inbox, description: "Review new model applications." },
    { key: 'news', label: 'News & Blog', icon: FileText, description: "Create and manage news articles." },
    { key: 'content', label: 'Page Content', icon: FileText, description: "Edit content on static pages." },
    { key: 'navigation', label: 'Navigation', icon: Navigation, description: "Manage your website's menus." },
    { key: 'media', label: 'Media', icon: Image, description: "Upload and manage all site assets." },
    { key: 'settings', label: 'Site Settings', icon: Settings, description: "Manage global site configurations." },
    { key: 'security', label: 'Security', icon: Shield, description: "Monitor site security and access." },
    { key: 'database', label: 'Database', icon: Database, description: "View and manage raw database tables." },
  ];

  const renderContent = () => {
    const activeItem = navItems.find(item => item.key === activeTab) || navItems[0];
    let componentToRender;

    switch(activeTab) {
      case 'models': componentToRender = <ModelsManager />; break;
      case 'applications': componentToRender = <ApplicationsManager />; break;
      case 'news': componentToRender = <NewsManager />; break;
      case 'content': componentToRender = <ContentManager />; break;
      case 'navigation': componentToRender = <NavigationManager />; break;
      case 'media': componentToRender = <MediaManager />; break;
      case 'settings': componentToRender = <SiteSettingsManager />; break;
      case 'security': componentToRender = <SecurityManager />; break;
      case 'database': componentToRender = <DatabaseManager />; break;
      default: componentToRender = <ModelsManager />;
    }
    
    return (
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-xl">{activeItem.label}</CardTitle>
          <CardDescription>{activeItem.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {componentToRender}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="w-64 border-r border-slate-800 bg-slate-900 p-4 flex-shrink-0 flex flex-col">
        <div className="mb-8 px-2">
          <h1 className="text-2xl font-bold text-white">NILES Admin</h1>
        </div>
        <nav className="flex flex-col items-stretch w-full space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <Button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                variant="ghost"
                className={`w-full justify-start text-base font-normal transition-colors duration-200 ${
                  activeTab === item.key
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Button>
            );
          })}
        </nav>
        <div className="mt-auto pt-4">
          <Button
            onClick={signOut}
            variant="outline"
            className="w-full justify-center border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      <div className="flex-grow">
        <header className="bg-slate-900/60 backdrop-blur-sm border-b border-slate-800 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-end">
            <span className="text-slate-400">Welcome, {user.email}</span>
          </div>
        </header>

        <main className="p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
