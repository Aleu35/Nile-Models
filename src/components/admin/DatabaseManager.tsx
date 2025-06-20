
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Database, Download, Upload, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DatabaseStats {
  totalModels: number;
  totalApplications: number;
  totalArticles: number;
  totalUsers: number;
  databaseSize: string;
  lastBackup: string;
}

const DatabaseManager = () => {
  const { toast } = useToast();
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState('');

  const [stats] = useState<DatabaseStats>({
    totalModels: 45,
    totalApplications: 127,
    totalArticles: 12,
    totalUsers: 8,
    databaseSize: '2.3 MB',
    lastBackup: '2024-01-15 14:30:00'
  });

  const handleBackup = async () => {
    setIsBackingUp(true);
    
    // Simulate backup process
    setTimeout(() => {
      setIsBackingUp(false);
      toast({
        title: "Success",
        description: "Database backup completed successfully",
      });
    }, 3000);
  };

  const handleRestore = async () => {
    if (!confirm('Are you sure you want to restore the database? This will overwrite all current data.')) {
      return;
    }

    setIsRestoring(true);
    
    // Simulate restore process
    setTimeout(() => {
      setIsRestoring(false);
      toast({
        title: "Success",
        description: "Database restored successfully",
      });
    }, 5000);
  };

  const executeQuery = () => {
    if (!sqlQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a SQL query",
        variant: "destructive",
      });
      return;
    }

    // Simulate query execution
    setQueryResult(`Query executed successfully at ${new Date().toLocaleTimeString()}\nRows affected: 1`);
    
    toast({
      title: "Success",
      description: "SQL query executed successfully",
    });
  };

  const clearQuery = () => {
    setSqlQuery('');
    setQueryResult('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Database Management</h2>
      </div>

      {/* Database Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalModels}</p>
                <p className="text-gray-400 text-sm">Models</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalApplications}</p>
                <p className="text-gray-400 text-sm">Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalArticles}</p>
                <p className="text-gray-400 text-sm">Articles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                <p className="text-gray-400 text-sm">Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backup & Restore */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Backup & Restore</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Database Size</Label>
              <p className="text-gray-400">{stats.databaseSize}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Last Backup</Label>
              <p className="text-gray-400">{stats.lastBackup}</p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleBackup}
                disabled={isBackingUp}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isBackingUp ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Creating Backup...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Create Backup
                  </>
                )}
              </Button>

              <Button
                onClick={handleRestore}
                disabled={isRestoring}
                variant="outline"
                className="w-full border-yellow-600 text-yellow-400 hover:bg-yellow-900"
              >
                {isRestoring ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Restoring...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Restore Database
                  </>
                )}
              </Button>
            </div>

            <div className="p-3 bg-yellow-900/20 border border-yellow-600 rounded">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div className="text-sm">
                  <p className="text-yellow-400 font-medium">Warning</p>
                  <p className="text-yellow-300">
                    Database restore will overwrite all current data. Make sure to create a backup first.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SQL Query Tool */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">SQL Query Tool</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">SQL Query</Label>
              <Textarea
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                placeholder="SELECT * FROM models WHERE category = 'men';"
                className="bg-gray-800 border-gray-700 text-white font-mono text-sm min-h-[120px]"
              />
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={executeQuery}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Execute Query
              </Button>
              <Button
                onClick={clearQuery}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Clear
              </Button>
            </div>

            {queryResult && (
              <div className="space-y-2">
                <Label className="text-white">Query Result</Label>
                <pre className="bg-gray-800 border border-gray-700 rounded p-3 text-green-400 text-sm font-mono whitespace-pre-wrap">
                  {queryResult}
                </pre>
              </div>
            )}

            <div className="p-3 bg-red-900/20 border border-red-600 rounded">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                <div className="text-sm">
                  <p className="text-red-400 font-medium">Caution</p>
                  <p className="text-red-300">
                    Be extremely careful with UPDATE and DELETE queries. Always test on a backup first.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatabaseManager;
