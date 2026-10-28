'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Camera, 
  MessageCircle, 
  Cpu, 
  Check
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
• Acabado: ${selectedColor.name}
• Blindaje: ${selectedPPF.name}
• Polarizado: ${selectedTint.name}
• Sede: ${currentBranchInfo.name}
• Código: ${configCode}
• Presupuesto Estimado: S/ ${totalPriceSoles.toLocaleString()}

¿Podemos coordinar la fecha para la evaluación técnica?`;

  const cameraPresetsList: { id: CameraPreset; label: string }[] = [
    { id: 'threeQuarterFront', label: '3/4 Frontal' },
    { id: 'side', label: 'Lateral' },
    { id: 'threeQuarterRear', label: '3/4 Trasera' },
    { id: 'front', label: 'Frontal' },
  ];

  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: `Todos (${vehicleCatalog.length})` },
    { id: 'overland', label: 'Overland 4x4' },
    { id: 'luxury_suv', label: 'SUVs de Lujo' },
    { id: 'supercar', label: 'Superdeportivos' },
    { id: 'tuner', label: 'Street Tuner' },
  ];

  const filteredVehicles = categoryFilter === 'all'
    ? vehicleCatalog
    : vehicleCatalog.filter(v => v.category === categoryFilter);

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* Top Bar: Vehicle Selector & Lighting Toggle */}
      <div className="flex flex-col gap-3 p-4 rounded-2xl bg-[#0F131C] border border-white/10">
        
        {/* Category Pills Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-widest mr-2">
              Categoría:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-[#C5A059] text-black font-bold shadow-sm'
                    : 'bg-[#141A26] text-[#94A3B8] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Studio Lighting Toggle (Studio White / Studio Dark) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleNightMode}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                !isNightMode 
                  ? 'bg-white text-black border-white shadow-sm' 
                  : 'bg-[#141A26] text-[#94A3B8] border-white/10 hover:text-white'
              }`}
            >
              {isNightMode ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Estudio Noche</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Estudio Blanco</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Vehicle Tabs */}
        <div className="flex flex-wrap items-center gap-2 max-h-36 overflow-y-auto pr-1">
          {filteredVehicles.map((v) => {
            const isSelected = selectedVehicle.id === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onSelectVehicle(v)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-black shadow-md'
                    : 'bg-[#141A26] text-[#94A3B8] hover:text-white hover:bg-[#1A2232]'
                }`}
              >
                {v.brand} {v.model}
              </button>
            );
          })}
        </div>

      </div>

      {/* Main HUD Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Left Sub-panel: Finish & Color Swatches */}
        <div className="md:col-span-6 flex flex-col gap-4 p-6 rounded-3xl bg-[#0F131C] border border-white/10">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> Acabado & Color de Carrocería
            </span>
            <span className="text-xs text-[#C5A059] font-medium">
              {selectedColor.name}
            </span>
          </div>

          {/* Color Circles */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
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
                      ? 'border-[#C5A059] scale-110 shadow-lg ring-2 ring-[#C5A059]/40' 
                      : 'border-white/15 hover:border-white/40 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && (
                    <Check className={`w-4 h-4 ${color.hex === '#F4F7FB' || color.hex === '#FFFFFF' || color.hex === '#E5E7EB' ? 'text-black' : 'text-white'}`} />
                  )}
                  {color.isFlagship && !isSelected && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C5A059]" />
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#94A3B8] leading-relaxed pt-2 border-t border-white/10">
            {selectedColor.description}
          </p>

          {/* Angle Presets */}
          <div className="pt-3 border-t border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-widest block mb-2 flex items-center gap-1.5">
              <Camera className="w-3 h-3 text-[#C5A059]" /> Perspectivas de Cámara
            </span>
            <div className="flex flex-wrap gap-2">
              {cameraPresetsList.map((cam) => {
                const isActive = activeCameraPreset === cam.id;
                return (
                  <button
                    key={cam.id}
                    type="button"
                    onClick={() => onSetCameraPreset(cam.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      isActive 
                        ? 'bg-white text-black border-white shadow-sm' 
                        : 'bg-[#141A26] text-[#94A3B8] border-white/5 hover:text-white'
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
        <div className="md:col-span-6 flex flex-col gap-4 p-6 rounded-3xl bg-[#0F131C] border border-white/10">
          
          {/* PPF Tier Selector */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" /> Blindaje PPF SV Defender
              </span>
              <span className="text-[11px] font-bold text-emerald-400">
                {selectedPPF.warrantyYears ? `${selectedPPF.warrantyYears} Años Garantía Escrita` : 'Sin Blindaje'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {ppfProtectionTiers.map((tier) => {
                const isSelected = selectedPPF.id === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => onSelectPPF(tier)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-[#1A2232] border-[#C5A059]/60 shadow-md' 
                        : 'bg-[#141A26] border-white/5 hover:bg-[#1A2232] text-[#94A3B8]'
                    }`}
                  >
                    <span className="text-xs font-bold text-white block">
                      {tier.name.split('(')[0]}
                    </span>
                    <span className="text-[11px] text-[#C5A059] font-semibold mt-1">
                      {tier.priceEstimateSoles > 0 ? `S/ ${tier.priceEstimateSoles.toLocaleString()}` : 'S/ 0'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Window Tint Selector */}
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Sun className="w-3.5 h-3.5 text-[#C5A059]" /> Polarizado Nanocerámico Térmico 99% UV
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
                        ? 'bg-[#1A2232] border-[#C5A059] shadow-md text-white' 
                        : 'bg-[#141A26] border-white/5 hover:bg-[#1A2232] text-[#94A3B8]'
                    }`}
                  >
                    <span className="text-xs font-black block">
                      {tint.vltPercentage}%
                    </span>
                    <span className="text-[10px] text-[#94A3B8] block truncate">
                      {tint.name.split(' ')[1]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Branch Selector in Studio */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-[#94A3B8]">Sede Asignada:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectBranch('dolores')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedBranch === 'dolores'
                    ? 'bg-[#1A2232] text-white border border-[#C5A059]/40'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Sede Dolores
              </button>
              <button
                type="button"
                onClick={() => onSelectBranch('sachaca')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedBranch === 'sachaca'
                    ? 'bg-[#1A2232] text-white border border-[#C5A059]/40'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Sede Sachaca
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Conversion Bar: Total, SV-Code & WhatsApp Button */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0F131C] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-5 shadow-2xl shadow-black">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 text-center sm:text-left">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-widest block">
              Inversión Estimada
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white">
              S/ {totalPriceSoles.toLocaleString()}{' '}
              <span className="text-xs font-semibold text-[#94A3B8]">PEN</span>
            </span>
          </div>

          <div className="sm:border-l sm:border-white/10 sm:pl-8">
            <span className="text-[10px] uppercase font-bold text-[#C5A059] tracking-widest block flex items-center gap-1.5 justify-center sm:justify-start">
              <Cpu className="w-3.5 h-3.5" /> SV-Code Canónico
            </span>
            <code className="text-xs font-mono font-bold text-white bg-black/50 px-2.5 py-1 rounded-md border border-white/10 mt-0.5 inline-block">
              {configCode}
            </code>
          </div>
        </div>

        <a
          href={`https://wa.me/${currentBranchInfo.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all shadow-xl active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-black" />
          <span>Cotizar Configuración en WhatsApp</span>
        </a>

      </div>

    </div>
  );
}
