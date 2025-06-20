
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Database, Globe, Shield } from 'lucide-react';

const Status = () => {
  const services = [
    { name: 'Website', status: 'operational', icon: Globe },
    { name: 'Database', status: 'operational', icon: Database },
    { name: 'Authentication', status: 'operational', icon: Shield },
    { name: 'File Uploads', status: 'operational', icon: CheckCircle },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-500';
      case 'degraded': return 'text-yellow-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'operational' ? CheckCircle : AlertCircle;
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-light mb-8 tracking-wider">System Status</h1>
        
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              All Systems Operational
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">All services are running normally.</p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const StatusIcon = getStatusIcon(service.status);
            const ServiceIcon = service.icon;
            
            return (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <ServiceIcon className="h-5 w-5 mr-2" />
                      {service.name}
                    </div>
                    <div className={`flex items-center ${getStatusColor(service.status)}`}>
                      <StatusIcon className="h-4 w-4 mr-1" />
                      {service.status}
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Status;
