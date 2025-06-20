
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const About = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-black text-white font-abolition">
        {/* Hero Section - Enhanced mobile responsiveness */}
        <div className="bg-gradient-to-b from-gray-900 to-black py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 tracking-[0.15em] sm:tracking-[0.2em] uppercase leading-tight">
              About NILES Models
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              We are a premier modeling agency dedicated to discovering, developing, and managing 
              exceptional talent. With over 15 years of experience, we've built lasting relationships 
              with top brands, designers, and photographers worldwide.
            </p>
          </div>
        </div>

        {/* Mission Section - Enhanced mobile layout */}
        <div className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 tracking-wider uppercase">Our Mission</h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 sm:mb-12 px-4">
                At NILES Models, we believe in nurturing raw talent and transforming it into 
                professional success. Our mission is to provide comprehensive support, guidance, 
                and opportunities that enable our models to thrive in the competitive world of fashion.
              </p>
              
              {/* Enhanced responsive grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mt-8 sm:mt-12">
                <div className="text-center px-4">
                  <h3 className="text-lg sm:text-xl font-light mb-3 sm:mb-4 text-white">Discover</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    We scout and discover unique talents with exceptional potential.
                  </p>
                </div>
                <div className="text-center px-4">
                  <h3 className="text-lg sm:text-xl font-light mb-3 sm:mb-4 text-white">Develop</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    We provide training, coaching, and professional development.
                  </p>
                </div>
                <div className="text-center px-4">
                  <h3 className="text-lg sm:text-xl font-light mb-3 sm:mb-4 text-white">Deliver</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    We connect our models with top brands and career opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
