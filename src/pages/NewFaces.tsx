
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ModelGrid from '@/components/ModelGrid';

const NewFaces = () => {
  return (
    <MainLayout>
      <ModelGrid category="new_faces" title="New Faces" />
    </MainLayout>
  );
};

export default NewFaces;
