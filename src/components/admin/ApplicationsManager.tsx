
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Eye, CheckCircle, XCircle, Clock, Mail, MapPin, Ruler } from 'lucide-react';

interface Application {
  id: string;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  height?: number;
  measurements?: string;
  additional_info?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

const ApplicationsManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Application[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'approved' | 'rejected' }) => {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast({
        title: "Status Updated",
        description: "Application status has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500 text-white">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 text-white">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
    }
  };

  const getStatusCount = (status: string) => {
    return applications?.filter(app => app.status === status).length || 0;
  };

  const filterApplications = (status?: string) => {
    if (!applications) return [];
    if (!status) return applications;
    return applications.filter(app => app.status === status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const parseAdditionalInfo = (infoString?: string) => {
    try {
      return infoString ? JSON.parse(infoString) : {};
    } catch {
      return {};
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-white">{getStatusCount('pending')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-400">Approved</p>
                <p className="text-2xl font-bold text-white">{getStatusCount('approved')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-400">Rejected</p>
                <p className="text-2xl font-bold text-white">{getStatusCount('rejected')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-400">Total</p>
                <p className="text-2xl font-bold text-white">{applications?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-gray-900 border-gray-800">
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ApplicationsList 
            applications={filterApplications()} 
            onView={setSelectedApplication}
            onUpdateStatus={updateStatusMutation.mutate}
          />
        </TabsContent>
        
        <TabsContent value="pending">
          <ApplicationsList 
            applications={filterApplications('pending')} 
            onView={setSelectedApplication}
            onUpdateStatus={updateStatusMutation.mutate}
          />
        </TabsContent>
        
        <TabsContent value="approved">
          <ApplicationsList 
            applications={filterApplications('approved')} 
            onView={setSelectedApplication}
            onUpdateStatus={updateStatusMutation.mutate}
          />
        </TabsContent>
        
        <TabsContent value="rejected">
          <ApplicationsList 
            applications={filterApplications('rejected')} 
            onView={setSelectedApplication}
            onUpdateStatus={updateStatusMutation.mutate}
          />
        </TabsContent>
      </Tabs>

      {selectedApplication && (
        <ApplicationModal 
          application={selectedApplication} 
          onClose={() => setSelectedApplication(null)}
          onUpdateStatus={updateStatusMutation.mutate}
        />
      )}
    </div>
  );
};

const ApplicationsList = ({ 
  applications, 
  onView, 
  onUpdateStatus 
}: {
  applications: Application[];
  onView: (app: Application) => void;
  onUpdateStatus: (data: { id: string; status: 'approved' | 'rejected' }) => void;
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500 text-white">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 text-white">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (applications.length === 0) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-8 text-center">
          <p className="text-gray-400">No applications found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id} className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h3 className="text-lg font-semibold text-white">{application.name}</h3>
                  {getStatusBadge(application.status)}
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{application.email}</span>
                  </div>
                  {application.age && (
                    <span>Age: {application.age}</span>
                  )}
                  {application.height && (
                    <div className="flex items-center space-x-1">
                      <Ruler className="h-4 w-4" />
                      <span>{application.height}"</span>
                    </div>
                  )}
                  <span>Applied: {formatDate(application.created_at)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(application)}
                  className="border-gray-600 text-gray-300"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                {application.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => onUpdateStatus({ id: application.id, status: 'approved' })}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onUpdateStatus({ id: application.id, status: 'rejected' })}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ApplicationModal = ({ 
  application, 
  onClose, 
  onUpdateStatus 
}: {
  application: Application;
  onClose: () => void;
  onUpdateStatus: (data: { id: string; status: 'approved' | 'rejected' }) => void;
}) => {
  const additionalInfo = parseAdditionalInfo(application.additional_info);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500 text-white">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 text-white">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="bg-gray-900 border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-xl">{application.name}</CardTitle>
              <p className="text-gray-400">Application Details</p>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusBadge(application.status)}
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  <span className="text-gray-400">Email:</span> {application.email}
                </p>
                {application.phone && (
                  <p className="text-gray-300">
                    <span className="text-gray-400">Phone:</span> {application.phone}
                  </p>
                )}
                {application.age && (
                  <p className="text-gray-300">
                    <span className="text-gray-400">Age:</span> {application.age}
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Physical Details</h4>
              <div className="space-y-2 text-sm">
                {application.height && (
                  <p className="text-gray-300">
                    <span className="text-gray-400">Height:</span> {application.height}"
                  </p>
                )}
                {application.measurements && (
                  <p className="text-gray-300">
                    <span className="text-gray-400">Measurements:</span> {application.measurements}
                  </p>
                )}
                {additionalInfo.shoe_size && (
                  <p className="text-gray-300">
                    <span className="text-gray-400">Shoe Size:</span> {additionalInfo.shoe_size}
                  </p>
                )}
                {additionalInfo.hair_color && (
                  <p className="text-gray-300">
                    <span className="text-gray-400">Hair Color:</span> {additionalInfo.hair_color}
                  </p>
                )}
                {additionalInfo.eye_color && (
                  <p className="text-gray-300">
                    <span className="text-gray-400">Eye Color:</span> {additionalInfo.eye_color}
                  </p>
                )}
              </div>
            </div>
          </div>

          {additionalInfo.social_media && (
            <div>
              <h4 className="font-semibold text-white mb-2">Social Media</h4>
              <div className="space-y-2 text-sm">
                {additionalInfo.social_media.instagram && (
                  <p className="text-gray-300">
                    <span className="text-gray-400">Instagram:</span> {additionalInfo.social_media.instagram}
                  </p>
                )}
                {additionalInfo.social_media.twitter && (
                  <p className="text-gray-300">
                    <span className="text-gray-400">Twitter:</span> {additionalInfo.social_media.twitter}
                  </p>
                )}
                {additionalInfo.social_media.tiktok && (
                  <p className="text-gray-300">
                    <span className="text-gray-400">TikTok:</span> {additionalInfo.social_media.tiktok}
                  </p>
                )}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-white mb-2">Application Info</h4>
            <p className="text-gray-300 text-sm">
              <span className="text-gray-400">Submitted:</span> {formatDate(application.created_at)}
            </p>
          </div>

          {application.status === 'pending' && (
            <div className="flex space-x-4 pt-4 border-t border-gray-700">
              <Button
                onClick={() => {
                  onUpdateStatus({ id: application.id, status: 'approved' });
                  onClose();
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Application
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onUpdateStatus({ id: application.id, status: 'rejected' });
                  onClose();
                }}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Application
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

function parseAdditionalInfo(infoString?: string) {
  try {
    return infoString ? JSON.parse(infoString) : {};
  } catch {
    return {};
  }
}

export default ApplicationsManager;
