
import React from 'react';
import Navbar from '@/components/Navbar';
import Features from '@/components/Features';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const FeaturesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Powerful features to</span>
                <span className="block text-indigo-600">streamline your workflow</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Issue Sync brings together everything you need to manage your issues across multiple platforms.
              </p>
            </div>
          </div>
        </div>
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
