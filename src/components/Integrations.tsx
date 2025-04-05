
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, Camera, CreditCard, BookMarked, FileText, CloudLightning } from "lucide-react";
import IntegrationRequestDialog from './IntegrationRequestDialog';

const features = [
  {
    name: 'OCR Book Recognition',
    logo: <Camera className="h-8 w-8 text-white" />,
    color: 'bg-blue-500',
    status: 'Available',
    description: 'Scan book covers to auto-fill book information',
  },
  {
    name: 'Book Metadata API',
    logo: <BookOpen className="h-8 w-8 text-white" />,
    color: 'bg-green-500',
    status: 'Available',
    description: 'Fetch book details from major book databases',
  },
  {
    name: 'PDF Reading View',
    logo: <FileText className="h-8 w-8 text-white" />,
    color: 'bg-red-500',
    status: 'Coming Soon',
    description: 'Read PDF books directly in the app',
  },
  {
    name: 'Book Shopping Integration',
    logo: <CreditCard className="h-8 w-8 text-white" />,
    color: 'bg-gray-800',
    status: 'Coming Soon',
    description: 'Buy books directly from major online retailers',
  },
  {
    name: 'Reading Insights',
    logo: <BookMarked className="h-8 w-8 text-white" />,
    color: 'bg-purple-500',
    status: 'Coming Soon',
    description: 'Track and analyze your reading habits',
  },
  {
    name: 'Cloud Sync',
    logo: <CloudLightning className="h-8 w-8 text-white" />,
    color: 'bg-amber-500',
    status: 'Available',
    description: 'Sync your library across all your devices',
  },
];

const Integrations = () => {
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);

  return (
    <div className="py-16 bg-white" id="integrations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Enhance your reading experience
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            BookKeeper connects with powerful tools to help you organize and enjoy your book collection.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  {feature.logo}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    feature.status === 'Available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {feature.status}
                  </span>
                  <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-base text-gray-500">
            Don't see the feature you need? We're constantly improving BookKeeper.
          </p>
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
              onClick={() => setIsRequestDialogOpen(true)}
            >
              Request Feature
            </Button>
          </div>
        </div>
      </div>
      
      <IntegrationRequestDialog 
        open={isRequestDialogOpen} 
        onOpenChange={setIsRequestDialogOpen} 
      />
    </div>
  );
};

export default Integrations;
