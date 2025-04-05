
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Shelf } from '@/types/adapter';
import ShelfList from '@/components/ShelfList';
import AddShelfDialog from '@/components/AddShelfDialog';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const ShelfManager = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddShelfDialogOpen, setIsAddShelfDialogOpen] = useState(false);

  useEffect(() => {
    const fetchShelves = async () => {
      try {
        // This would be an API call to your backend
        // For demo purposes, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockShelves: Shelf[] = [
          {
            id: '1',
            name: 'Fiction',
            description: 'My fiction collection',
            isPublic: true,
            createdAt: new Date().toISOString(),
            ownerId: 'current-user-id',
            category: 'Fiction',
          },
          {
            id: '2',
            name: 'Non-Fiction',
            description: 'My non-fiction books',
            isPublic: false,
            createdAt: new Date().toISOString(),
            ownerId: 'current-user-id',
            category: 'Non-Fiction',
            sharedWith: ['user123', 'user456']
          },
          {
            id: '3',
            name: 'Science Fiction',
            description: 'My sci-fi favorites',
            isPublic: true,
            createdAt: new Date().toISOString(),
            ownerId: 'current-user-id',
            category: 'Science Fiction',
          }
        ];
        
        setShelves(mockShelves);
      } catch (error) {
        console.error('Failed to fetch shelves:', error);
        toast({
          title: "Error",
          description: "Failed to load your bookshelves. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchShelves();
  }, [toast]);

  const handleAddShelf = (newShelf: any) => {
    const shelf: Shelf = {
      ...newShelf,
      id: (shelves.length + 1).toString(),
      createdAt: new Date().toISOString(),
      ownerId: 'current-user-id'
    };
    
    setShelves([...shelves, shelf]);
    
    toast({
      title: "Shelf created",
      description: `"${shelf.name}" shelf has been created.`,
    });
  };

  const handleDeleteShelf = (shelfId: string) => {
    setShelves(shelves.filter(shelf => shelf.id !== shelfId));
    
    toast({
      title: "Shelf deleted",
      description: "The bookshelf has been deleted.",
    });
  };

  const filteredShelves = shelves.filter(shelf => 
    shelf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (shelf.category && shelf.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search shelves..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddShelfDialogOpen(true)}>
          Create New Shelf
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          {filteredShelves.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-gray-500 mb-4">No bookshelves found. Create your first bookshelf!</p>
                <Button onClick={() => setIsAddShelfDialogOpen(true)}>
                  Create Your First Shelf
                </Button>
              </CardContent>
            </Card>
          ) : (
            <ShelfList 
              shelves={filteredShelves}
              onShelfClick={(shelfId) => navigate(`/shelves/${shelfId}`)}
              onEdit={(shelfId) => {
                // Handle edit
                console.log('Edit shelf', shelfId);
              }}
              onDelete={handleDeleteShelf}
            />
          )}
        </>
      )}

      <AddShelfDialog 
        open={isAddShelfDialogOpen} 
        onOpenChange={setIsAddShelfDialogOpen}
        onAddShelf={handleAddShelf}
      />
    </div>
  );
};

export default ShelfManager;
