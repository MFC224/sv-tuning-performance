import { describe, it, expect } from 'vitest';
import { vehicleCatalog } from '@/data/vehicleCatalog';

describe('Unit Tests: vehicleCatalog.ts', () => {
  it('should contain the curated models representing Peru and SV Tuning social media', () => {
    const slugs = vehicleCatalog.map((v) => v.slug);
    expect(slugs).toContain('toyota-hilux-overland');
    expect(slugs).toContain('porsche-911-gt3');
    expect(slugs).toContain('porsche-macan-turbo');
    expect(slugs).toContain('subaru-wrx');
    expect(slugs).toContain('ford-ranger-raptor');
    expect(slugs).toContain('toyota-land-cruiser-prado');
    expect(slugs).toContain('toyota-fortuner');
    expect(slugs).toContain('bmw-m4-competition');
    expect(slugs).toContain('mercedes-amg-g63');
    expect(slugs).toContain('audi-rs3-sportback');
    expect(vehicleCatalog.length).toBeGreaterThanOrEqual(18);
  });

  it('should verify Toyota Hilux Overland configuration', () => {
    const hilux = vehicleCatalog.find((v) => v.id === 'toyota-hilux-overland')!;
    expect(hilux.category).toBe('overland');
    expect(hilux.specs.idealBranch).toBe('sachaca');
    expect(hilux.specs.power).toContain('204 HP');
    expect(hilux.recommendedPPFThickness).toContain('10.0 Mils');
    expect(hilux.tuningPackagesAvailable).toContain('Snorkel Hermético Safari 4x4');
  });

  it('should verify Porsche 911 GT3 (992) track configuration', () => {
    const porsche = vehicleCatalog.find((v) => v.id === 'porsche-911-gt3')!;
    expect(porsche.category).toBe('supercar');
    expect(porsche.specs.power).toContain('510 HP');
    expect(porsche.specs.engine).toContain('9,000 RPM');
    expect(porsche.recommendedPPFThickness).toContain('8.5 Mils');
  });

  it('should verify Porsche Macan Turbo daily luxury configuration', () => {
    const macan = vehicleCatalog.find((v) => v.id === 'porsche-macan-turbo')!;
    expect(macan.category).toBe('luxury_suv');
    expect(macan.specs.idealBranch).toBe('dolores');
    expect(macan.specs.power).toContain('440 HP');
  });

  it('should verify Subaru WRX Rally & Street spec configuration', () => {
    const wrx = vehicleCatalog.find((v) => v.id === 'subaru-wrx')!;
    expect(wrx.category).toBe('tuner');
    expect(wrx.specs.idealBranch).toBe('sachaca');
    expect(wrx.tuningPackagesAvailable.some((pkg) => pkg.includes('Valvetronic'))).toBe(true);
  });
});
