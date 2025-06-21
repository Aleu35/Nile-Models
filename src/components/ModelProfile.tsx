import React, { useState } from 'react';
import { X, Instagram, Facebook, Twitter } from 'lucide-react';
import { Model } from '@/hooks/useModels';
import { Button } from '@/components/ui/button';

// A simple TikTok icon component as it's not in lucide-react by default
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.14 8.35a4.14 4.14 0 0 1-4.14 4.14V16a8 8 0 1 0-8-8V2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v13.09a4.14 4.14 0 1 1-4.14-4.14" />
  </svg>
);

interface ModelProfileProps {
  model: Model;
  onClose: () => void;
}

const ModelProfile: React.FC<ModelProfileProps> = ({ model, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  console.log('ModelProfile - Portfolio images:', model.portfolio_images);
  
  // Check if portfolio images exist and are valid
  const hasPortfolioImages = model.portfolio_images && 
    Array.isArray(model.portfolio_images) && 
    model.portfolio_images.length > 0;
  
  const socialLinks = [
    { name: 'Instagram', url: model.social_instagram, icon: Instagram },
    { name: 'Facebook',  url: model.social_facebook,  icon: Facebook  },
    { name: 'Twitter',   url: model.social_twitter,   icon: Twitter   },
    { name: 'TikTok',    url: model.social_tiktok,    icon: TikTokIcon },
  ].filter(link => link.url); // Filter out links that don't have a URL

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black">
        {/* Close button - Fixed at top right */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="fixed top-6 right-6 z-[51] text-white hover:text-white/80 hover:bg-white/10 rounded-full"
        >
          <X className="h-6 w-6" />
        </Button>
          
        <div className="overflow-y-auto w-full h-full">
          <div className="max-w-7xl mx-auto p-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Side - Main Image */}
              <div className="xl:col-span-1">
                {model.profile_image_url ? (
                  <div 
                    className="aspect-[3/4] bg-gray-900 cursor-pointer"
                    onClick={() => setSelectedImage(model.profile_image_url!)}
                  >
                    <img
                      src={model.profile_image_url}
                      alt={`${model.name} - Profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-[3/4] bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-400 text-lg font-light">No Image</span>
                  </div>
                )}
              </div>
              
              {/* Right Side - Model Info */}
              <div className="xl:col-span-2 space-y-8 py-8">
                {/* Model Name */}
                <div>
                  <h1 className="text-5xl font-extralight text-white tracking-[0.3em] uppercase mb-8">
                    {model.name}
                  </h1>
                </div>
                
                {/* Social Media Icons */}
                {socialLinks.length > 0 && (
                  <div className="flex items-center space-x-4">
                    {socialLinks.map(social => {
                      const Icon = social.icon;
                      return (
                        <a 
                          key={social.name}
                          href={social.url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${model.name}'s ${social.name}`}
                          className="text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          <Icon className="h-6 w-6" />
                        </a>
                      );
                    })}
                  </div>
                )}
                
                {/* Bio content */}
                {model.bio && (
                  <div className="text-gray-200 leading-relaxed font-light text-xl">
                    <pre className="whitespace-pre-wrap font-light text-xl text-gray-200 leading-relaxed">
                      {model.bio}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Portfolio Section - Full Width */}
            {hasPortfolioImages && (
              <div className="pt-16">
                {/* Portfolio Gallery Grid - Responsive 3-4 columns */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {model.portfolio_images.map((imageUrl, index) => (
                    <div 
                      key={`portfolio-${index}-${imageUrl}`} 
                      className="group relative aspect-[3/4] bg-gray-900 cursor-pointer"
                      onClick={() => setSelectedImage(imageUrl)}
                    >
                      <img
                        src={imageUrl}
                        alt={`${model.name} - Portfolio ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          console.error(`Failed to load portfolio image ${index + 1}:`, imageUrl);
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log(`Successfully loaded portfolio image ${index + 1}:`, imageUrl);
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Empty State - Only show if no bio and no portfolio */}
            {!model.bio && !hasPortfolioImages && (
              <div className="flex flex-col items-center justify-center py-20 text-center px-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-4 border border-gray-700">
                  <span className="text-4xl">📝</span>
                </div>
                <p className="text-gray-400 text-lg font-light mb-2">Profile information coming soon</p>
                <p className="text-gray-600 text-sm">Check back later for updates</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox for viewing full-screen images */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage}
            alt="Full-screen view"
            className="max-w-full max-h-full object-contain"
          />
           <Button
            onClick={(e) => {
              e.stopPropagation(); // Prevent backdrop click from firing
              setSelectedImage(null);
            }}
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6 z-[61] text-white hover:text-white/80 hover:bg-white/10 rounded-full"
          >
            <X className="h-8 w-8" />
          </Button>
        </div>
      )}
    </>
  );
};

export default ModelProfile;
