
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Fashion Photographer',
      company: 'Vogue',
      content: 'NILES Models consistently provides exceptional talent. Their models are professional, prepared, and bring incredible energy to every shoot.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Creative Director',
      company: 'Calvin Klein',
      content: 'Working with NILES has been a game-changer for our campaigns. They understand our vision and deliver models who embody our brand perfectly.',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      role: 'Model',
      company: 'NILES Talent',
      content: 'NILES transformed my career. Their guidance, support, and connections opened doors I never thought possible. Truly grateful for their expertise.',
      rating: 5
    },
    {
      name: 'David Kim',
      role: 'Brand Manager',
      company: 'Nike',
      content: 'The professionalism and quality of models from NILES is unmatched. They make our casting process seamless and results outstanding.',
      rating: 5
    }
  ];

  return (
    <div className="py-16 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-4 tracking-wider uppercase text-white">
            What Our Clients Say
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Hear from the brands, photographers, and models who trust NILES for their most important projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-white font-light">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  <p className="text-gray-500 text-xs">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
