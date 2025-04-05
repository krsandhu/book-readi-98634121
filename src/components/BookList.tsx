
import React from 'react';
import { Book as BookIcon, BookOpen } from "lucide-react";
import { Book } from '@/types/adapter';

interface BookListProps {
  books: Book[];
  onBookClick?: (bookId: string) => void;
}

const BookList = ({ books, onBookClick }: BookListProps) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg">
        <BookOpen className="h-12 w-12 mx-auto text-gray-400" />
        <p className="mt-2 text-gray-500">No books found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {books.map((book) => (
        <div 
          key={book.id} 
          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onBookClick && onBookClick(book.id)}
        >
          <div className="aspect-[2/3] bg-gray-200 relative">
            {book.coverImageUrl ? (
              <img 
                src={book.coverImageUrl} 
                alt={`Cover of ${book.title}`}
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookIcon className="h-12 w-12 text-gray-400" />
              </div>
            )}
            {book.readStatus && (
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                book.readStatus === 'completed' ? 'bg-green-100 text-green-800' :
                book.readStatus === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {book.readStatus === 'completed' ? 'Completed' :
                 book.readStatus === 'in_progress' ? 'Reading' :
                 'Not Started'}
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-medium text-sm truncate">{book.title}</h3>
            <p className="text-gray-500 text-xs truncate">{book.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
