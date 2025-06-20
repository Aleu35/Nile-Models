
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Database, Lock, Eye, AlertTriangle, CheckCircle, Users } from 'lucide-react';
import SecurityMonitor from './SecurityMonitor';

const SecurityManager: React.FC = () => {
  const securityFeatures = [
    {
      name: 'Row Level Security (RLS)',
      status: 'Active',
      description: 'Database-level access control protecting all tables',
      icon: <Database className="h-5 w-5 text-green-500" />,
      details: 'All main tables have RLS policies enforcing admin-only write access'
    },
    {
      name: 'Authentication',
      status: 'Active',
      description: 'Supabase Auth with email/password authentication',
      icon: <Lock className="h-5 w-5 text-green-500" />,
      details: 'Secure user authentication with JWT tokens'
    },
    {
      name: 'Input Validation',
      status: 'Active',
      description: 'Client and server-side validation with Zod schemas',
      icon: <Shield className="h-5 w-5 text-green-500" />,
      details: 'Comprehensive validation and sanitization of all user inputs'
    },
    {
      name: 'Rate Limiting',
      status: 'Active',
      description: 'Application submission rate limiting',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      details: '5 applications per 15 minutes per IP address'
    },
    {
      name: 'CSRF Protection',
      status: 'Active',
      description: 'Cross-Site Request Forgery protection',
      icon: <Shield className="h-5 w-5 text-green-500" />,
      details: 'Token-based CSRF protection for form submissions'
    },
    {
      name: 'Audit Logging',
      status: 'Active',
      description: 'Comprehensive logging of all admin actions',
      icon: <Eye className="h-5 w-5 text-green-500" />,
      details: 'All database changes and user actions are logged'
    }
  ];

  const accessPolicies = [
    {
      table: 'models',
      read: 'Public (anyone can view)',
      write: 'Admin only',
      notes: 'Public can view all models, only admins can create/edit'
    },
    {
      table: 'news_articles',
      read: 'Public (published only), Admin (all)',
      write: 'Admin only',
      notes: 'Public sees published articles, admins see all'
    },
    {
      table: 'applications',
      read: 'Admin only',
      write: 'Public (insert only), Admin (full)',
      notes: 'Anyone can submit, only admins can view/manage'
    },
    {
      table: 'site_settings',
      read: 'Public (read only)',
      write: 'Admin only',
      notes: 'Public can read settings, only admins can modify'
    },
    {
      table: 'user_roles',
      read: 'Admin only',
      write: 'Admin only',
      notes: 'Role management restricted to administrators'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Security Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-gray-900 border-gray-700">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-black">
                Overview
              </TabsTrigger>
              <TabsTrigger value="policies" className="data-[state=active]:bg-white data-[state=active]:text-black">
                Access Policies
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="data-[state=active]:bg-white data-[state=active]:text-black">
                Security Monitoring
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4">
                {securityFeatures.map((feature, index) => (
                  <Card key={index} className="bg-gray-900 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {feature.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-white font-medium">{feature.name}</h3>
                              <Badge 
                                variant={feature.status === 'Active' ? 'default' : 'secondary'}
                                className={feature.status === 'Active' ? 'bg-green-600' : ''}
                              >
                                {feature.status}
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">{feature.description}</p>
                            <p className="text-gray-500 text-xs">{feature.details}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="policies" className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3 text-gray-300 font-medium">Table</th>
                      <th className="text-left p-3 text-gray-300 font-medium">Read Access</th>
                      <th className="text-left p-3 text-gray-300 font-medium">Write Access</th>
                      <th className="text-left p-3 text-gray-300 font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accessPolicies.map((policy, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-gray-900">
                        <td className="p-3">
                          <code className="text-blue-400 bg-gray-800 px-2 py-1 rounded text-sm">
                            {policy.table}
                          </code>
                        </td>
                        <td className="p-3 text-gray-300 text-sm">{policy.read}</td>
                        <td className="p-3 text-gray-300 text-sm">{policy.write}</td>
                        <td className="p-3 text-gray-400 text-xs">{policy.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="monitoring">
              <SecurityMonitor />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityManager;
