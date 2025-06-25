import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ModelGrid from '@/components/ModelGrid';
import { ShootingStars } from "@/components/ui/shooting-stars";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Talent() {
  return (
    <MainLayout>
      <ModelGrid category="talent" title="Talent" />
    </MainLayout>
  );
}
