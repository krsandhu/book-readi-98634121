
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import CategoryList from '@/components/CategoryList';
import Footer from '@/components/Footer';

const CategoriesPage = () => {
  const { toast } = useToast();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              Book Categories
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Organize your books by categories and genres to make them easier to find.
            </p>
          </div>

          <div className="mt-12">
            <CategoryList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
