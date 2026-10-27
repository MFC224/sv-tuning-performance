import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeroCinematic from '@/components/hero/HeroCinematic';

describe('Unit Tests: HeroCinematic Component', () => {
  it('renders main headline and authority badges', () => {
    render(<HeroCinematic />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/BLINDAJE ÓPTICO PPF/i);
    expect(screen.getByText(/SEMA Show Las Vegas/i)).toBeInTheDocument();
    expect(screen.getByText(/Paul Abel Ayamamani López/i)).toBeInTheDocument();
  });

  it('displays verified social proof metrics', () => {
    render(<HeroCinematic />);
    expect(screen.getByText('4.9')).toBeInTheDocument();
    expect(screen.getByText('64.2K+')).toBeInTheDocument();
    expect(screen.getByText('10 Años')).toBeInTheDocument();
  });

  it('allows toggling between Sede Dolores and Sede Sachaca', () => {
    render(<HeroCinematic />);

    const sachacaBtn = screen.getByRole('button', { name: /^Sachaca$/i });
    fireEvent.click(sachacaBtn);

    // Verify WhatsApp button now points to Sede Sachaca
    const ctaLink = screen.getByRole('link', { name: /Asesoría en Sede Sachaca/i });
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink.getAttribute('href')).toContain('51987507459');
  });
});
