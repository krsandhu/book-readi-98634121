
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Link, Users, Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface BookSharingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookId: string;
  title: string;
}

const BookSharingDialog = ({ 
  open, 
  onOpenChange, 
  bookId, 
  title 
}: BookSharingDialogProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  
  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/books/${bookId}`;
    navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);
    
    toast({
      title: "Link copied",
      description: "Link has been copied to clipboard",
    });
    
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };
  
  const handleShareByEmail = () => {
    // This would send an invitation to the provided email
    console.log(`Sharing book ${bookId} with ${email}`);
    
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${email}`,
    });
    
    setEmail("");
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share "{title}"</DialogTitle>
          <DialogDescription>
            Share this book with others.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="link">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link" className="flex items-center">
              <Link className="h-4 w-4 mr-2" />
              Share Link
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Invite People
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="link" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex">
                <Input 
                  readOnly 
                  value={`${window.location.origin}/books/${bookId}`} 
                  className="flex-1 rounded-r-none"
                />
                <Button 
                  onClick={handleCopyLink} 
                  variant="secondary"
                  className="rounded-l-none"
                >
                  {linkCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Anyone with this link will be able to view this book.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-4 pt-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Enter email addresses to invite people to view this book.
              </p>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-r-none"
                />
                <Button 
                  onClick={handleShareByEmail} 
                  disabled={!email || !email.includes('@')}
                  className="rounded-l-none"
                >
                  Send
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookSharingDialog;
