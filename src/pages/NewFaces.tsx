import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ModelGrid from '@/components/ModelGrid';
import { ShootingStars } from "@/components/ui/shooting-stars";

const NewFaces = () => {
  return (
    <div className="relative min-h-screen">
      <ShootingStars className="z-0" />
      <MainLayout>
        <ModelGrid category="new_faces" title="New Faces" />
      </MainLayout>
    </div>
  );
};

export default NewFaces;
