import { describe, it, expect } from 'vitest';
import { businessData } from '@/data/businessData';

describe('Unit Tests: businessData.ts', () => {
  it('should have valid business identity and SUNAT registration', () => {
    expect(businessData.brandName).toBe('SV Tuning & Performance');
    expect(businessData.legalName).toBe('SV TUNING AREQUIPA S.A.C.');
    expect(businessData.ruc).toBe('20614788632');
    expect(businessData.founder.name).toBe('Paul Abel Ayamamani López');
  });

  it('should include SEMA Show and 3M master certifications for Paul Ayamamani', () => {
    expect(businessData.founder.achievements).toContain('Asistente y expositor técnico en SEMA Show Las Vegas');
    const has3MCert = businessData.founder.certifications.some((cert) => cert.includes('3M Certified'));
    expect(has3MCert).toBe(true);
  });

  it('should have valid phone and WhatsApp numbers for both branches in Arequipa', () => {
    const { dolores, sachaca } = businessData.branches;

    // Sede Dolores
    expect(dolores.id).toBe('dolores');
    expect(dolores.phone).toBe('960595412');
    expect(dolores.whatsappNumber).toBe('51960595412');
    expect(dolores.address).toContain('Dolores');
    expect(dolores.district).toContain('Bustamante y Rivero');

    // Sede Sachaca
    expect(sachaca.id).toBe('sachaca');
    expect(sachaca.phone).toBe('987507459');
    expect(sachaca.whatsappNumber).toBe('51987507459');
    expect(sachaca.address).toContain('Fernandini');
    expect(sachaca.district).toBe('Sachaca');
    expect(sachaca.features.hasPaintBoothLaminar).toBe(true);
  });

  it('should document extreme UV radiation metrics in Arequipa (14 - 16+ UVI)', () => {
    expect(businessData.uvProtectionNotice.uvIndexArequipa).toContain('16+ UVI');
    expect(businessData.uvProtectionNotice.ppfAdvantageFact).toContain('SV Defender Ultra');
  });

  it('should list all core specialized services with valid pricing and warranty', () => {
    expect(businessData.services.length).toBeGreaterThanOrEqual(5);

    const ppfService = businessData.services.find((s) => s.id === 'ppf-defender-ultra');
    expect(ppfService).toBeDefined();
    expect(ppfService?.warrantyYears).toContain('10 Años');
    expect(ppfService?.startingPriceSoles).toBeGreaterThan(2000);

    const ceramicService = businessData.services.find((s) => s.id === 'ceramic-coating-9h');
    expect(ceramicService).toBeDefined();
    expect(ceramicService?.startingPriceSoles).toBeGreaterThan(1000);

    const tintService = businessData.services.find((s) => s.id === 'nanoceramic-window-tint');
    expect(tintService).toBeDefined();
    expect(tintService?.startingPriceSoles).toBeGreaterThan(500);
  });
});
