import { describe, it, expect } from 'vitest';
import { colorFinishPresets, ppfProtectionTiers, windowTintTiers, hardwareAddons } from '@/data/finishPresets';

describe('Unit Tests: finishPresets.ts', () => {
  it('should include SV Ultra Obsidian Black as flagship preset', () => {
    const obsidian = colorFinishPresets.find((c) => c.id === 'obsidian-black');
    expect(obsidian).toBeDefined();
    expect(obsidian?.isFlagship).toBe(true);
    expect(obsidian?.hex.toLowerCase()).toBe('#0a0d14');
  });

  it('should include Stealth Satin Grey and Cyber Neon Cyan presets', () => {
    const stealth = colorFinishPresets.find((c) => c.id === 'stealth-satin-grey');
    expect(stealth).toBeDefined();
    expect(stealth?.finishType).toBe('satin');

    const cyan = colorFinishPresets.find((c) => c.id === 'cyber-neon-cyan');
    expect(cyan).toBeDefined();
    expect(cyan?.hex).toBe('#00F0FF');
  });

  it('should validate PPF protection tiers with 10-year warranty on full body', () => {
    const fullGloss = ppfProtectionTiers.find((tier) => tier.id === 'full_gloss');
    expect(fullGloss).toBeDefined();
    expect(fullGloss?.warrantyYears).toBe(10);
    expect(fullGloss?.thicknessMils).toBe(8.5);
    expect(fullGloss?.selfHealing).toBe(true);

    const fullStealth = ppfProtectionTiers.find((tier) => tier.id === 'full_stealth_matte');
    expect(fullStealth).toBeDefined();
    expect(fullStealth?.warrantyYears).toBe(10);
  });

  it('should validate nanoceramic window tint tiers with 99%+ UV rejection', () => {
    windowTintTiers.forEach((tint) => {
      expect(tint.uvRejectionPct).toBeGreaterThanOrEqual(99.0);
      expect(tint.irRejectionPct).toBeGreaterThanOrEqual(90.0);
    });

    const clear70 = windowTintTiers.find((t) => t.id === 'clear_70');
    expect(clear70?.legalInPeru).toBe(true);
  });

  it('should include Valvetronic exhaust and custom caliper addons', () => {
    const exhaust = hardwareAddons.find((a) => a.id === 'valvetronic-titanium');
    expect(exhaust).toBeDefined();
    expect(exhaust?.priceSoles).toBeGreaterThan(2000);
  });
});
