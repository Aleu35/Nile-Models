import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ModelGrid from '@/components/ModelGrid';
import { ShootingStars } from "@/components/ui/shooting-stars";

const Men = () => {
  return (
    <div className="relative min-h-screen">
      <ShootingStars className="z-0" />
      <MainLayout>
        <ModelGrid category="men" title="Men Models" />
      </MainLayout>
    </div>
  );
};

export default Men;
