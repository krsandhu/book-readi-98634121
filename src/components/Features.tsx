
import React from 'react';
import { ArrowRight, Clock, RefreshCw, Bell, Search, Globe, DollarSign } from 'lucide-react';

const features = [
  {
    name: 'Centralized Monitoring',
    description: 'Track issues from multiple systems in one unified interface, eliminating the need to switch between platforms.',
    icon: Search,
  },
  {
    name: 'Real-time Synchronization',
    description: 'Changes made in the extension are instantly reflected in the original systems, ensuring data consistency.',
    icon: RefreshCw,
  },
  {
    name: 'Time Saving',
    description: 'Reduce context switching and save valuable development time by managing everything from one place.',
    icon: Clock,
  },
  {
    name: 'Custom Notifications',
    description: 'Set up personalized alerts for specific issues, statuses, or updates across all your connected platforms.',
    icon: Bell,
  },
  {
    name: 'Cross-platform Support',
    description: 'Initial support for OpenProject and Jira, with more platforms coming soon.',
    icon: Globe,
  },
  {
    name: 'One-time Payment',
    description: 'Simple $20 one-time payment. No subscriptions, no hidden fees, no recurring charges.',
    icon: DollarSign,
  },
];

const Features = () => {
  return (
    <div className="py-16 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Everything you need in one place
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our browser extension brings together all your issue tracking needs into a single, seamless experience.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-xl">
                  <div className="flex items-center space-x-5">
                    <div className="bg-indigo-50 rounded-lg p-2">
                      <feature.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                  </div>
                  <p className="mt-4 text-base text-gray-500">{feature.description}</p>
                  <div className="mt-5">
                    <a href="#" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
