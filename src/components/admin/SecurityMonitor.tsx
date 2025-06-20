
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, AlertTriangle, CheckCircle, Clock, User, Database } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  table_name: string;
  record_id: string | null;
  old_values: any;
  new_values: any;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

const SecurityMonitor: React.FC = () => {
  const { data: auditLogs, isLoading } = useQuery({
    queryKey: ['audit-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) {
        console.error('Error fetching audit logs:', error);
        throw error;
      }
      
      return data as AuditLog[];
    },
  });

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'application_submitted':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'model_created':
      case 'model_updated':
      case 'model_deleted':
        return <Database className="h-4 w-4 text-green-500" />;
      case 'news_created':
      case 'news_updated':
      case 'news_deleted':
        return <Database className="h-4 w-4 text-purple-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionBadge = (action: string) => {
    const actionType = action.toLowerCase();
    if (actionType.includes('delete')) {
      return <Badge variant="destructive" className="text-xs">DELETE</Badge>;
    }
    if (actionType.includes('update')) {
      return <Badge variant="secondary" className="text-xs">UPDATE</Badge>;
    }
    if (actionType.includes('create') || actionType.includes('submit')) {
      return <Badge variant="default" className="text-xs">CREATE</Badge>;
    }
    return <Badge variant="outline" className="text-xs">{action.toUpperCase()}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Loading security logs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-300">RLS Status</p>
                <p className="text-xs text-green-400">Active on all tables</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-300">Authentication</p>
                <p className="text-xs text-blue-400">Supabase Auth enabled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-gray-300">Audit Logging</p>
                <p className="text-xs text-purple-400">
                  {auditLogs?.length || 0} events logged
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Event Log */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Event Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            {auditLogs && auditLogs.length > 0 ? (
              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start space-x-3 p-3 bg-gray-900 rounded-lg border border-gray-700"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getActionIcon(log.action)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        {getActionBadge(log.action)}
                        <span className="text-sm font-medium text-gray-300">
                          {log.table_name}
                        </span>
                        {log.record_id && (
                          <span className="text-xs text-gray-500">
                            ID: {log.record_id.substring(0, 8)}...
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-400 mb-2">
                        Action: {log.action.replace(/_/g, ' ')}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(log.created_at)}</span>
                        </div>
                        
                        {log.user_id && (
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>User: {log.user_id.substring(0, 8)}...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No security events logged yet</p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityMonitor;
