'use client';

import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Rotate3d, 
  Camera, 
  Eye, 
  MessageCircle, 
  Layers, 
  Cpu, 
  Check, 
  Share2,
  Copy,
  Info
} from 'lucide-react';
import { VehicleModel, ColorFinishPreset, PPFProtectionTier, WindowTintTier, BranchId } from '@/types';
import { vehicleCatalog } from '@/data/vehicleCatalog';
import { colorFinishPresets, ppfProtectionTiers, windowTintTiers } from '@/data/finishPresets';
import { businessData } from '@/data/businessData';

export type CameraPreset = 'threeQuarterFront' | 'side' | 'threeQuarterRear' | 'front' | 'top';

interface StudioHUDProps {
  selectedVehicle: VehicleModel;
  onSelectVehicle: (vehicle: VehicleModel) => void;
  selectedColor: ColorFinishPreset;
  onSelectColor: (color: ColorFinishPreset) => void;
  selectedPPF: PPFProtectionTier;
  onSelectPPF: (ppf: PPFProtectionTier) => void;
  selectedTint: WindowTintTier;
  onSelectTint: (tint: WindowTintTier) => void;
  isNightMode: boolean;
  onToggleNightMode: () => void;
  onSetCameraPreset: (preset: CameraPreset) => void;
  activeCameraPreset: CameraPreset;
  selectedBranch: BranchId;
  onSelectBranch: (branch: BranchId) => void;
}

export default function StudioHUD({
  selectedVehicle,
  onSelectVehicle,
  selectedColor,
  onSelectColor,
  selectedPPF,
  onSelectPPF,
  selectedTint,
  onSelectTint,
  isNightMode,
  onToggleNightMode,
  onSetCameraPreset,
  activeCameraPreset,
  selectedBranch,
  onSelectBranch,
}: StudioHUDProps) {
  
  // Calculate estimated investment
  const baseServicePrice = selectedPPF.priceEstimateSoles;
  const tintPrice = selectedTint.id === 'clear_70' ? 850 : 650;
  const totalPriceSoles = baseServicePrice + tintPrice;

  // Generate unique configuration code
  const configCode = `SVT-${selectedVehicle.brand.substring(0, 3).toUpperCase()}-${selectedColor.name.substring(0, 4).toUpperCase()}-${selectedPPF.id.toUpperCase()}-${selectedBranch.toUpperCase()}`;

  const currentBranchInfo = businessData.branches[selectedBranch];

  const whatsappMessage = `Hola Paul Ayamamani / SV Tuning (${currentBranchInfo.name}),
He configurado mi vehículo en el SV 3D Studio:
• Vehículo: ${selectedVehicle.brand} ${selectedVehicle.model} (${selectedVehicle.edition})
• Color / Acabado: ${selectedColor.name}
• Blindaje PPF: ${selectedPPF.name}
• Polarizado Térmico: ${selectedTint.name}
• Sede de Atención: ${currentBranchInfo.name}
• Código de Configuración: ${configCode}
• Presupuesto Estimado: S/ ${totalPriceSoles.toLocaleString()}

¿Podemos coordinar la fecha para la evaluación técnica?`;

  const cameraPresetsList: { id: CameraPreset; label: string }[] = [
    { id: 'threeQuarterFront', label: '3/4 Frontal' },
    { id: 'side', label: 'Lateral' },
    { id: 'threeQuarterRear', label: '3/4 Trasera' },
    { id: 'front', label: 'Frontal' },
    { id: 'top', label: 'Cenital' },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      
      {/* Top Bar: Vehicle Selector & Lighting Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl glass-panel border border-white/10">
        
        {/* Vehicle Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {vehicleCatalog.map((v) => {
            const isSelected = selectedVehicle.id === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onSelectVehicle(v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#00F0FF] text-black shadow-md shadow-[#00F0FF]/30'
                    : 'bg-[#111622] text-[#94A3B8] hover:text-white hover:bg-[#1A2234]'
                }`}
              >
                {v.brand} {v.model}
              </button>
            );
          })}
        </div>

        {/* Studio Lighting & Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleNightMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isNightMode 
                ? 'bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF]/40 shadow-sm shadow-[#00F0FF]/20' 
                : 'bg-[#111622] text-white border-white/10 hover:border-white/20'
            }`}
          >
            {isNightMode ? (
              <>
                <Moon className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>Noche Neón</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-[#E5B869]" />
                <span>Estudio Día</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Main HUD Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Left Sub-panel: Finish & Color Swatches */}
        <div className="md:col-span-6 flex flex-col gap-4 p-5 rounded-3xl glass-panel border border-white/10">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#00F0FF] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Color & Acabado PBR
            </span>
            <span className="text-[11px] text-[#94A3B8] font-medium">
              {selectedColor.name}
            </span>
          </div>

          {/* Color Circles */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
            {colorFinishPresets.map((color) => {
              const isSelected = selectedColor.id === color.id;
              return (
                <button
                  key={color.id}
                  type="button"
                  title={color.name}
                  onClick={() => onSelectColor(color)}
                  className={`relative w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer border ${
                    isSelected 
                      ? 'border-[#00F0FF] scale-110 shadow-lg shadow-[#00F0FF]/30 ring-2 ring-[#00F0FF]/40' 
                      : 'border-white/20 hover:border-white/50 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && (
                    <Check className={`w-4 h-4 ${color.hex === '#F4F7FB' || color.hex === '#00F0FF' ? 'text-black' : 'text-white'}`} />
                  )}
                  {color.isFlagship && !isSelected && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00F0FF]" />
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#94A3B8] leading-relaxed pt-2 border-t border-white/10">
            {selectedColor.description}
          </p>

          {/* Camera View Angle Selector */}
          <div className="pt-3 border-t border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider block mb-2 flex items-center gap-1">
              <Camera className="w-3 h-3 text-[#E5B869]" /> Ángulos de Cámara de Estudio
            </span>
            <div className="flex flex-wrap gap-1.5">
              {cameraPresetsList.map((cam) => {
                const isActive = activeCameraPreset === cam.id;
                return (
                  <button
                    key={cam.id}
                    type="button"
                    onClick={() => onSetCameraPreset(cam.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer border ${
                      isActive 
                        ? 'bg-white/15 text-white border-[#00F0FF]/50 text-[#00F0FF]' 
                        : 'bg-[#111622]/60 text-[#94A3B8] border-white/5 hover:text-white hover:bg-[#1A2234]'
                    }`}
                  >
                    {cam.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Sub-panel: Blindaje PPF & Polarizado Nanocerámico */}
        <div className="md:col-span-6 flex flex-col gap-4 p-5 rounded-3xl glass-panel border border-white/10">
          
          {/* PPF Tier Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF3823] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Blindaje PPF SV Defender
              </span>
              <span className="text-[11px] font-bold text-emerald-400">
                {selectedPPF.warrantyYears ? `${selectedPPF.warrantyYears} Años Garantía` : 'Sin Blindaje'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {ppfProtectionTiers.map((tier) => {
                const isSelected = selectedPPF.id === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => onSelectPPF(tier)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-[#1A2234] border-[#00F0FF]/70 shadow-md shadow-[#00F0FF]/15' 
                        : 'bg-[#111622] border-white/5 hover:bg-[#161D2C] text-[#94A3B8]'
                    }`}
                  >
                    <span className="text-xs font-bold text-white block">
                      {tier.name.split('(')[0]}
                    </span>
                    <span className="text-[10px] text-[#00F0FF] font-semibold mt-1">
                      {tier.priceEstimateSoles > 0 ? `S/ ${tier.priceEstimateSoles.toLocaleString()}` : 'S/ 0'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Window Tint Selector */}
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E5B869] flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5" /> Polarizado Nanocerámico 99% UV
              </span>
              <span className="text-[11px] text-[#94A3B8]">
                {selectedTint.vltPercentage}% Visibilidad
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {windowTintTiers.map((tint) => {
                const isSelected = selectedTint.id === tint.id;
                return (
                  <button
                    key={tint.id}
                    type="button"
                    onClick={() => onSelectTint(tint)}
                    className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-[#1A2234] border-[#E5B869] shadow-md shadow-[#E5B869]/20' 
                        : 'bg-[#111622] border-white/5 hover:bg-[#161D2C] text-[#94A3B8]'
                    }`}
                  >
                    <span className="text-xs font-black text-white block">
                      {tint.vltPercentage}%
                    </span>
                    <span className="text-[9px] text-[#94A3B8] block truncate">
                      {tint.name.split(' ')[1]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Branch Toggle in Studio */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-[#94A3B8] font-medium">Sede de Instalación:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectBranch('dolores')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedBranch === 'dolores'
                    ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Sede Dolores
              </button>
              <button
                type="button"
                onClick={() => onSelectBranch('sachaca')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedBranch === 'sachaca'
                    ? 'bg-[#FF3823]/20 text-[#FF3823] border border-[#FF3823]/40'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Sede Sachaca
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Conversion Bar: Total, SV-Code & WhatsApp Link */}
      <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-[#00F0FF]/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-black/60">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-6 text-center sm:text-left">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-widest block">
              Inversión Estimada
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white">
              S/ {totalPriceSoles.toLocaleString()}{' '}
              <span className="text-xs font-semibold text-[#94A3B8]">PEN</span>
            </span>
          </div>

          <div className="sm:border-l sm:border-white/10 sm:pl-6">
            <span className="text-[10px] uppercase font-bold text-[#00F0FF] tracking-widest block flex items-center gap-1 justify-center sm:justify-start">
              <Cpu className="w-3 h-3" /> SV-Code Canónico
            </span>
            <code className="text-xs font-mono font-bold text-[#E5B869] bg-black/60 px-2 py-0.5 rounded border border-white/10">
              {configCode}
            </code>
          </div>
        </div>

        <a
          href={`https://wa.me/${currentBranchInfo.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm text-black bg-[#00F0FF] hover:bg-[#38f4ff] transition-all shadow-lg shadow-[#00F0FF]/30 hover:shadow-xl hover:shadow-[#00F0FF]/50 active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-black" />
          <span>Cotizar Esta Configuración en WhatsApp</span>
        </a>

      </div>

    </div>
  );
}
