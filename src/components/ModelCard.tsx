import React from 'react';
import { Model } from '@/hooks/useModels';

interface ModelCardProps {
  model: Model;
  onModelClick: (model: Model) => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onModelClick }) => {
  const primaryImage = model.profile_image_url || '/placeholder.svg'; // Fallback for missing image

  return (
    <article
      className="relative overflow-hidden group cursor-pointer"
      onClick={() => onModelClick(model)}
    >
      <img
        src={primaryImage}
        alt={`${model.name} portrait`}
        className="w-full aspect-[3/4] object-cover transition-transform duration-250 ease-in-out group-hover:scale-105"
      />
      {/* Gradient for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
      <h3 className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-2 text-center text-brandWhite font-display font-bold text-lg tracking-wider opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
        {model.name.toUpperCase()}
      </h3>
    </article>
  );
};

export default ModelCard;
