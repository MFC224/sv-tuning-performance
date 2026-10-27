import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomePage from '@/app/page';

describe('Integration Tests: Full Home Page Composition', () => {
  it('renders all primary structural sections with valid IDs for navigation', () => {
    const { container } = render(<HomePage />);

    // Check key anchor sections exist
    expect(container.querySelector('#estudio-3d')).toBeInTheDocument();
    expect(container.querySelector('#catalogo')).toBeInTheDocument();
    expect(container.querySelector('#despiece-ppf')).toBeInTheDocument();
    expect(container.querySelector('#historia')).toBeInTheDocument();
    expect(container.querySelector('#servicios')).toBeInTheDocument();
    expect(container.querySelector('#sedes')).toBeInTheDocument();
  });

  it('renders UV extreme radiation warning with local Arequipa context', () => {
    render(<HomePage />);
    expect(screen.getByText(/Alerta de Radiación Solar Arequipa/i)).toBeInTheDocument();
    expect(screen.getByText(/14 - 16\+ UVI/i)).toBeInTheDocument();
  });

  it('renders all four featured vehicles in the catalog', () => {
    render(<HomePage />);
    expect(screen.getAllByText(/Toyota Hilux/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Porsche 911/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Porsche Macan/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Subaru WRX/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders both physical branches in Arequipa with WhatsApp booking buttons', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: /Agendar en Dolores/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Agendar en Sachaca/i })).toBeInTheDocument();
  });

  it('renders footer with valid legal data and credits', () => {
    render(<HomePage />);
    expect(screen.getByText(/SV TUNING AREQUIPA S.A.C. • RUC 20614788632 • Arequipa, Perú/i)).toBeInTheDocument();
  });
});
