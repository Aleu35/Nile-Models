import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ModelGrid from '@/components/ModelGrid';
import { ShootingStars } from "@/components/ui/shooting-stars";

const Talent = () => {
  return (
    <div className="relative min-h-screen">
      <ShootingStars className="z-0" />
      <MainLayout>
        <ModelGrid category="talent" title="Talent" />
      </MainLayout>
    </div>
  );
};

export default Talent;
