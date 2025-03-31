
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/components/ui/use-toast';
import { Adapter, AdapterFormData } from '@/types/adapter';

interface AdapterFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  adapter: Adapter | null;
  onSave: (data: AdapterFormData) => void;
}

const AdapterForm = ({ open, onOpenChange, adapter, onSave }: AdapterFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AdapterFormData>({
    name: '',
    description: '',
    apiKey: '',
    url: '',
    username: '',
    password: '',
    token: '',
  });

  useEffect(() => {
    if (adapter) {
      setFormData({
        name: adapter.name,
        description: adapter.description,
        apiKey: adapter.apiKey,
        url: adapter.url || '',
        username: adapter.username || '',
        password: adapter.password || '',
        token: adapter.token || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        apiKey: '',
        url: '',
        username: '',
        password: '',
        token: '',
      });
    }
  }, [adapter, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.apiKey) {
      toast({
        title: "Error",
        description: "Name and API Key are required.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(formData);
      
      toast({
        title: adapter ? "Adapter updated" : "Adapter created",
        description: `${formData.name} has been ${adapter ? 'updated' : 'created'} successfully.`,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${adapter ? 'update' : 'create'} adapter. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{adapter ? 'Edit Adapter' : 'Add New Adapter'}</DialogTitle>
          <DialogDescription>
            {adapter 
              ? 'Update your adapter configuration.' 
              : 'Configure a new adapter to integrate with your issue tracking system.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Adapter Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jira, OpenProject, etc."
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of this adapter"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
              placeholder="Your API key for this service"
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">Service URL</Label>
            <Input
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.atlassian.net"
              disabled={isLoading}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Optional username"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Optional password"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="token">Auth Token</Label>
            <Input
              id="token"
              name="token"
              value={formData.token}
              onChange={handleChange}
              placeholder="Optional authentication token"
              disabled={isLoading}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (adapter ? 'Update Adapter' : 'Create Adapter')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdapterForm;
