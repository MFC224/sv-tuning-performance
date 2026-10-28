'use client';

import React, { useState } from 'react';
import { 
  Rotate3d, 
  Sparkles, 
  ShieldCheck, 
  Eye
} from 'lucide-react';
import { vehicleCatalog } from '@/data/vehicleCatalog';
import { colorFinishPresets, ppfProtectionTiers, windowTintTiers } from '@/data/finishPresets';
import { VehicleModel, ColorFinishPreset, PPFProtectionTier, WindowTintTier, BranchId } from '@/types';
import SVStudioCanvas from './SVStudioCanvas';
import StudioHUD, { CameraPreset } from './StudioHUD';

export default function SV3DStudio() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleModel>(vehicleCatalog[0]); // Default to Toyota Hilux (the user's real upload!)
  const [selectedColor, setSelectedColor] = useState<ColorFinishPreset>(colorFinishPresets[0]); // SV Ultra Obsidian
  const [selectedPPF, setSelectedPPF] = useState<PPFProtectionTier>(ppfProtectionTiers[2]); // Full Gloss
  const [selectedTint, setSelectedTint] = useState<WindowTintTier>(windowTintTiers[1]); // Medium 35%
  const [isNightMode, setIsNightMode] = useState<boolean>(false); // Default to clean white showroom studio as requested!
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('threeQuarterFront');
  const [selectedBranch, setSelectedBranch] = useState<BranchId>('sachaca');

  return (
    <section id="estudio-3d" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/5">
      
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141A26] border border-white/10 text-xs font-semibold text-[#C5A059] mb-3">
            <Rotate3d className="w-3.5 h-3.5" /> Estudio Fotorrealista de Configuración
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            SV 3D STUDIO EXPERIENCE
          </h2>
        </div>
        <p className="text-[#94A3B8] text-sm sm:text-base max-w-lg mt-4 md:mt-0 leading-relaxed">
          Configurador 3D interactivo en tiempo real con modelos GLTF fotorrealistas. Rota 360°, haz zoom e interactúa con el blindaje PPF Defender Ultra y polarizados nanocerámicos sobre chasis de alta gama.
        </p>
      </div>

      {/* Main Studio Interactive Layout */}
      <div className="flex flex-col gap-8">
        
        {/* 1. Real Vehicle Studio Stage with White/Studio Cyclorama */}
        <SVStudioCanvas
          selectedVehicle={selectedVehicle}
          selectedColor={selectedColor}
          selectedPPF={selectedPPF}
          selectedTint={selectedTint}
          isNightMode={isNightMode}
          cameraPreset={cameraPreset}
        />

        {/* 2. Glassmorphic Luxury HUD */}
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
