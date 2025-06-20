
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Users, Sparkles, Globe, Calendar, Star } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Camera,
      title: 'Fashion Modeling',
      description: 'High-fashion editorials, runway shows, and designer campaigns for top fashion brands.',
      features: ['Editorial shoots', 'Runway modeling', 'Designer campaigns', 'Fashion weeks']
    },
    {
      icon: Users,
      title: 'Commercial Modeling',
      description: 'Brand ambassadorships, advertising campaigns, and commercial photography.',
      features: ['Brand campaigns', 'Commercial photography', 'Product endorsements', 'Corporate events']
    },
    {
      icon: Sparkles,
      title: 'Beauty & Lifestyle',
      description: 'Beauty campaigns, skincare brands, and lifestyle photography.',
      features: ['Beauty campaigns', 'Skincare ads', 'Lifestyle shoots', 'Cosmetic brands']
    },
    {
      icon: Globe,
      title: 'International Placement',
      description: 'Global opportunities with international agencies and brands worldwide.',
      features: ['International contracts', 'Global campaigns', 'Fashion capitals', 'Cultural exchange']
    },
    {
      icon: Calendar,
      title: 'Event Modeling',
      description: 'Trade shows, exhibitions, promotional events, and brand activations.',
      features: ['Trade shows', 'Promotional events', 'Brand activations', 'Corporate functions']
    },
    {
      icon: Star,
      title: 'Talent Development',
      description: 'Professional coaching, portfolio development, and career guidance.',
      features: ['Professional coaching', 'Portfolio building', 'Media training', 'Career planning']
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-gray-900 to-black py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-light mb-6 tracking-[0.2em] uppercase">
              Our Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive modeling services connecting exceptional talent with world-class opportunities
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl font-light tracking-wider">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 leading-relaxed text-center">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-white font-light text-sm uppercase tracking-wider">Includes:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-gray-400 text-sm flex items-center">
                            <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gray-900/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-light mb-6 tracking-wider uppercase">Ready to Work With Us?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're a model looking for representation or a client seeking exceptional talent, 
              we're here to help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/apply" 
                className="bg-white text-black px-8 py-3 font-light tracking-wider uppercase hover:bg-gray-200 transition-colors"
              >
                Apply as Model
              </a>
              <a 
                href="/contact" 
                className="border border-gray-600 text-white px-8 py-3 font-light tracking-wider uppercase hover:bg-gray-800 transition-colors"
              >
                Client Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Services;
