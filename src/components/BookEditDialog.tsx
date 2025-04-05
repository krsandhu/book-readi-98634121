
import React from 'react';
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Book, BookFormData, Shelf } from '@/types/adapter';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface BookEditDialogProps {
  book: Book;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shelves: Shelf[];
  onSave: (bookId: string, updatedBook: BookFormData) => void;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().optional(),
  coverImageUrl: z.string().optional(),
  isbn: z.string().optional(),
  category: z.string().optional(),
  shelfId: z.string().min(1, "Shelf is required"),
  pageCount: z.number().optional(),
  readStatus: z.enum(["not_started", "in_progress", "completed"]).optional(),
});

const BookEditDialog = ({ book, open, onOpenChange, shelves, onSave }: BookEditDialogProps) => {
  const form = useForm<BookFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: book.title,
      author: book.author,
      description: book.description || "",
      coverImageUrl: book.coverImageUrl || "",
      isbn: book.isbn || "",
      category: book.category || "",
      shelfId: book.shelfId,
      pageCount: book.pageCount,
      readStatus: book.readStatus,
    },
  });

  function onSubmit(values: BookFormData) {
    onSave(book.id, values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Update the details for '{book.title}'
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Book title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="ISBN (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shelfId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bookshelf</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a bookshelf" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {shelves.map((shelf) => (
                        <SelectItem key={shelf.id} value={shelf.id}>
                          {shelf.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pageCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Count</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Number of pages (optional)" 
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value === "" ? undefined : parseInt(e.target.value, 10);
                        field.onChange(value);
                      }}
                      value={field.value === undefined ? "" : field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="readStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Read Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reading status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="not_started">Not Started</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Book description (optional)" 
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookEditDialog;
