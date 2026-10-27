import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ExplodedLayers from '@/components/scrollytelling/ExplodedLayers';

describe('Unit Tests: ExplodedLayers Component', () => {
  it('renders section title and layers summary', () => {
    render(<ExplodedLayers />);
    expect(screen.getByText('DESPIECE CINEMÁTICO EN CAPAS')).toBeInTheDocument();
    expect(screen.getByText(/Arquitectura Óptica de Protección Multicapa/i)).toBeInTheDocument();
  });

  it('renders all 4 protection layers in the interactive stack', () => {
    render(<ExplodedLayers />);
    expect(screen.getByText(/Capa 01: Chasis & Sustrato Metálico/i)).toBeInTheDocument();
    expect(screen.getByText(/Capa 02: Pintura OEM & Barniz Original/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Capa 03: PPF SV Defender Ultra \(8.5 Mil\)/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Capa 04: Tratamiento Cerámico 9H Graphene/i)).toBeInTheDocument();
  });

  it('allows clicking a layer to inspect its technical specifications', () => {
    render(<ExplodedLayers />);
    
    // Click on Layer 04 (Ceramic 9H)
    const ceramicBtn = screen.getByRole('button', { name: /Capa 04: Tratamiento Cerámico 9H Graphene/i });
    fireEvent.click(ceramicBtn);

    // Verify 9H spec is visible in detail card
    expect(screen.getByText(/9H Certificado en Escala Mohs/i)).toBeInTheDocument();
  });

  it('triggers heat simulation when clicking the thermal simulator button', () => {
    vi.useFakeTimers();
    render(<ExplodedLayers />);

    const heatBtn = screen.getByRole('button', { name: /Simular Calor Solar Arequipa/i });
    fireEvent.click(heatBtn);

    expect(screen.getByText(/Simulando radiación solar \/ calor a 45°C/i)).toBeInTheDocument();

    // Fast-forward timers inside act
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/Microrrayón reparado por calor térmico/i)).toBeInTheDocument();
    vi.useRealTimers();
  });
});
