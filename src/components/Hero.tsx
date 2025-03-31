
import React from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Unify your</span>{' '}
                <span className="block text-indigo-600 xl:inline">issue tracking</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                One extension to track them all. Connect Jira, OpenProject, and more in a single unified interface. Save time, reduce context switching, and boost your productivity.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                    Get Started
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-r from-indigo-500 to-pink-500 opacity-80">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-3/4 h-3/4 bg-white rounded-lg shadow-xl p-4 transform rotate-3">
              <div className="w-full h-8 bg-gray-100 rounded-md mb-4 flex items-center px-3">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <div className="h-4 w-40 bg-gray-200 rounded-md ml-auto"></div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/3 h-full bg-gray-100 rounded-md p-2">
                  <div className="h-4 w-20 bg-indigo-200 rounded-md mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 rounded-md mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 rounded-md mb-2"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded-md"></div>
                </div>
                <div className="w-2/3 grid grid-cols-2 gap-2">
                  <div className="bg-gray-100 rounded-md p-2">
                    <div className="h-4 w-12 bg-pink-200 rounded-md mb-2"></div>
                    <div className="h-3 w-full bg-gray-200 rounded-md mb-1"></div>
                    <div className="h-3 w-full bg-gray-200 rounded-md"></div>
                  </div>
                  <div className="bg-gray-100 rounded-md p-2">
                    <div className="h-4 w-12 bg-indigo-200 rounded-md mb-2"></div>
                    <div className="h-3 w-full bg-gray-200 rounded-md mb-1"></div>
                    <div className="h-3 w-full bg-gray-200 rounded-md"></div>
                  </div>
                  <div className="bg-gray-100 rounded-md p-2">
                    <div className="h-4 w-12 bg-green-200 rounded-md mb-2"></div>
                    <div className="h-3 w-full bg-gray-200 rounded-md mb-1"></div>
                    <div className="h-3 w-full bg-gray-200 rounded-md"></div>
                  </div>
                  <div className="bg-gray-100 rounded-md p-2">
                    <div className="h-4 w-12 bg-yellow-200 rounded-md mb-2"></div>
                    <div className="h-3 w-full bg-gray-200 rounded-md mb-1"></div>
                    <div className="h-3 w-full bg-gray-200 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
