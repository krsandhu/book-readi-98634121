
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Pencil, Trash2, Globe, Users, Lock } from "lucide-react";
import { Shelf } from '@/types/adapter';

interface ShelfListProps {
  shelves: Shelf[];
  onShelfClick?: (shelfId: string) => void;
  onEdit?: (shelfId: string) => void;
  onDelete?: (shelfId: string) => void;
}

const ShelfList = ({ shelves, onShelfClick, onEdit, onDelete }: ShelfListProps) => {
  if (shelves.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg">
        <BookOpen className="h-12 w-12 mx-auto text-gray-400" />
        <p className="mt-2 text-gray-500">No bookshelves found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {shelves.map((shelf) => (
        <Card key={shelf.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="bg-indigo-50 pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="truncate cursor-pointer" onClick={() => onShelfClick && onShelfClick(shelf.id)}>
                {shelf.name}
              </div>
              <div className="flex items-center space-x-1">
                {shelf.isPublic ? (
                  <Globe className="h-4 w-4 text-green-600" title="Public Shelf" />
                ) : (
                  <Lock className="h-4 w-4 text-gray-600" title="Private Shelf" />
                )}
                {shelf.sharedWith && shelf.sharedWith.length > 0 && (
                  <Users className="h-4 w-4 text-indigo-600" title="Shared with others" />
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {shelf.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{shelf.description}</p>
            )}
            <div className="flex space-x-2 justify-between">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => onShelfClick && onShelfClick(shelf.id)}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                View Books
              </Button>
              <div className="flex space-x-1">
                {onEdit && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(shelf.id);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(shelf.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ShelfList;
