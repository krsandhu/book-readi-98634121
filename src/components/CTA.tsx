
import React from 'react';
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <div className="bg-indigo-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to boost your productivity?</span>
          <span className="block text-indigo-200">Start using Issue Sync today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 border border-transparent">
              Get started
            </Button>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Button variant="outline" className="border-white text-white hover:bg-indigo-600">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
