'use client';

import React from 'react';
import { VehicleModel, ColorFinishPreset, PPFProtectionTier, WindowTintTier } from '@/types';
import { CameraPreset } from './StudioHUD';
import SVStudioCanvas from './SVStudioCanvas';

interface SV360TurntableProps {
  selectedVehicle: VehicleModel;
  selectedColor: ColorFinishPreset;
  selectedPPF: PPFProtectionTier;
  selectedTint: WindowTintTier;
  isNightMode: boolean;
  cameraPreset: CameraPreset;
  onSetCameraPreset?: (preset: CameraPreset) => void;
}

/**
 * SV360Turntable
 * High-performance 360-degree automotive turntable viewer powered by Three.js WebGL.
 * Replaces legacy 2D billboards with full CAD-grade 3D geometry, PBR clearcoat shaders,
 * contact ambient occlusion floor shadows, and true horizontal turntable axis rotation.
 */
export default function SV360Turntable({
  selectedVehicle,
  selectedColor,
  selectedPPF,
  selectedTint,
  isNightMode,
  cameraPreset,
  onSetCameraPreset,
}: SV360TurntableProps) {
  return (
    <SVStudioCanvas
      selectedVehicle={selectedVehicle}
      selectedColor={selectedColor}
      selectedPPF={selectedPPF}
      selectedTint={selectedTint}
      isNightMode={isNightMode}
      cameraPreset={cameraPreset}
      onSetCameraPreset={onSetCameraPreset}
    />
  );
}
