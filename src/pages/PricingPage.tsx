
import React from 'react';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const PricingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Simple, transparent</span>
                <span className="block text-indigo-600">one-time pricing</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                No subscriptions, no hidden fees—just a one-time payment for lifetime access to Issue Sync.
              </p>
            </div>
          </div>
        </div>
        <Pricing />
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-indigo-600 mb-2">Is this really a one-time payment?</h3>
                  <p className="text-gray-600">Yes! Pay once and enjoy Issue Sync for life, including all future platform integrations.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-indigo-600 mb-2">How do I install the extension?</h3>
                  <p className="text-gray-600">After purchase, you'll receive a link to install Issue Sync from the Chrome Web Store.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-indigo-600 mb-2">Do you offer refunds?</h3>
                  <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-indigo-600 mb-2">Which browsers are supported?</h3>
                  <p className="text-gray-600">Currently Chrome, with Firefox and Edge support coming soon.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
