
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Book, Shelf } from '@/types/adapter';
import BookList from '@/components/BookList';
import AddBookDialog from '@/components/AddBookDialog';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface BookManagerProps {
  shelfId?: string;
}

const BookManager = ({ shelfId }: BookManagerProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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
            addedByUserId: 'current-user-id',
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
            addedByUserId: 'current-user-id',
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
            addedByUserId: 'current-user-id',
            pageCount: 443,
            readStatus: 'not_started'
          }
        ];
        
        setShelves(mockShelves);
        
        // If a shelfId is provided, filter books by that shelf
        if (shelfId) {
          setBooks(mockBooks.filter(book => book.shelfId === shelfId));
        } else {
          setBooks(mockBooks);
        }
        
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast({
          title: "Error",
          description: "Failed to load your books. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast, shelfId]);

  const handleAddBook = (newBook: any) => {
    const book: Book = {
      ...newBook,
      id: (books.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      addedByUserId: 'current-user-id',
      readStatus: 'not_started'
    };
    
    setBooks([...books, book]);
    
    toast({
      title: "Book added",
      description: `"${book.title}" has been added to your collection.`,
    });
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search books..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddBookDialogOpen(true)}>
          Add Book
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          {filteredBooks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-gray-500 mb-4">No books found. Add some books to your collection!</p>
                <Button onClick={() => setIsAddBookDialogOpen(true)}>
                  Add Your First Book
                </Button>
              </CardContent>
            </Card>
          ) : (
            <BookList 
              books={filteredBooks}
              onBookClick={(bookId) => navigate(`/books/${bookId}`)}
            />
          )}
        </>
      )}

      <AddBookDialog 
        open={isAddBookDialogOpen} 
        onOpenChange={setIsAddBookDialogOpen}
        shelves={shelves}
        onAddBook={handleAddBook}
      />
    </div>
  );
};

export default BookManager;
