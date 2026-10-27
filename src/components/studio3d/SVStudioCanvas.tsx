'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  Rotate3d, 
  Sparkles, 
  ShieldCheck, 
  Sun, 
  Flame, 
  Layers, 
  Eye, 
  Check, 
  Maximize2
} from 'lucide-react';
import { VehicleModel, ColorFinishPreset, PPFProtectionTier, WindowTintTier } from '@/types';
import { CameraPreset } from './StudioHUD';

interface SVStudioCanvasProps {
  selectedVehicle: VehicleModel;
  selectedColor: ColorFinishPreset;
  selectedPPF: PPFProtectionTier;
  selectedTint: WindowTintTier;
  isNightMode: boolean;
  cameraPreset: CameraPreset;
}

export default function SVStudioCanvas({
  selectedVehicle,
  selectedColor,
  selectedPPF,
  selectedTint,
  isNightMode,
  cameraPreset,
}: SVStudioCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0); // 0 = clean, 100 = scratched
  const [isHealing, setIsHealing] = useState(false);

  // Mouse move 3D spatial perspective tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize from -1 to 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Subtle 3D luxury tilt (max 8 degrees)
    setTilt({
      x: -normY * 6,
      y: normX * 10,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Scratch and thermal healing simulation
  const handleApplyScratch = () => {
    setScratchProgress(100);
  };

  const handleApplyHeat = () => {
    setIsHealing(true);
    let current = 100;
    const interval = setInterval(() => {
      current -= 5;
      if (current <= 0) {
        clearInterval(interval);
        setScratchProgress(0);
        setIsHealing(false);
      } else {
        setScratchProgress(current);
      }
    }, 40);
  };

  // Window Tint Opacity Map
  const tintOpacityMap: Record<string, number> = {
    clear_70: 0.15,
    medium_35: 0.45,
    dark_20: 0.70,
    limo_05: 0.90,
  };

  const activeTintOpacity = tintOpacityMap[selectedTint.id] ?? 0.45;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-[500px] sm:h-[580px] lg:h-[640px] rounded-3xl overflow-hidden transition-all duration-700 select-none shadow-2xl ${
        isNightMode 
          ? 'bg-gradient-to-b from-[#0B0F17] via-[#07090E] to-[#04060A] border border-white/10' 
          : 'bg-gradient-to-b from-[#FFFFFF] via-[#F8F9FA] to-[#E9ECEF] border border-neutral-200'
      }`}
    >
      
      {/* Studio Cyclorama Lighting & Floor Grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Softbox overhead studio light */}
        <div 
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 rounded-full blur-3xl opacity-60 ${
            isNightMode ? 'bg-[#C5A059]/15' : 'bg-white'
          }`} 
        />

        {/* Floor Horizon Line & Soft Ground Studio Spotlight */}
        <div 
          className={`absolute bottom-16 left-1/2 -translate-x-1/2 w-[80%] h-24 rounded-full blur-2xl ${
            isNightMode ? 'bg-[#C5A059]/10' : 'bg-neutral-300/60'
          }`}
        />

        {/* Studio Floor Radial Shadow */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[65%] sm:w-[55%] h-12 bg-black/40 blur-xl rounded-full" />
      </div>

      {/* Floating Interactive HUD Controls (Top Left & Top Right) */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-2 pointer-events-none">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border ${
          isNightMode 
            ? 'bg-black/60 text-white/90 border-white/10' 
            : 'bg-white/80 text-neutral-800 border-neutral-300 shadow-sm'
        }`}>
          <Rotate3d className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Interacción 3D Espacial</span>
        </div>

        {selectedPPF.id === 'full_stealth_matte' && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#141A26] text-[#C5A059] border border-[#C5A059]/40 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" /> Acabado Satinado Stealth
          </span>
        )}
      </div>

      {/* Quick Scratch & Thermal Healing Trigger (Top Right) */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
        {scratchProgress > 0 ? (
          <button
            type="button"
            onClick={handleApplyHeat}
            disabled={isHealing}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#DC2626] text-white hover:bg-[#b91c1c] transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 animate-bounce" />
            <span>{isHealing ? 'Sanando PPF...' : 'Aplicar Calor Térmico'}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleApplyScratch}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
              isNightMode 
                ? 'bg-black/40 text-[#94A3B8] border-white/10 hover:text-white' 
                : 'bg-white/80 text-neutral-600 border-neutral-200 hover:text-black shadow-sm'
            }`}
          >
            <span>Simular Raya en Barniz</span>
          </button>
        )}
      </div>

      {/* =========================================================================
          THE HYPERREALISTIC 3D VEHICLE STAGE
          Real studio cutout with dynamic 3D perspective tilt & physical reflections
          ========================================================================= */}
      <div 
        className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transformStyle: 'preserve-3d',
        }}
      >
        
        {/* Dynamic Studio Shadow Layer beneath car */}
        <div 
          className="absolute bottom-16 sm:bottom-20 w-[68%] sm:w-[58%] h-20 rounded-full blur-2xl transition-all duration-300"
          style={{
            background: isNightMode 
              ? 'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 80%)' 
              : 'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 50%, transparent 75%)',
            transform: `translate(${tilt.y * 1.5}px, ${-tilt.x * 1.2}px)`,
          }}
        />

        {/* The Real Vehicle Image Container */}
        <div className="relative w-[85%] sm:w-[75%] max-w-[850px] aspect-[16/9] flex items-center justify-center">
          
          <Image
            src={selectedVehicle.posterImage}
            alt={`${selectedVehicle.brand} ${selectedVehicle.model} en estudio`}
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 850px"
            className="object-contain studio-car-shadow transition-all duration-500"
            style={{
              filter: isNightMode ? 'drop-shadow(0 20px 30px rgba(0,0,0,0.9))' : 'drop-shadow(0 25px 25px rgba(0,0,0,0.18))',
            }}
          />

          {/* Color Tint / Finish Mask Layer */}
          {selectedColor.id !== 'alpine-white-pearl' && (
            <div 
              className="absolute inset-0 pointer-events-none transition-all duration-500 rounded-3xl"
              style={{
                backgroundColor: selectedColor.hex,
                mixBlendMode: selectedPPF.id === 'full_stealth_matte' ? 'color-burn' : 'overlay',
                opacity: selectedPPF.id === 'full_stealth_matte' ? 0.35 : 0.22,
                maskImage: 'radial-gradient(ellipse at 50% 50%, black 50%, transparent 85%)',
                WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 50%, transparent 85%)',
              }}
            />
          )}

          {/* PPF Stealth Satin Diffusion Sheen Layer */}
          {selectedPPF.id === 'full_stealth_matte' && (
            <div 
              className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.25) 100%)',
                mixBlendMode: 'soft-light',
                opacity: 0.6,
              }}
            />
          )}

          {/* Nanoceramic Window Tint Simulation Layer */}
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-500"
            style={{
              backgroundColor: '#090B10',
              opacity: activeTintOpacity * 0.35,
              mixBlendMode: 'multiply',
              clipPath: 'polygon(20% 25%, 80% 25%, 85% 65%, 15% 65%)', // Cabin window zone mask
            }}
          />

          {/* Simulated Scratches on Hood (when user triggers test) */}
          {scratchProgress > 0 && (
            <div 
              className="absolute top-[38%] left-[32%] w-36 h-12 pointer-events-none transition-opacity duration-300"
              style={{ opacity: scratchProgress / 100 }}
            >
              <svg viewBox="0 0 140 40" className="w-full h-full text-white/80 drop-shadow-md">
                <path d="M5 15 Q 35 8, 65 18 T 130 10" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" fill="none" strokeDasharray="4 2" />
                <path d="M12 25 Q 45 18, 75 28 T 120 22" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" fill="none" />
                <path d="M25 8 Q 55 12, 85 6 T 135 15" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" fill="none" strokeDasharray="6 3" />
              </svg>
            </div>
          )}

        </div>

      </div>

      {/* Bottom Information Bar inside Studio */}
      <div className={`absolute bottom-5 left-5 right-5 z-20 flex flex-wrap items-end justify-between gap-4 pointer-events-none`}>
        
        <div>
          <span className={`text-[10px] uppercase font-bold tracking-[0.2em] block ${
            isNightMode ? 'text-[#C5A059]' : 'text-neutral-500'
          }`}>
            {selectedVehicle.categoryLabel}
          </span>
          <h3 className={`text-xl sm:text-2xl font-black ${
            isNightMode ? 'text-white' : 'text-neutral-900'
          }`}>
            {selectedVehicle.brand} {selectedVehicle.model}
          </h3>
          <span className={`text-xs font-semibold ${
            isNightMode ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            {selectedVehicle.edition} • {selectedColor.name}
          </span>
        </div>

        <div className={`px-4 py-2 rounded-2xl backdrop-blur-md border ${
          isNightMode 
            ? 'bg-black/60 border-white/10 text-white' 
            : 'bg-white/80 border-neutral-300 text-neutral-800 shadow-sm'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span className="text-xs font-bold">{selectedPPF.name.split('(')[0]}</span>
          </div>
          <span className="text-[10px] text-neutral-400 block mt-0.5">
            Polarizado: {selectedTint.name.split(' ')[0]} {selectedTint.vltPercentage}% VLT
          </span>
        </div>

      </div>

    </div>
  );
}
