
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Eye, EyeOff, Key, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  avatarUrl: z.string().url({
    message: "Please enter a valid URL.",
  }).optional(),
});

const passwordFormSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const AccountSettings = () => {
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      avatarUrl: user?.avatarUrl || "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  React.useEffect(() => {
    if (user) {
      profileForm.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        avatarUrl: user.avatarUrl || "",
      });
    }
  }, [user, profileForm]);

  const onProfileSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      await updateUserProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        avatarUrl: data.avatarUrl,
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    setIsLoading(true);
    try {
      // This would be an API call to your backend to update password
      // For demo purposes, we'll simulate a successful password update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
      
      passwordForm.reset();
    } catch (error) {
      console.error("Failed to update password:", error);
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-gray-500">Manage your account details and preferences</p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account profile information and email address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={profileForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="johndoe@example.com" 
                            {...field} 
                            disabled 
                          />
                        </FormControl>
                        <FormDescription>
                          Your email address is used to log in and cannot be changed.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="avatarUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Picture URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/your-image.jpg" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the URL of your profile picture.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="password" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="••••••••" 
                              type={showCurrentPassword ? "text" : "password"} 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-10 w-10"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                              {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">
                                {showCurrentPassword ? "Hide password" : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="••••••••" 
                              type={showNewPassword ? "text" : "password"} 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-10 w-10"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">
                                {showNewPassword ? "Hide password" : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Password must be at least 8 characters.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="••••••••" 
                              type={showConfirmPassword ? "text" : "password"} 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-10 w-10"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">
                                {showConfirmPassword ? "Hide password" : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update password"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountSettings;
