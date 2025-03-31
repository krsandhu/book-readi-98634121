
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/hooks/useAuth';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardSidebar from '@/components/DashboardSidebar';
import AdapterList from '@/components/AdapterList';
import { Adapter } from '@/types/adapter';

const DashboardPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adapters, setAdapters] = useState<Adapter[]>([]);
  const [isLoadingAdapters, setIsLoadingAdapters] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to access the dashboard",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [user, isLoading, navigate, toast]);

  useEffect(() => {
    // Fetch adapters from API
    const fetchAdapters = async () => {
      try {
        // This would be an API call to your backend
        // For demo purposes, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockAdapters: Adapter[] = [
          {
            id: '1',
            name: 'Jira',
            description: 'Connect to Jira issue tracking system',
            apiKey: 'jira_api_123',
            active: true,
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'OpenProject',
            description: 'Connect to OpenProject issue tracking system',
            apiKey: 'open_project_456',
            active: true,
            createdAt: new Date().toISOString(),
          }
        ];
        
        setAdapters(mockAdapters);
      } catch (error) {
        console.error('Failed to fetch adapters:', error);
        toast({
          title: "Error",
          description: "Failed to load adapters. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingAdapters(false);
      }
    };

    if (user) {
      fetchAdapters();
    }
  }, [user, toast]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Welcome back, {user?.firstName}</h1>
            <p className="text-gray-600">Manage your issue tracking integrations</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Active Adapters</CardTitle>
                <CardDescription>Your current connected issue trackers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{adapters.filter(a => a.active).length}</div>
                <p className="text-sm text-gray-500 mt-2">
                  {adapters.filter(a => a.active).length === 0 ? "No active adapters" : 
                   adapters.filter(a => a.active).length === 1 ? "1 adapter is currently active" :
                   `${adapters.filter(a => a.active).length} adapters are currently active`}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Issues Tracked</CardTitle>
                <CardDescription>Total issues across all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">247</div>
                <p className="text-sm text-gray-500 mt-2">
                  Last synced: {new Date().toLocaleTimeString()}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Your current plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-md font-semibold text-indigo-600">Premium</div>
                <p className="text-sm text-gray-500 mt-2">
                  One-time payment
                </p>
                <Button className="mt-4 w-full" variant="outline">
                  Manage Subscription
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Your Adapters</h2>
            <AdapterList 
              adapters={adapters} 
              isLoading={isLoadingAdapters} 
              onUpdate={(updatedAdapter) => {
                setAdapters(adapters.map(adapter => 
                  adapter.id === updatedAdapter.id ? updatedAdapter : adapter
                ));
              }}
              onDelete={(adapterId) => {
                setAdapters(adapters.filter(adapter => adapter.id !== adapterId));
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
