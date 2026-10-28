'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  Rotate3d, 
  Sparkles, 
  ShieldCheck, 
  Sun, 
  Flame, 
  Layers, 
  Check, 
  Play, 
  Pause,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  Compass
} from 'lucide-react';
import { VehicleModel, ColorFinishPreset, PPFProtectionTier, WindowTintTier } from '@/types';
import { CameraPreset } from './StudioHUD';

interface SV360TurntableProps {
  selectedVehicle: VehicleModel;
  selectedColor: ColorFinishPreset;
  selectedPPF: PPFProtectionTier;
  selectedTint: WindowTintTier;
  isNightMode: boolean;
  cameraPreset: CameraPreset;
  onSetCameraPreset?: (preset: CameraPreset) => void;
}

// 24 Discrete Angles covering 360 degrees around the vehicle (every 15 degrees)
const TOTAL_FRAMES = 24;

export default function SV360Turntable({
  selectedVehicle,
  selectedColor,
  selectedPPF,
  selectedTint,
  isNightMode,
  cameraPreset,
  onSetCameraPreset,
}: SV360TurntableProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Turntable Interactive States
  const [currentFrame, setCurrentFrame] = useState(3); // Default to 3/4 Front (~45 degrees)
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startFrame, setStartFrame] = useState(3);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 1x to 2x zoom
  const [scratchProgress, setScratchProgress] = useState(0); // 0 = clean, 100 = scratched
  const [isHealing, setIsHealing] = useState(false);
  const [velocity, setVelocity] = useState(0);

  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const momentumAnimRef = useRef<number | null>(null);

  // Map camera presets to exact turntable frame indices (24 frames = 15° per frame)
  // Frame 0: Front (0°)
  // Frame 3: 3/4 Front (45°)
  // Frame 6: Side Profile (90°)
  // Frame 9: 3/4 Rear (135°)
  // Frame 12: Direct Rear (180°)
  // Frame 15: 3/4 Rear Opposite (225°)
  // Frame 18: Side Opposite (270°)
  // Frame 21: 3/4 Front Opposite (315°)
  useEffect(() => {
    switch (cameraPreset) {
      case 'front':
        setCurrentFrame(0);
        break;
      case 'threeQuarterFront':
        setCurrentFrame(3);
        break;
      case 'side':
        setCurrentFrame(6);
        break;
      case 'threeQuarterRear':
        setCurrentFrame(9);
        break;
      case 'top':
        setCurrentFrame(3);
        break;
    }
  }, [cameraPreset]);

  // Turntable Drag Interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartFrame(currentFrame);
    setVelocity(0);
    if (momentumAnimRef.current) cancelAnimationFrame(momentumAnimRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const deltaX = e.clientX - startX;
    const sensitivity = 14; // pixels per frame
    const frameOffset = Math.floor(deltaX / sensitivity);
    const newFrame = (startFrame - frameOffset + TOTAL_FRAMES * 100) % TOTAL_FRAMES;
    setCurrentFrame(newFrame);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      setStartFrame(currentFrame);
      if (momentumAnimRef.current) cancelAnimationFrame(momentumAnimRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startX;
    const sensitivity = 12;
    const frameOffset = Math.floor(deltaX / sensitivity);
    const newFrame = (startFrame - frameOffset + TOTAL_FRAMES * 100) % TOTAL_FRAMES;
    setCurrentFrame(newFrame);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Auto-Rotate Turntable Loop
  useEffect(() => {
    if (isAutoRotating) {
      autoRotateIntervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % TOTAL_FRAMES);
      }, 120); // ~8.3 fps smooth turntable rotation
    } else if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
    }
    return () => {
      if (autoRotateIntervalRef.current) clearInterval(autoRotateIntervalRef.current);
    };
  }, [isAutoRotating]);

  // Current Rotation in Degrees for HUD
  const currentAngleDegrees = Math.round((currentFrame / TOTAL_FRAMES) * 360);

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
    }, 50);
  };

  // Determine current perspective badge label
  const getPerspectiveLabel = (frame: number) => {
    if (frame >= 23 || frame <= 1) return 'Perspectiva Frontal (0°)';
    if (frame >= 2 && frame <= 4) return '3/4 Frontal Izquierda (45°)';
    if (frame >= 5 && frame <= 7) return 'Perfil Lateral Izquierdo (90°)';
    if (frame >= 8 && frame <= 10) return '3/4 Trasera Izquierda (135°)';
    if (frame >= 11 && frame <= 13) return 'Perspectiva Trasera (180°)';
    if (frame >= 14 && frame <= 16) return '3/4 Trasera Derecha (225°)';
    if (frame >= 17 && frame <= 19) return 'Perfil Lateral Derecho (270°)';
    return '3/4 Frontal Derecha (315°)';
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-[520px] sm:h-[600px] lg:h-[660px] rounded-3xl overflow-hidden select-none shadow-2xl transition-all duration-700 cursor-grab active:cursor-grabbing border ${
        isNightMode 
          ? 'bg-[#07090E] border-white/10 shadow-black' 
          : 'bg-gradient-to-b from-[#FFFFFF] via-[#F8F9FA] to-[#E9ECEF] border-neutral-200'
      }`}
    >
      {/* Studio Cyclorama Lighting & Contact Floor Shadow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Softbox overhead studio light */}
        <div 
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 rounded-full blur-3xl opacity-70 ${
            isNightMode ? 'bg-[#C5A059]/15' : 'bg-white'
          }`} 
        />

        {/* Studio Floor Horizon Line & Soft Ground Spotlight */}
        <div 
          className={`absolute bottom-16 left-1/2 -translate-x-1/2 w-[82%] h-24 rounded-full blur-2xl ${
            isNightMode ? 'bg-[#C5A059]/10' : 'bg-neutral-300/60'
          }`}
        />

        {/* Studio Floor Contact Radial Shadow */}
        <div 
          className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[70%] sm:w-[58%] h-14 rounded-full blur-xl transition-all duration-300"
          style={{
            background: isNightMode 
              ? 'radial-gradient(ellipse, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 75%)'
              : 'radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.18) 50%, transparent 75%)',
          }}
        />

        {/* Circular Turntable Floor Ring (360 Degree Dial) */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[68%] sm:w-[55%] h-14 border border-dashed rounded-full pointer-events-none transition-colors opacity-35 border-[#C5A059]" />
      </div>

      {/* Floating Interactive Controls (Top Left & Top Right) */}
      <div className="absolute top-5 left-5 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
        {/* Drag Instruction Badge */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border ${
          isNightMode 
            ? 'bg-black/75 text-white/90 border-white/15' 
            : 'bg-white/90 text-neutral-800 border-neutral-300 shadow-sm'
        }`}>
          <Rotate3d className="w-3.5 h-3.5 text-[#C5A059] animate-spin" style={{ animationDuration: '6s' }} />
          <span>Arrastra 360° para girar</span>
        </div>

        {/* Compass Angle Badge */}
        <div className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold backdrop-blur-md border ${
          isNightMode ? 'bg-black/60 text-[#C5A059] border-white/10' : 'bg-white/80 text-neutral-800 border-neutral-200'
        }`}>
          <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{currentAngleDegrees}°</span>
        </div>
      </div>

      {/* Top Right Toolset: Auto-Rotate & Scratch Simulator & Zoom */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
        
        {/* Zoom Toggle */}
        <button
          type="button"
          onClick={() => setZoomLevel(zoomLevel === 1 ? 1.45 : 1)}
          className={`p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
            zoomLevel > 1
              ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-md'
              : isNightMode
                ? 'bg-black/60 text-white/80 border-white/10 hover:text-white'
                : 'bg-white/80 text-neutral-700 border-neutral-200 hover:text-black shadow-sm'
          }`}
          title={zoomLevel > 1 ? 'Alejar zoom' : 'Acercar inspección de barniz (Lupa 1.5x)'}
        >
          {zoomLevel > 1 ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
        </button>

        {/* Auto-Rotate Turntable Toggle */}
        <button
          type="button"
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all cursor-pointer ${
            isAutoRotating
              ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-md'
              : isNightMode
                ? 'bg-black/60 text-white/80 border-white/10 hover:text-white'
                : 'bg-white/80 text-neutral-700 border-neutral-200 hover:text-black shadow-sm'
          }`}
          title="Activar giro continuo de salón"
        >
          {isAutoRotating ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span className="hidden sm:inline">{isAutoRotating ? 'Pausar Giro' : 'Giro 360°'}</span>
        </button>

        {/* Scratch & Heal Thermal Simulator */}
        {scratchProgress === 0 ? (
          <button
            type="button"
            onClick={handleApplyScratch}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
              isNightMode 
                ? 'bg-black/60 text-white/70 border-white/10 hover:text-white' 
                : 'bg-white/80 text-neutral-600 border-neutral-200 hover:text-black shadow-sm'
            }`}
          >
            <span>Simular Raya en Barniz</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleApplyHeat}
            disabled={isHealing}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FF3823] hover:bg-[#ff5542] text-white shadow-lg shadow-[#FF3823]/30 transition-all cursor-pointer active:scale-95 animate-pulse"
          >
            <Flame className="w-3.5 h-3.5 fill-white" />
            <span>{isHealing ? 'Curando...' : 'Aplicar Calor Térmico'}</span>
          </button>
        )}
      </div>

      {/* Main Vehicle Showcase Centerpiece */}
      <div 
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${zoomLevel})`,
        }}
      >
        <div className="relative w-[86%] sm:w-[76%] max-w-[850px] aspect-[16/9] flex items-center justify-center">
          
          {/* Real Commercial Catalog Vehicle Rendering */}
          <Image
            src={selectedVehicle.posterImage}
            alt={`${selectedVehicle.brand} ${selectedVehicle.model} en SV Tuning Arequipa`}
            fill
            sizes="(max-width: 1024px) 95vw, 850px"
            priority
            className="object-contain drop-shadow-2xl transition-all duration-300"
            style={{
              filter: selectedPPF.id === 'full_stealth_matte'
                ? 'saturate(0.9) contrast(1.05) brightness(0.95)'
                : 'contrast(1.08) brightness(1.02)',
              // Micro spatial tilt during 360 degree drag based on angle
              transform: `rotateY(${(currentFrame - 3) * 1.5}deg)`,
            }}
          />

          {/* Dynamic Finish Tint & Clearcoat PBR Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-color opacity-30 transition-all duration-500 rounded-2xl"
            style={{
              backgroundColor: selectedColor.hex,
            }}
          />

          {/* Window Nanoceramic Tint VLT Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-multiply transition-opacity duration-500"
            style={{
              opacity: (100 - selectedTint.vltPercentage) / 100 * 0.45,
              backgroundColor: '#07090E',
            }}
          />

          {/* Interactive Scratch Simulation Overlay */}
          {scratchProgress > 0 && (
            <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
              <div 
                className="w-48 sm:w-64 h-1.5 bg-white/95 rounded-full blur-[1px] rotate-[-22deg] shadow-lg transition-opacity duration-300"
                style={{ 
                  opacity: scratchProgress / 100,
                  boxShadow: '0 0 14px rgba(255, 255, 255, 0.9), 0 0 28px rgba(255, 56, 35, 0.5)'
                }}
              />
            </div>
          )}

        </div>
      </div>

      {/* Bottom Status & Vehicle Telemetry */}
      <div className="absolute bottom-5 left-5 z-20 pointer-events-none">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block">
          {selectedVehicle.categoryLabel}
        </span>
        <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isNightMode ? 'text-white' : 'text-neutral-900'}`}>
          {selectedVehicle.brand} {selectedVehicle.model}
        </h3>
        <span className="text-xs text-[#C5A059] font-medium block">
          {selectedVehicle.edition} • {selectedColor.name}
        </span>
        <span className="text-[11px] text-[#94A3B8] font-mono mt-0.5 block">
          {getPerspectiveLabel(currentFrame)}
        </span>
      </div>

      {/* Bottom Right PPF Protection Details */}
      <div className="absolute bottom-5 right-5 z-20 pointer-events-none hidden sm:flex items-center gap-2">
        <div className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold backdrop-blur-md border ${
          isNightMode 
            ? 'bg-black/75 text-white/90 border-white/10' 
            : 'bg-white/90 text-neutral-800 border-neutral-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span>{selectedPPF.name}</span>
          </div>
          <span className="block text-[10px] font-normal text-[#94A3B8] mt-0.5">
            Polarizado: {selectedTint.name} ({selectedTint.vltPercentage}% VLT)
          </span>
        </div>
      </div>

    </div>
  );
}
