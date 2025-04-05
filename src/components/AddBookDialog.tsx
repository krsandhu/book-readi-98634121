
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
  FormDescription,
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
import { Camera } from "lucide-react";
import { BookFormData, Shelf } from '@/types/adapter';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface AddBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shelves: Shelf[];
  onAddBook: (book: BookFormData) => void;
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
});

const AddBookDialog = ({ open, onOpenChange, shelves, onAddBook }: AddBookDialogProps) => {
  const form = useForm<BookFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      coverImageUrl: "",
      isbn: "",
      category: "",
      shelfId: shelves.length > 0 ? shelves[0].id : "",
      pageCount: undefined,
    },
  });

  function onSubmit(values: BookFormData) {
    onAddBook(values);
    form.reset();
    onOpenChange(false);
  }

  const handleScanClick = () => {
    // This would open camera or image upload for OCR
    console.log("OCR scan requested");
    // For demo purposes, we'll simulate an OCR result
    setTimeout(() => {
      form.setValue("title", "The Great Gatsby");
      form.setValue("author", "F. Scott Fitzgerald");
      form.setValue("isbn", "9780743273565");
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription>
            Enter book details or scan a book cover to automatically fill the information.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center justify-center mb-4">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-24 border-dashed"
                onClick={handleScanClick}
              >
                <Camera className="mr-2 h-5 w-5" />
                Scan Book Cover
              </Button>
            </div>

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
              <Button type="submit">Add Book</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookDialog;
