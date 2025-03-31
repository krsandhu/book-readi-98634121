
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="py-16 bg-gray-50" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">Pricing</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            No subscriptions or hidden fees—just a one-time payment for lifetime access.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg blur opacity-75"></div>
            <div className="relative bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
              <div className="px-6 py-8 sm:p-10 sm:pb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Issue Sync Pro
                    </h3>
                    <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                      $20
                      <span className="ml-1 text-2xl font-medium text-gray-500">
                        one-time
                      </span>
                    </div>
                  </div>
                  <div className="bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm font-semibold">
                    Lifetime Access
                  </div>
                </div>
              </div>
              <div className="px-6 pt-6 pb-8 bg-gray-50 sm:p-10 sm:pt-6">
                <ul className="space-y-4">
                  {[
                    'Access to all integrations',
                    'Real-time synchronization',
                    'Custom notifications',
                    'Future platform integrations',
                    'Premium support',
                    'No subscription required'
                  ].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="ml-3 text-base text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Get Issue Sync Pro
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm text-gray-500">
                  Secure payment via Stripe. 30-day money-back guarantee.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
