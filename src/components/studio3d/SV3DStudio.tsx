'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  Sparkles, 
  Rotate3d, 
  ShieldCheck, 
  Compass, 
  Sliders, 
  Cpu, 
  Layers, 
  Eye
} from 'lucide-react';
import { vehicleCatalog } from '@/data/vehicleCatalog';
import { colorFinishPresets, ppfProtectionTiers, windowTintTiers } from '@/data/finishPresets';
import { VehicleModel, ColorFinishPreset, PPFProtectionTier, WindowTintTier, BranchId } from '@/types';
import StudioHUD, { CameraPreset } from './StudioHUD';

// Dynamically import Three.js Canvas with ssr: false for sub-1.8s LCP guarantee
const SVStudioCanvas = dynamic(() => import('./SVStudioCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[480px] sm:h-[560px] lg:h-[620px] rounded-3xl glass-panel border border-white/10 flex flex-col items-center justify-center gap-3">
      <div className="w-10 h-10 rounded-full border-2 border-[#00F0FF] border-t-transparent animate-spin" />
      <span className="text-xs uppercase font-extrabold tracking-widest text-[#94A3B8]">
        Cargando Motor 3D PBR SV Studio...
      </span>
    </div>
  ),
});

export default function SV3DStudio() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleModel>(vehicleCatalog[1]); // Default to Porsche 911 GT3
  const [selectedColor, setSelectedColor] = useState<ColorFinishPreset>(colorFinishPresets[0]); // SV Ultra Obsidian
  const [selectedPPF, setSelectedPPF] = useState<PPFProtectionTier>(ppfProtectionTiers[2]); // Full Gloss
  const [selectedTint, setSelectedTint] = useState<WindowTintTier>(windowTintTiers[1]); // Medium 35%
  const [isNightMode, setIsNightMode] = useState<boolean>(true); // Night Neon as flagship vibe
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('threeQuarterFront');
  const [selectedBranch, setSelectedBranch] = useState<BranchId>('sachaca');

  return (
    <section id="estudio-3d" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/10">
      
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/30 text-xs font-bold text-[#00F0FF] mb-3">
            <Rotate3d className="w-4 h-4" /> Configurador Fotorrealista PBR en Tiempo Real
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            SV 3D STUDIO EXPERIENCE
          </h2>
        </div>
        <p className="text-[#94A3B8] text-sm sm:text-base max-w-lg mt-4 md:mt-0 leading-relaxed">
          Simula acabados de carrocería, blindaje PPF en cabina presurizada y polarizados nanocerámicos sobre chasis de alta gama antes de ingresar a taller.
        </p>
      </div>

      {/* Main Studio Interactive Layout */}
      <div className="flex flex-col gap-8">
        
        {/* 1. Three.js Canvas Stage */}
        <SVStudioCanvas
          selectedVehicle={selectedVehicle}
          selectedColor={selectedColor}
          selectedPPF={selectedPPF}
          selectedTint={selectedTint}
          isNightMode={isNightMode}
          cameraPreset={cameraPreset}
        />

        {/* 2. Glassmorphic Interactive HUD */}
        <StudioHUD
          selectedVehicle={selectedVehicle}
          onSelectVehicle={(v) => {
            setSelectedVehicle(v);
            setSelectedBranch(v.specs.idealBranch);
          }}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          selectedPPF={selectedPPF}
          onSelectPPF={setSelectedPPF}
          selectedTint={selectedTint}
          onSelectTint={setSelectedTint}
          isNightMode={isNightMode}
          onToggleNightMode={() => setIsNightMode(!isNightMode)}
          onSetCameraPreset={setCameraPreset}
          activeCameraPreset={cameraPreset}
          selectedBranch={selectedBranch}
          onSelectBranch={setSelectedBranch}
        />

      </div>

    </section>
  );
}
