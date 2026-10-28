import React from 'react';
import SV3DStudio from '@/components/studio3d/SV3DStudio';

export const metadata = {
  title: 'Estudio 3D Interactivo | SV Tuning Arequipa',
  description: 'Configurador de vehículos 3D fotorrealista con blindaje PPF y polarizado nanocerámico.',
};

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-[#06080C] text-white pt-8 pb-20 px-4 sm:px-6">
      <SV3DStudio />
    </main>
  );
}
