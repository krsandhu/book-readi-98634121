
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Category } from '@/types/adapter';
import { useToast } from "@/components/ui/use-toast";

const CategoryList = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // This would be an API call to your backend
        // For demo purposes, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockCategories: Category[] = [
          {
            id: '1',
            name: 'Fiction',
            description: 'Novels and stories that are imagined',
            createdByUserId: 'system',
          },
          {
            id: '2',
            name: 'Non-Fiction',
            description: 'Factual books based on real events and information',
            createdByUserId: 'system',
          },
          {
            id: '3',
            name: 'Science Fiction',
            description: 'Speculative fiction dealing with futuristic concepts',
            createdByUserId: 'system',
          },
          {
            id: '4',
            name: 'Fantasy',
            description: 'Fiction involving magical or supernatural elements',
            createdByUserId: 'system',
          },
          {
            id: '5',
            name: 'Biography',
            description: 'Books about real people written by someone else',
            createdByUserId: 'system',
          },
          {
            id: '6',
            name: 'Self-Help',
            description: 'Books aimed at personal improvement and development',
            createdByUserId: 'system',
          },
        ];
        
        setCategories(mockCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [toast]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {category.description && (
                  <p className="text-gray-600 mb-4">{category.description}</p>
                )}
                <Button variant="outline" className="w-full">
                  Browse Books
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
