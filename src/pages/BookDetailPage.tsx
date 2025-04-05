
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, BookOpen, Share } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Book, BookFormData, Shelf } from '@/types/adapter';
import BookSharingDialog from '@/components/BookSharingDialog';
import BookEditDialog from '@/components/BookEditDialog';

const BookDetailPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [book, setBook] = useState<Book | null>(null);
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [isLoadingBook, setIsLoadingBook] = useState(true);
  const [isSharingDialogOpen, setIsSharingDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to view book details",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [user, isLoading, navigate, toast]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // This would be an API call to your backend
        // For demo purposes, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock shelves
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
          }
        ];
        
        // Mock book data
        const mockBook: Book = {
          id: bookId || '1',
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
        };
        
        setShelves(mockShelves);
        setBook(mockBook);
      } catch (error) {
        console.error('Failed to fetch book:', error);
        toast({
          title: "Error",
          description: "Failed to load book details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingBook(false);
      }
    };

    if (user && bookId) {
      fetchData();
    }
  }, [user, bookId, toast]);

  const handleUpdateBook = (bookId: string, updatedBookData: BookFormData) => {
    if (!book) return;
    
    // In a real app, this would be an API call to update the book
    // For demo purposes, we'll just update the local state
    const updatedBook: Book = {
      ...book,
      ...updatedBookData,
      updatedAt: new Date().toISOString(),
    };
    
    setBook(updatedBook);
    
    toast({
      title: "Book updated",
      description: "Book details have been successfully updated.",
    });
  };

  const handleDeleteBook = () => {
    // In a real app, this would be an API call to delete the book
    toast({
      title: "Book deleted",
      description: "Book has been removed from your collection.",
    });
    navigate('/dashboard/books');
  };

  const handleReadStatusChange = (status: 'not_started' | 'in_progress' | 'completed') => {
    if (!book) return;
    
    // Update the book's read status
    const updatedBook = {
      ...book,
      readStatus: status,
      updatedAt: new Date().toISOString(),
    };
    
    setBook(updatedBook);
    
    toast({
      title: "Status updated",
      description: `Book marked as "${status.replace('_', ' ')}".`,
    });
  };

  if (isLoading || isLoadingBook) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Book not found</h1>
          <p className="mt-2 text-gray-600">The book you're looking for doesn't exist or you don't have access to it.</p>
          <Button className="mt-4" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">{book.title}</h1>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setIsSharingDialogOpen(true)}>
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" onClick={handleDeleteBook}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="p-4">
                    <div className="aspect-[2/3] bg-gray-200 rounded-md overflow-hidden">
                      {book.coverImageUrl ? (
                        <img 
                          src={book.coverImageUrl} 
                          alt={`Cover of ${book.title}`}
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="mt-4 space-y-2">
                      {book.readStatus === 'not_started' && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleReadStatusChange('in_progress')}
                        >
                          Mark as Reading
                        </Button>
                      )}
                      {book.readStatus === 'in_progress' && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleReadStatusChange('completed')}
                        >
                          Mark as Completed
                        </Button>
                      )}
                      {book.readStatus === 'completed' && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleReadStatusChange('not_started')}
                        >
                          Mark as Not Started
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Book Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-500">Author</h3>
                      <p>{book.author}</p>
                    </div>
                    {book.isbn && (
                      <div>
                        <h3 className="font-medium text-gray-500">ISBN</h3>
                        <p>{book.isbn}</p>
                      </div>
                    )}
                    {book.category && (
                      <div>
                        <h3 className="font-medium text-gray-500">Category</h3>
                        <p>{book.category}</p>
                      </div>
                    )}
                    {book.pageCount && (
                      <div>
                        <h3 className="font-medium text-gray-500">Pages</h3>
                        <p>{book.pageCount}</p>
                      </div>
                    )}
                    {book.readStatus && (
                      <div>
                        <h3 className="font-medium text-gray-500">Status</h3>
                        <p className="capitalize">{book.readStatus.replace('_', ' ')}</p>
                      </div>
                    )}
                    {book.description && (
                      <div>
                        <h3 className="font-medium text-gray-500">Description</h3>
                        <p className="text-gray-700">{book.description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <BookSharingDialog 
        open={isSharingDialogOpen} 
        onOpenChange={setIsSharingDialogOpen}
        bookId={book.id}
        title={book.title}
      />
      
      {isEditDialogOpen && book && (
        <BookEditDialog
          book={book}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          shelves={shelves}
          onSave={handleUpdateBook}
        />
      )}
    </div>
  );
};

export default BookDetailPage;
