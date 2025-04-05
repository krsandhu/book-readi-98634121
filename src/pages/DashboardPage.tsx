
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/hooks/useAuth';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardSidebar from '@/components/DashboardSidebar';
import BookList from '@/components/BookList';
import ShelfList from '@/components/ShelfList';
import BookManager from '@/components/BookManager';
import ShelfManager from '@/components/ShelfManager';
import { Book, Shelf } from '@/types/adapter';
import AddBookDialog from '@/components/AddBookDialog';
import AddShelfDialog from '@/components/AddShelfDialog';

const DashboardPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false);
  const [isAddShelfDialogOpen, setIsAddShelfDialogOpen] = useState(false);

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
    // Fetch books and shelves from API
    const fetchData = async () => {
      try {
        // This would be an API call to your backend
        // For demo purposes, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockShelves: Shelf[] = [
          {
            id: '1',
            name: 'Fiction',
            description: 'My fiction collection',
            isPublic: true,
            createdAt: new Date().toISOString(),
            ownerId: user?.id || '',
            category: 'Fiction',
          },
          {
            id: '2',
            name: 'Non-Fiction',
            description: 'My non-fiction books',
            isPublic: false,
            createdAt: new Date().toISOString(),
            ownerId: user?.id || '',
            category: 'Non-Fiction',
            sharedWith: ['user123', 'user456']
          }
        ];
        
        const mockBooks: Book[] = [
          {
            id: '1',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            description: 'A novel about the American Dream set in the Roaring Twenties.',
            coverImageUrl: 'https://example.com/gatsby.jpg',
            isbn: '9780743273565',
            category: 'Fiction',
            shelfId: '1',
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
            shelfId: '1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            addedByUserId: user?.id || '',
            pageCount: 281,
            readStatus: 'in_progress'
          },
          {
            id: '3',
            title: 'Sapiens: A Brief History of Humankind',
            author: 'Yuval Noah Harari',
            description: 'A brief history of human evolution and civilization.',
            coverImageUrl: 'https://example.com/sapiens.jpg',
            isbn: '9780062316097',
            category: 'Non-Fiction',
            shelfId: '2',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            addedByUserId: user?.id || '',
            pageCount: 443,
            readStatus: 'not_started'
          }
        ];
        
        setShelves(mockShelves);
        setBooks(mockBooks);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast({
          title: "Error",
          description: "Failed to load your books and shelves. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, toast]);

  const renderContent = () => {
    // Determine which content to show based on the current route
    if (location.pathname === '/dashboard/books') {
      return (
        <div>
          <h1 className="text-2xl font-bold mb-6">Your Books</h1>
          <BookManager />
        </div>
      );
    } else if (location.pathname === '/dashboard/shelves') {
      return (
        <div>
          <h1 className="text-2xl font-bold mb-6">Your Bookshelves</h1>
          <ShelfManager />
        </div>
      );
    } else if (location.pathname === '/dashboard/settings') {
      return (
        <div>
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
          <Card>
            <CardContent className="p-6">
              <p>Profile and account settings will appear here.</p>
            </CardContent>
          </Card>
        </div>
      );
    } else {
      // Default dashboard home
      return (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Welcome back, {user?.firstName}</h1>
            <p className="text-gray-600">Manage your books and bookshelves</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Your Books</CardTitle>
                <CardDescription>Total books in your collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{books.length}</div>
                <p className="text-sm text-gray-500 mt-2">
                  {books.length === 0 ? "No books added yet" : 
                   books.length === 1 ? "1 book in your collection" :
                   `${books.length} books in your collection`}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Reading Progress</CardTitle>
                <CardDescription>Your current reading status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {books.filter(b => b.readStatus === 'in_progress').length}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Books currently being read
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Not Started</span>
                    <span>{books.filter(b => b.readStatus === 'not_started').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>In Progress</span>
                    <span>{books.filter(b => b.readStatus === 'in_progress').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Completed</span>
                    <span>{books.filter(b => b.readStatus === 'completed').length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Bookshelves</CardTitle>
                <CardDescription>Your organized collections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{shelves.length}</div>
                <p className="text-sm text-gray-500 mt-2">
                  {shelves.length === 0 ? "No shelves created yet" : 
                   shelves.length === 1 ? "1 bookshelf" :
                   `${shelves.length} bookshelves`}
                </p>
                <Button className="mt-4 w-full" onClick={() => setIsAddShelfDialogOpen(true)}>
                  Create New Shelf
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Bookshelves</h2>
              <Button onClick={() => setIsAddShelfDialogOpen(true)}>
                Add Shelf
              </Button>
            </div>
            
            {isLoadingData ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <ShelfList 
                shelves={shelves}
                onShelfClick={(shelfId) => navigate(`/shelves/${shelfId}`)}
                onEdit={(shelfId) => {
                  // Handle edit
                  console.log('Edit shelf', shelfId);
                }}
                onDelete={(shelfId) => {
                  // Handle delete
                  console.log('Delete shelf', shelfId);
                  setShelves(shelves.filter(shelf => shelf.id !== shelfId));
                }}
              />
            )}
          </div>
          
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Recent Books</h2>
              <Button onClick={() => setIsAddBookDialogOpen(true)}>
                Add Book
              </Button>
            </div>
            
            {isLoadingData ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <BookList 
                books={books}
                onBookClick={(bookId) => navigate(`/books/${bookId}`)}
              />
            )}
          </div>
        </>
      );
    }
  };

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
          {renderContent()}
        </main>
      </div>
      
      <AddBookDialog 
        open={isAddBookDialogOpen} 
        onOpenChange={setIsAddBookDialogOpen}
        shelves={shelves}
        onAddBook={(newBook) => {
          // Handle adding new book
          setBooks([...books, { 
            ...newBook, 
            id: (books.length + 1).toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            addedByUserId: user?.id || ''
          }]);
        }}
      />
      
      <AddShelfDialog 
        open={isAddShelfDialogOpen} 
        onOpenChange={setIsAddShelfDialogOpen}
        onAddShelf={(newShelf) => {
          // Handle adding new shelf
          setShelves([...shelves, { 
            ...newShelf, 
            id: (shelves.length + 1).toString(),
            createdAt: new Date().toISOString(),
            ownerId: user?.id || ''
          }]);
        }}
      />
    </div>
  );
};

export default DashboardPage;
