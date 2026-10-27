import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FounderStoryTimeline from '@/components/story/FounderStoryTimeline';

describe('Unit Tests: FounderStoryTimeline Component', () => {
  it('renders section title and story intro', () => {
    render(<FounderStoryTimeline />);
    expect(screen.getByText('DE UN TALLER DE 2X2M AL SEMA SHOW')).toBeInTheDocument();
    expect(screen.getByText(/Paul Abel Ayamamani López/i)).toBeInTheDocument();
  });

  it('renders all 5 milestone years (2018, 2020, 2022, 2024, 2026)', () => {
    render(<FounderStoryTimeline />);
    expect(screen.getAllByText('2018').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('2020').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('2022').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('2024').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('2026').length).toBeGreaterThanOrEqual(1);
  });

  it('allows switching milestone to view 2018 beginnings', () => {
    render(<FounderStoryTimeline />);

    const milestone2018 = screen.getAllByText('2018')[0];
    fireEvent.click(milestone2018);

    expect(screen.getByText(/El Comienzo: Taller de 2x2m con \$100/i)).toBeInTheDocument();
    expect(screen.getByText('$100 USD')).toBeInTheDocument();
  });

  it('displays official company credentials (RUC and legal name)', () => {
    render(<FounderStoryTimeline />);
    expect(screen.getByText('20614788632')).toBeInTheDocument();
    expect(screen.getByText('SV TUNING AREQUIPA S.A.C.')).toBeInTheDocument();
  });
});
