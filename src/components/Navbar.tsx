
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-2xl bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
                Issue Sync
              </span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/features" className="border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Features
              </Link>
              <Link to="/integrations" className="border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Integrations
              </Link>
              <Link to="/pricing" className="border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Pricing
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {isLoading ? (
              <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/dashboard')}
                  className="p-0 h-8 w-8 rounded-full overflow-hidden"
                >
                  <Avatar>
                    <AvatarImage src={user.avatarUrl} alt={user.firstName} />
                    <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" className="mr-3" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => navigate('/register')}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
