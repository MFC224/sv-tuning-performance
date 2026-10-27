import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StudioHUD from '@/components/studio3d/StudioHUD';
import { vehicleCatalog } from '@/data/vehicleCatalog';
import { colorFinishPresets, ppfProtectionTiers, windowTintTiers } from '@/data/finishPresets';

describe('Unit Tests: StudioHUD Component', () => {
  const defaultProps = {
    selectedVehicle: vehicleCatalog[1], // Porsche 911 GT3
    onSelectVehicle: vi.fn(),
    selectedColor: colorFinishPresets[0], // Obsidian Black
    onSelectColor: vi.fn(),
    selectedPPF: ppfProtectionTiers[2], // Full Gloss
    onSelectPPF: vi.fn(),
    selectedTint: windowTintTiers[1], // Medium 35%
    onSelectTint: vi.fn(),
    isNightMode: true,
    onToggleNightMode: vi.fn(),
    onSetCameraPreset: vi.fn(),
    activeCameraPreset: 'threeQuarterFront' as const,
    selectedBranch: 'sachaca' as const,
    onSelectBranch: vi.fn(),
  };

  it('renders all 4 vehicle buttons in the studio header', () => {
    render(<StudioHUD {...defaultProps} />);
    expect(screen.getByRole('button', { name: /Toyota Hilux/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Porsche 911/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Porsche Macan/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Subaru WRX/i })).toBeInTheDocument();
  });

  it('calls onSelectVehicle when clicking a different car', () => {
    render(<StudioHUD {...defaultProps} />);
    const hiluxBtn = screen.getByRole('button', { name: /Toyota Hilux/i });
    fireEvent.click(hiluxBtn);
    expect(defaultProps.onSelectVehicle).toHaveBeenCalledWith(vehicleCatalog[0]);
  });

  it('toggles Day/Night lighting mode', () => {
    render(<StudioHUD {...defaultProps} />);
    const modeBtn = screen.getByRole('button', { name: /Noche Neón/i });
    fireEvent.click(modeBtn);
    expect(defaultProps.onToggleNightMode).toHaveBeenCalled();
  });

  it('renders all canonical camera preset buttons', () => {
    render(<StudioHUD {...defaultProps} />);
    expect(screen.getByRole('button', { name: '3/4 Frontal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Lateral' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3/4 Trasera' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Frontal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cenital' })).toBeInTheDocument();
  });

  it('calls onSetCameraPreset when a camera angle is selected', () => {
    render(<StudioHUD {...defaultProps} />);
    const sideBtn = screen.getByRole('button', { name: 'Lateral' });
    fireEvent.click(sideBtn);
    expect(defaultProps.onSetCameraPreset).toHaveBeenCalledWith('side');
  });

  it('calculates investment price in Soles and generates canonical SV-Code', () => {
    render(<StudioHUD {...defaultProps} />);
    // Total price = Full Gloss (6,900) + Medium 35 (650) = 7,550
    expect(screen.getByText(/7[.,]?550/i)).toBeInTheDocument();
    // SV-Code contains vehicle brand, color, PPF tier, and branch
    expect(screen.getByText(/SVT-POR/i)).toBeInTheDocument();
  });

  it('renders WhatsApp booking button with prefilled configuration text', () => {
    render(<StudioHUD {...defaultProps} />);
    const waLink = screen.getByRole('link', { name: /Cotizar Esta Configuración en WhatsApp/i });
    expect(waLink).toBeInTheDocument();
    expect(waLink.getAttribute('href')).toContain('51987507459'); // Sachaca phone
    expect(waLink.getAttribute('href')).toContain('Porsche');
  });
});
