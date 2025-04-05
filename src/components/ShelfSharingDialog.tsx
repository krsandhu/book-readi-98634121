
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Switch,
  Label,
} from "@/components/ui/checkbox";
import { Globe, Link, Users, Copy, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ShelfSharingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shelfId: string;
  name: string;
  isPublic: boolean;
  isOwner: boolean;
  currentSharedWith: string[];
}

const ShelfSharingDialog = ({ 
  open, 
  onOpenChange, 
  shelfId, 
  name,
  isPublic,
  isOwner,
  currentSharedWith
}: ShelfSharingDialogProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [makePublic, setMakePublic] = useState(isPublic);
  const [sharedUsers, setSharedUsers] = useState(currentSharedWith);
  
  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/shelves/${shelfId}`;
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
    console.log(`Sharing shelf ${shelfId} with ${email}`);
    
    // Add to shared users
    setSharedUsers([...sharedUsers, email]);
    
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${email}`,
    });
    
    setEmail("");
  };

  const handleRemoveUser = (userToRemove: string) => {
    setSharedUsers(sharedUsers.filter(user => user !== userToRemove));
  };

  const handleSaveChanges = () => {
    // This would update the shelf sharing settings
    console.log(`Updating shelf ${shelfId} - Public: ${makePublic}, Shared with: ${sharedUsers.join(', ')}`);
    
    toast({
      title: "Sharing settings updated",
      description: "Your shelf sharing settings have been saved",
    });
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share "{name}"</DialogTitle>
          <DialogDescription>
            Share this bookshelf with others.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={isOwner ? "settings" : "link"}>
          <TabsList className="grid w-full grid-cols-3">
            {isOwner && (
              <TabsTrigger value="settings" className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            )}
            <TabsTrigger value="link" className="flex items-center">
              <Link className="h-4 w-4 mr-2" />
              Share Link
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Invite People
            </TabsTrigger>
          </TabsList>
          
          {isOwner && (
            <TabsContent value="settings" className="space-y-4 pt-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <Label className="text-base font-medium">Public Bookshelf</Label>
                  <p className="text-sm text-gray-500">
                    Make this bookshelf visible to everyone
                  </p>
                </div>
                <Switch
                  checked={makePublic}
                  onCheckedChange={setMakePublic}
                />
              </div>
              
              <div>
                <Label className="text-base font-medium">Currently Shared With</Label>
                <div className="mt-2 space-y-2">
                  {sharedUsers.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      This bookshelf is not shared with anyone yet.
                    </p>
                  ) : (
                    sharedUsers.map((user, index) => (
                      <div key={index} className="flex items-center justify-between py-2 px-3 border rounded-md">
                        <span>{user}</span>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => handleRemoveUser(user)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </div>
            </TabsContent>
          )}
          
          <TabsContent value="link" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex">
                <Input 
                  readOnly 
                  value={`${window.location.origin}/shelves/${shelfId}`} 
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
                {isPublic ? 
                  "This is a public bookshelf. Anyone with this link can view it." : 
                  "Only people you've shared this bookshelf with can access it using this link."}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-4 pt-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Enter email addresses to invite people to access this bookshelf.
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
            
            {sharedUsers.length > 0 && (
              <div>
                <Label className="text-sm font-medium">Currently Shared With</Label>
                <div className="mt-2 space-y-2">
                  {sharedUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 border rounded-md">
                      <span>{user}</span>
                      {isOwner && (
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => handleRemoveUser(user)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
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

export default ShelfSharingDialog;
