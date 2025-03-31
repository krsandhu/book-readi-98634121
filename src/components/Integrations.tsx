
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import IntegrationRequestDialog from './IntegrationRequestDialog';

const platforms = [
  {
    name: 'Jira',
    logo: 'J',
    color: 'bg-blue-500',
    status: 'Available',
  },
  {
    name: 'OpenProject',
    logo: 'OP',
    color: 'bg-green-500',
    status: 'Available',
  },
  {
    name: 'Redmine',
    logo: 'R',
    color: 'bg-red-500',
    status: 'Coming Soon',
  },
  {
    name: 'GitHub Issues',
    logo: 'GH',
    color: 'bg-gray-800',
    status: 'Coming Soon',
  },
  {
    name: 'Trello',
    logo: 'T',
    color: 'bg-blue-400',
    status: 'Coming Soon',
  },
  {
    name: 'Asana',
    logo: 'A',
    color: 'bg-orange-500',
    status: 'Coming Soon',
  },
];

const Integrations = () => {
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);

  return (
    <div className="py-16 bg-white" id="integrations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">Integrations</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Connect with your favorite tools
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Issue Sync connects with popular issue tracking systems, with more integrations coming soon.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform) => (
            <div key={platform.name} className="border border-gray-200 rounded-lg p-6 flex items-center">
              <div className={`w-12 h-12 ${platform.color} text-white rounded-lg flex items-center justify-center font-bold text-lg`}>
                {platform.logo}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{platform.name}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  platform.status === 'Available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {platform.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-base text-gray-500">
            Don't see your platform? We're constantly adding new integrations.
          </p>
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
              onClick={() => setIsRequestDialogOpen(true)}
            >
              Request Integration
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
