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
import SV360Turntable from './SV360Turntable';
import StudioHUD, { CameraPreset } from './StudioHUD';

export default function SV3DStudio() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleModel>(vehicleCatalog[0]); // Default to Toyota Hilux
  const [selectedColor, setSelectedColor] = useState<ColorFinishPreset>(colorFinishPresets[0]); // SV Ultra Obsidian
  const [selectedPPF, setSelectedPPF] = useState<PPFProtectionTier>(ppfProtectionTiers[2]); // Full Gloss
  const [selectedTint, setSelectedTint] = useState<WindowTintTier>(windowTintTiers[1]); // Medium 35%
  const [isNightMode, setIsNightMode] = useState<boolean>(false); // Default to clean white showroom studio as requested!
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('threeQuarterFront');
  const [selectedBranch, setSelectedBranch] = useState<BranchId>('sachaca');
  const [viewMode, setViewMode] = useState<'webgl3d' | 'turntable'>('webgl3d');

  return (
    <section id="estudio-3d" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/5">
      
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141A26] border border-white/10 text-xs font-semibold text-[#C5A059] mb-3">
            <Rotate3d className="w-3.5 h-3.5" /> Estudio Fotorrealista de Configuración 3D
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            SV 3D STUDIO EXPERIENCE
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base max-w-lg mt-3 leading-relaxed">
            Configurador fotorrealista en 3D interactivo con iluminación de salón ciclorama blanco y shaders PBR de alta fidelidad. Inspecciona el blindaje PPF Defender Ultra y polarizados nanocerámicos sobre los vehículos más cotizados del Perú.
          </p>
        </div>

        {/* View Mode Toggle: WebGL 3D vs Turntable 360° */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0F131C] border border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('webgl3d')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'webgl3d'
                ? 'bg-white text-black shadow-md'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Malla 3D WebGL PBR
          </button>
          <button
            type="button"
            onClick={() => setViewMode('turntable')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'turntable'
                ? 'bg-white text-black shadow-md'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Giro Turntable 360°
          </button>
        </div>
      </div>

      {/* Main Studio Interactive Layout */}
      <div className="flex flex-col gap-8">
        
        {/* 1. Real Vehicle Studio Stage with White/Studio Cyclorama */}
        {viewMode === 'turntable' ? (
          <SV360Turntable
            selectedVehicle={selectedVehicle}
            selectedColor={selectedColor}
            selectedPPF={selectedPPF}
            selectedTint={selectedTint}
            isNightMode={isNightMode}
            cameraPreset={cameraPreset}
          />
        ) : (
          <SVStudioCanvas
            selectedVehicle={selectedVehicle}
            selectedColor={selectedColor}
            selectedPPF={selectedPPF}
            selectedTint={selectedTint}
            isNightMode={isNightMode}
            cameraPreset={cameraPreset}
          />
        )}

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
