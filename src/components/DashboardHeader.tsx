
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Settings, 
  LogOut, 
  User, 
  Menu
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/hooks/useAuth';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserProfileDialog from './UserProfileDialog';

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              {/* Mobile navigation menu content */}
              <div className="p-6">
                <h2 className="text-lg font-semibold">Issue Sync</h2>
                <nav className="mt-6 space-y-1">
                  <a href="/dashboard" className="block py-2 px-4 rounded-md bg-indigo-50 text-indigo-700 font-medium">Dashboard</a>
                  <a href="/adapters" className="block py-2 px-4 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">Adapters</a>
                  <a href="/issues" className="block py-2 px-4 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">Issues</a>
                  <a href="/settings" className="block py-2 px-4 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">Settings</a>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="hidden lg:block">
            <h1 className="font-bold text-2xl bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
              Issue Sync
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar>
                  <AvatarImage src={user?.avatarUrl} alt={user?.firstName} />
                  <AvatarFallback>{user ? getInitials(user.firstName, user.lastName) : "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setProfileOpen(true)}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate('/dashboard/settings')}
                className="cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <UserProfileDialog 
        open={profileOpen} 
        onOpenChange={setProfileOpen} 
      />
    </header>
  );
};

export default DashboardHeader;
