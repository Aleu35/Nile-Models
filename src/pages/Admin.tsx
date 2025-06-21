import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
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
            <p className="text-slate-400 mb-4">
              You don't have admin permissions to access this area.
            </p>
            <Button onClick={signOut} variant="outline" className="border-slate-700 hover:bg-slate-800">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const NavButton = ({ value, children }: { value: string; children: React.ReactNode }) => (
    <TabsTrigger value={value} asChild>
      <Button
        variant="ghost"
        className="w-full justify-start text-base font-normal text-slate-400 hover:bg-slate-800 hover:text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
      >
        <div className="flex items-center truncate">
          {children}
        </div>
      </Button>
    </TabsTrigger>
  );

  return (
    <Tabs defaultValue="models" orientation="vertical" className="min-h-screen">
      <div className="flex min-h-screen bg-slate-950 text-slate-100">
        <aside className="w-64 border-r border-slate-800 bg-slate-900 p-4 flex-shrink-0 flex flex-col">
          <div className="mb-8 px-2">
            <h1 className="text-2xl font-bold text-white">NILES Admin</h1>
          </div>
          <TabsList className="flex flex-col items-stretch w-full space-y-1">
            <NavButton value="models"><Users className="h-5 w-5 mr-3 flex-shrink-0" /> Models</NavButton>
            <NavButton value="applications"><Inbox className="h-5 w-5 mr-3 flex-shrink-0" /> Applications</NavButton>
            <NavButton value="news"><FileText className="h-5 w-5 mr-3 flex-shrink-0" /> News & Blog</NavButton>
            <NavButton value="content"><FileText className="h-5 w-5 mr-3 flex-shrink-0" /> Page Content</NavButton>
            <NavButton value="navigation"><Navigation className="h-5 w-5 mr-3 flex-shrink-0" /> Navigation</NavButton>
            <NavButton value="media"><Image className="h-5 w-5 mr-3 flex-shrink-0" /> Media</NavButton>
            <NavButton value="settings"><Settings className="h-5 w-5 mr-3 flex-shrink-0" /> Site Settings</NavButton>
            <NavButton value="security"><Shield className="h-5 w-5 mr-3 flex-shrink-0" /> Security</NavButton>
            <NavButton value="database"><Database className="h-5 w-5 mr-3 flex-shrink-0" /> Database</NavButton>
          </TabsList>
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
            <TabsContent value="models"><Card className="bg-slate-900 border-slate-800"><CardHeader><CardTitle>Models Management</CardTitle><CardDescription>Add, edit, and manage model profiles.</CardDescription></CardHeader><CardContent><ModelsManager /></CardContent></Card></TabsContent>
            <TabsContent value="applications"><Card className="bg-slate-900 border-slate-800"><CardHeader><CardTitle>Applications</CardTitle><CardDescription>Review new model applications.</CardDescription></CardHeader><CardContent><ApplicationsManager /></CardContent></Card></TabsContent>
            <TabsContent value="news"><Card className="bg-slate-900 border-slate-800"><CardHeader><CardTitle>News & Blog</CardTitle><CardDescription>Create and manage news articles and blog posts.</CardDescription></CardHeader><CardContent><NewsManager /></CardContent></Card></TabsContent>
            <TabsContent value="content"><Card className="bg-slate-900 border-slate-800"><CardHeader><CardTitle>Page Content</CardTitle><CardDescription>Edit content on static pages like "About" or "Contact".</CardDescription></CardHeader><CardContent><ContentManager /></CardContent></Card></TabsContent>
            <TabsContent value="navigation"><Card className="bg-slate-900 border-slate-800"><CardHeader><CardTitle>Navigation</CardTitle><CardDescription>Manage your website's navigation menus.</CardDescription></CardHeader><CardContent><NavigationManager /></CardContent></Card></TabsContent>
            <TabsContent value="media"><Card className="bg-slate-900 border-slate-800"><CardHeader><CardTitle>Media Library</CardTitle><CardDescription>Upload and manage all site images and videos.</CardDescription></CardHeader><CardContent><MediaManager /></CardContent></Card></TabsContent>
            <TabsContent value="settings"><Card className="bg-slate-900 border-slate-800"><CardHeader><CardTitle>Site Settings</CardTitle><CardDescription>Manage global site settings and configurations.</CardDescription></CardHeader><CardContent><SiteSettingsManager /></CardContent></Card></TabsContent>
            <TabsContent value="security"><Card className="bg-slate-900 border-slate-800"><CardHeader><CardTitle>Security</CardTitle><CardDescription>Monitor site security and manage admin access.</CardDescription></CardHeader><CardContent><SecurityManager /></CardContent></Card></TabsContent>
            <TabsContent value="database"><Card className="bg-slate-900 border-slate-800"><CardHeader><CardTitle>Database Management</CardTitle><CardDescription>View and manage raw database tables.</CardDescription></CardHeader><CardContent><DatabaseManager /></CardContent></Card></TabsContent>
          </main>
        </div>
      </div>
    </Tabs>
  );
};

export default Admin;
