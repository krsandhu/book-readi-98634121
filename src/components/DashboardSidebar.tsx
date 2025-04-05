
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Library, 
  TagIcon, 
  Settings, 
  PlusCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const sidebarItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      name: 'Books',
      icon: BookOpen,
      path: '/dashboard/books',
    },
    {
      name: 'Shelves',
      icon: Library,
      path: '/dashboard/shelves',
    },
    {
      name: 'Categories',
      icon: TagIcon,
      path: '/dashboard/categories',
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/dashboard/settings',
    },
  ];
  
  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/dashboard';
  };

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="font-bold text-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
          BookReadi
        </h1>
      </div>
      <div className="flex flex-col overflow-y-auto flex-1 p-4">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                isActive(item.path) && "bg-indigo-50 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-600"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <Button className="gap-2" onClick={() => navigate('/dashboard/shelves/new')}>
          <PlusCircle className="h-4 w-4" />
          Add New Shelf
        </Button>
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <div className="rounded-md bg-gray-50 p-3">
          <h3 className="text-sm font-medium">BookReadi Premium</h3>
          <p className="mt-1 text-xs text-gray-500">
            You have unlimited access to all features.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
