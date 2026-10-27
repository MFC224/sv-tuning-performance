import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SV3DStudio from '@/components/studio3d/SV3DStudio';

describe('Unit Tests: SV3DStudio Master Component', () => {
  it('renders section title and introduction', () => {
    render(<SV3DStudio />);
    expect(screen.getByText('SV 3D STUDIO EXPERIENCE')).toBeInTheDocument();
    expect(screen.getByText(/Configurador Fotorrealista PBR en Tiempo Real/i)).toBeInTheDocument();
  });

  it('renders studio HUD controls and color swatches', () => {
    render(<SV3DStudio />);
    expect(screen.getByText(/Color & Acabado PBR/i)).toBeInTheDocument();
    expect(screen.getByText(/Blindaje PPF SV Defender/i)).toBeInTheDocument();
    expect(screen.getByText(/Polarizado Nanocerámico 99% UV/i)).toBeInTheDocument();
  });

  it('renders anchor ID #estudio-3d for direct navigation', () => {
    const { container } = render(<SV3DStudio />);
    expect(container.querySelector('#estudio-3d')).toBeInTheDocument();
  });
});
