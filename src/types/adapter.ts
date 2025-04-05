export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  coverImageUrl?: string;
  isbn?: string;
  category?: string;
  shelfId: string;
  createdAt: string;
  updatedAt: string;
  addedByUserId: string;
  pageCount?: number;
  readStatus?: 'not_started' | 'in_progress' | 'completed';
}

export interface Shelf {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  createdAt: string;
  ownerId: string;
  category?: string;
  sharedWith?: string[]; // array of user IDs
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdByUserId: string;
}

export interface BookFormData {
  title: string;
  author: string;
  description?: string;
  coverImageUrl?: string;
  isbn?: string;
  category?: string;
  shelfId: string;
  pageCount?: number;
}

export interface ShelfFormData {
  name: string;
  description?: string;
  isPublic: boolean;
  category?: string;
  sharedWith?: string[];
}

export interface OCRScanRequest {
  imageData: string; // base64 encoded image
}

export interface OCRScanResponse {
  title?: string;
  author?: string;
  isbn?: string;
  description?: string;
}

export interface IntegrationRequest {
  platform: string;
  description?: string;
  email: string;
}
