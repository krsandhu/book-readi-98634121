
import React from 'react';
import Navbar from '@/components/Navbar';
import Integrations from '@/components/Integrations';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const IntegrationsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Seamlessly integrate</span>
                <span className="block text-indigo-600">with your favorite tools</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Connect Issue Sync with popular issue tracking systems to bring all your tasks into one unified interface.
              </p>
            </div>
          </div>
        </div>
        <Integrations />
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-indigo-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-indigo-800 mb-4">How our integrations work</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg mb-4">1</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Connect your accounts</h3>
                  <p className="text-gray-600">Securely connect Issue Sync to your existing issue tracking platforms with just a few clicks.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg mb-4">2</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Customize your view</h3>
                  <p className="text-gray-600">Set up personalized views and filters to focus on what matters most to you.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg mb-4">3</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Work seamlessly</h3>
                  <p className="text-gray-600">Update, comment, and manage issues across platforms without ever leaving Issue Sync.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default IntegrationsPage;
