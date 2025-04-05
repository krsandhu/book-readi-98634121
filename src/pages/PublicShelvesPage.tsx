
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, BookOpen, User } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shelf } from '@/types/adapter';

const PublicShelvesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [publicShelves, setPublicShelves] = useState<Shelf[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublicShelves = async () => {
      try {
        // This would be an API call to your backend
        // For demo purposes, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockShelves: Shelf[] = [
          {
            id: '1',
            name: 'Science Fiction Classics',
            description: 'Classic sci-fi novels that defined the genre',
            isPublic: true,
            createdAt: new Date().toISOString(),
            ownerId: 'user123',
            category: 'Science Fiction',
          },
          {
            id: '2',
            name: 'Fantasy Must-Reads',
            description: 'Essential fantasy books for any fan of the genre',
            isPublic: true,
            createdAt: new Date().toISOString(),
            ownerId: 'user456',
            category: 'Fantasy',
          },
          {
            id: '3',
            name: 'Non-Fiction Favorites',
            description: 'Thought-provoking non-fiction books',
            isPublic: true,
            createdAt: new Date().toISOString(),
            ownerId: 'user789',
            category: 'Non-Fiction',
          }
        ];
        
        setPublicShelves(mockShelves);
      } catch (error) {
        console.error('Failed to fetch public shelves:', error);
        toast({
          title: "Error",
          description: "Failed to load public shelves. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicShelves();
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              Public Bookshelves
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Explore public bookshelves shared by the community
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center mt-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {publicShelves.map((shelf) => (
                <Card key={shelf.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-indigo-50 pb-0">
                    <CardTitle className="flex justify-between items-center">
                      <div className="truncate">{shelf.name}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>32</span> {/* This would be actual book count */}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {shelf.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{shelf.description}</p>
                    )}
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <User className="h-4 w-4 mr-1" />
                      <span>John Doe</span> {/* This would be actual owner name */}
                      {shelf.category && (
                        <>
                          <span className="mx-2">•</span>
                          <Book className="h-4 w-4 mr-1" />
                          <span>{shelf.category}</span>
                        </>
                      )}
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => navigate(`/shelves/${shelf.id}`)}
                    >
                      View Bookshelf
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PublicShelvesPage;
