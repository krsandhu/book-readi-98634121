
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Share, Users, Globe, Lock } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Shelf, Book } from '@/types/adapter';
import BookList from '@/components/BookList';
import ShelfSharingDialog from '@/components/ShelfSharingDialog';

const ShelfDetailPage = () => {
  const { shelfId } = useParams<{ shelfId: string }>();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shelf, setShelf] = useState<Shelf | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoadingShelf, setIsLoadingShelf] = useState(true);
  const [isSharingDialogOpen, setIsSharingDialogOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to view shelf details",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [user, isLoading, navigate, toast]);

  useEffect(() => {
    const fetchShelfAndBooks = async () => {
      try {
        // This would be an API call to your backend
        // For demo purposes, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock shelf data
        const mockShelf: Shelf = {
          id: shelfId || '1',
          name: 'Fiction Favorites',
          description: 'My collection of favorite fiction books',
          isPublic: true,
          createdAt: new Date().toISOString(),
          ownerId: user?.id || '',
          category: 'Fiction',
          sharedWith: ['user123', 'user456']
        };
        
        // Mock books data
        const mockBooks: Book[] = [
          {
            id: '1',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            description: 'A novel about the American Dream set in the Roaring Twenties.',
            coverImageUrl: 'https://example.com/gatsby.jpg',
            isbn: '9780743273565',
            category: 'Fiction',
            shelfId: shelfId || '1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            addedByUserId: user?.id || '',
            pageCount: 180,
            readStatus: 'completed'
          },
          {
            id: '2',
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            description: 'A novel about racial inequality and moral growth in the American South.',
            coverImageUrl: 'https://example.com/mockingbird.jpg',
            isbn: '9780061120084',
            category: 'Fiction',
            shelfId: shelfId || '1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            addedByUserId: user?.id || '',
            pageCount: 281,
            readStatus: 'completed'
          }
        ];
        
        setShelf(mockShelf);
        setBooks(mockBooks);
      } catch (error) {
        console.error('Failed to fetch shelf and books:', error);
        toast({
          title: "Error",
          description: "Failed to load shelf details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingShelf(false);
      }
    };

    if (user && shelfId) {
      fetchShelfAndBooks();
    }
  }, [user, shelfId, toast]);

  if (isLoading || isLoadingShelf) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!shelf) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Shelf not found</h1>
          <p className="mt-2 text-gray-600">The shelf you're looking for doesn't exist or you don't have access to it.</p>
          <Button className="mt-4" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const isOwner = shelf.ownerId === user?.id;

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold">{shelf.name}</h1>
                  {shelf.isPublic ? (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Globe className="h-3 w-3 mr-1" />
                      Public
                    </span>
                  ) : (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Lock className="h-3 w-3 mr-1" />
                      Private
                    </span>
                  )}
                  {shelf.sharedWith && shelf.sharedWith.length > 0 && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <Users className="h-3 w-3 mr-1" />
                      Shared
                    </span>
                  )}
                </div>
                {shelf.description && (
                  <p className="text-gray-500 mt-1">{shelf.description}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setIsSharingDialogOpen(true)}>
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                {isOwner && (
                  <>
                    <Button variant="outline">
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>

            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Books in this Shelf</CardTitle>
                <Button>
                  Add Book
                </Button>
              </CardHeader>
              <CardContent>
                <BookList 
                  books={books}
                  onBookClick={(bookId) => navigate(`/books/${bookId}`)}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      
      <ShelfSharingDialog 
        open={isSharingDialogOpen} 
        onOpenChange={setIsSharingDialogOpen}
        shelfId={shelf.id}
        name={shelf.name}
        isPublic={shelf.isPublic}
        isOwner={isOwner}
        currentSharedWith={shelf.sharedWith || []}
      />
    </div>
  );
};

export default ShelfDetailPage;
