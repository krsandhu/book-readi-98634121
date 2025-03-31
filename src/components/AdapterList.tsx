
import React, { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  MoreVertical, 
  Plus,
  RefreshCw,
  Power,
  PowerOff
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Adapter } from '@/types/adapter';
import AdapterForm from './AdapterForm';

interface AdapterListProps {
  adapters: Adapter[];
  isLoading: boolean;
  onUpdate: (adapter: Adapter) => void;
  onDelete: (adapterId: string) => void;
}

const AdapterList = ({ adapters, isLoading, onUpdate, onDelete }: AdapterListProps) => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentAdapter, setCurrentAdapter] = useState<Adapter | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [adapterToDelete, setAdapterToDelete] = useState<Adapter | null>(null);

  const handleEditAdapter = (adapter: Adapter) => {
    setCurrentAdapter(adapter);
    setIsFormOpen(true);
  };

  const handleDeleteAdapter = (adapter: Adapter) => {
    setAdapterToDelete(adapter);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!adapterToDelete) return;
    
    try {
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onDelete(adapterToDelete.id);
      toast({
        title: "Adapter deleted",
        description: `${adapterToDelete.name} has been deleted.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete adapter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setAdapterToDelete(null);
    }
  };

  const toggleAdapterStatus = async (adapter: Adapter) => {
    try {
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedAdapter = { ...adapter, active: !adapter.active };
      onUpdate(updatedAdapter);
      
      toast({
        title: updatedAdapter.active ? "Adapter activated" : "Adapter deactivated",
        description: `${adapter.name} has been ${updatedAdapter.active ? 'activated' : 'deactivated'}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update adapter status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const syncAdapter = async (adapter: Adapter) => {
    try {
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Sync completed",
        description: `${adapter.name} has been synced successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sync adapter. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-20 rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (adapters.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <p className="mb-4 text-gray-500">No adapters found. Add your first adapter to get started.</p>
          <Button 
            onClick={() => {
              setCurrentAdapter(null);
              setIsFormOpen(true);
            }}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Adapter
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Configured Adapters</h3>
        <Button 
          onClick={() => {
            setCurrentAdapter(null);
            setIsFormOpen(true);
          }}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Adapter
        </Button>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adapters.map((adapter) => (
          <Card key={adapter.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{adapter.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditAdapter(adapter)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => syncAdapter(adapter)}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      <span>Sync Now</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleAdapterStatus(adapter)}>
                      {adapter.active ? (
                        <>
                          <PowerOff className="mr-2 h-4 w-4" />
                          <span>Deactivate</span>
                        </>
                      ) : (
                        <>
                          <Power className="mr-2 h-4 w-4" />
                          <span>Activate</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleDeleteAdapter(adapter)}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center">
                <CardDescription className="flex-1">
                  {adapter.description}
                </CardDescription>
                <Badge variant={adapter.active ? "default" : "outline"} className="ml-2">
                  {adapter.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="text-gray-500 truncate">
                API Key: {adapter.apiKey}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Added on {new Date(adapter.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => syncAdapter(adapter)}
                className="gap-2"
              >
                <RefreshCw className="h-3 w-3" />
                Sync
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <AdapterForm 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        adapter={currentAdapter}
        onSave={(updatedAdapter) => {
          if (currentAdapter) {
            onUpdate({ ...currentAdapter, ...updatedAdapter });
          } else {
            // This would be handled differently in a real app with proper API integration
            const newAdapter: Adapter = {
              id: Math.random().toString(36).substring(2, 9),
              name: updatedAdapter.name,
              description: updatedAdapter.description,
              apiKey: updatedAdapter.apiKey,
              active: true,
              createdAt: new Date().toISOString(),
              url: updatedAdapter.url,
              username: updatedAdapter.username,
              password: updatedAdapter.password,
              token: updatedAdapter.token,
            };
            onUpdate(newAdapter);
          }
        }}
      />
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the {adapterToDelete?.name} adapter and remove all associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdapterList;
