import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useModels } from '@/hooks/useModels';

interface Model {
  is_featured?: boolean;
  profile_image_url?: string;
}

const QuickLinks: React.FC = () => {
  const { data: menModels } = useModels('men');
  const { data: womenModels } = useModels('women');
  const { data: newFacesModels } = useModels('new_faces');
  const { data: talentModels } = useModels('talent');

  // Get featured image for each category or fallback to placeholder
  const getImageForCategory = (models: Model[] | undefined, fallback: string) => {
    const featuredModel = models?.find(model => model.is_featured);
    return featuredModel?.profile_image_url || models?.[0]?.profile_image_url || fallback;
  };

  const quickLinks = [
    {
      title: 'Men',
      href: '/men',
      image: getImageForCategory(menModels || [], 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'),
    },
    {
      title: 'Women',
      href: '/women',
      image: getImageForCategory(womenModels || [], 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=300&h=400&fit=crop'),
    },
    {
      title: 'New Faces',
      href: '/new-faces',
      image: getImageForCategory(newFacesModels || [], 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=400&fit=crop'),
    },
    {
      title: 'Talent',
      href: '/talent',
      image: getImageForCategory(talentModels || [], 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop'),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-4">
      {quickLinks.map((link) => (
        <Link 
          key={link.title} 
          to={link.href} 
          className="group block"
        >
          <Card className="relative overflow-hidden bg-transparent border-2 border-white border-opacity-30 hover:border-opacity-100 transition-all duration-300 transform group-hover:scale-105 cursor-pointer">
            <div className="aspect-[3/4] relative">
              <img
                src={link.image}
                alt={link.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white tracking-wider transform group-hover:scale-110 transition-transform duration-300">
                  {link.title}
                </h3>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default QuickLinks;
