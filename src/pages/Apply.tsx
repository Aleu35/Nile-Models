
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ModelApplicationForm from '@/components/forms/ModelApplicationForm';

const Apply = () => {
  return (
    <MainLayout>
      {/* Clean, minimal design */}
      <div className="min-h-screen bg-black py-16">
        <div className="max-w-2xl mx-auto px-6">
          {/* Minimal header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-white mb-4 tracking-wide">
              Become a Model
            </h1>
            <p className="text-lg text-gray-400 font-light">
              Submit your application to join our agency
            </p>
            <div className="w-12 h-0.5 bg-white mx-auto mt-6 opacity-30"></div>
          </div>
          
          <ModelApplicationForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default Apply;
