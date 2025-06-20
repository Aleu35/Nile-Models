import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, FileText, Settings, Upload, Inbox, Image, Navigation, Video, Shield, Database } from 'lucide-react';
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-center">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-400 mb-4">
              You don't have admin permissions to access this area.
            </p>
            <Button onClick={signOut} variant="outline">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Vertical Navigation Sidebar */}
      <Tabs defaultValue="models" orientation="vertical" className="w-64 border-r border-gray-800 p-4 flex-shrink-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white text-center">NILES Admin</h1>
        </div>
        <TabsList className="flex flex-col items-stretch w-full space-y-1">
          <TabsTrigger value="models" asChild>
            <Button variant="ghost" className="w-full justify-start text-base font-normal data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <Users className="h-5 w-5 mr-3" />
              Models
            </Button>
          </TabsTrigger>
          <TabsTrigger value="applications" asChild>
            <Button variant="ghost" className="w-full justify-start text-base font-normal data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <Inbox className="h-5 w-5 mr-3" />
              Applications
            </Button>
          </TabsTrigger>
          <TabsTrigger value="news" asChild>
            <Button variant="ghost" className="w-full justify-start text-base font-normal data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <FileText className="h-5 w-5 mr-3" />
              News & Blog
            </Button>
          </TabsTrigger>
          <TabsTrigger value="content" asChild>
            <Button variant="ghost" className="w-full justify-start text-base font-normal data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <FileText className="h-5 w-5 mr-3" />
              Page Content
            </Button>
          </TabsTrigger>
          <TabsTrigger value="navigation" asChild>
            <Button variant="ghost" className="w-full justify-start text-base font-normal data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <Navigation className="h-5 w-5 mr-3" />
              Navigation
            </Button>
          </TabsTrigger>
          <TabsTrigger value="media" asChild>
            <Button variant="ghost" className="w-full justify-start text-base font-normal data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <Image className="h-5 w-5 mr-3" />
              Media
            </Button>
          </TabsTrigger>
          <TabsTrigger value="settings" asChild>
            <Button variant="ghost" className="w-full justify-start text-base font-normal data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <Settings className="h-5 w-5 mr-3" />
              Site Settings
            </Button>
          </TabsTrigger>
          <TabsTrigger value="security" asChild>
            <Button variant="ghost" className="w-full justify-start text-base font-normal data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <Shield className="h-5 w-5 mr-3" />
              Security
            </Button>
          </TabsTrigger>
          <TabsTrigger value="database" asChild>
            <Button variant="ghost" className="w-full justify-start text-base font-normal data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <Database className="h-5 w-5 mr-3" />
              Database
            </Button>
          </TabsTrigger>
        </TabsList>
        <div className="mt-auto pt-4">
           <Button 
              onClick={signOut}
              variant="outline"
              className="w-full justify-center border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
        </div>
      </Tabs>

      {/* Main Content Area */}
      <div className="flex-grow">
        <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-end">
            <span className="text-gray-400">Welcome, {user.email}</span>
          </div>
        </header>
        
        <main className="p-8">
            <TabsContent value="models" className="mt-0">
              <ModelsManager />
            </TabsContent>
            <TabsContent value="applications" className="mt-0">
              <ApplicationsManager />
            </TabsContent>
            <TabsContent value="news" className="mt-0">
              <NewsManager />
            </TabsContent>
            <TabsContent value="content" className="mt-0">
              <ContentManager />
            </TabsContent>
            <TabsContent value="navigation" className="mt-0">
              <NavigationManager />
            </TabsContent>
            <TabsContent value="media" className="mt-0">
              <MediaManager />
            </TabsContent>
            <TabsContent value="settings" className="mt-0">
              <SiteSettingsManager />
            </TabsContent>
            <TabsContent value="security" className="mt-0">
              <SecurityManager />
            </TabsContent>
            <TabsContent value="database" className="mt-0">
              <DatabaseManager />
            </TabsContent>
        </main>
      </div>
    </div>
  );
};

export default Admin;
