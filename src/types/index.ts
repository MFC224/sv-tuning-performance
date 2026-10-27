// ============================================================================
// SV TUNING & PERFORMANCE - TYPE DEFINITIONS (SPRINT 1)
// Master architecture for Ultra-Luxury Automotive Detailing & Tuning Ecosystem
// ============================================================================

export type BranchId = 'dolores' | 'sachaca';

export interface BranchInfo {
  id: BranchId;
  name: string;
  tagline: string;
  address: string;
  district: string;
  city: string;
  department: string;
  country: string;
  googleMapsUrl: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappMessagePreset: string;
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  isOpenNow: boolean;
  specialties: string[];
  features: {
    hasPaintBoothLaminar: boolean;
    hasDynoTuning: boolean;
    hasCleanRoomPPF: boolean;
    hasVipLounge: boolean;
  };
}

export interface BusinessData {
  brandName: string;
  legalName: string;
  ruc: string;
  founder: {
    name: string;
    role: string;
    bioShort: string;
    originStory: string;
    achievements: string[];
    certifications: string[];
  };
  socialProof: {
    googleRating: number;
    googleReviewCount: number;
    tiktokHandle: string;
    tiktokFollowers: string;
    tiktokUrl: string;
    instagramHandle: string;
    instagramUrl: string;
    facebookHandle: string;
    facebookUrl: string;
  };
  branches: Record<BranchId, BranchInfo>;
  services: ServiceCategory[];
  uvProtectionNotice: {
    uvIndexArequipa: string; // "14 - 16+ UVI Extremo"
    sunDamageFact: string;
    ppfAdvantageFact: string;
  };
}

export interface ServiceCategory {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  badge?: string;
  warrantyYears: number | string;
  featuredSpecs: string[];
  startingPriceSoles: number;
}

// Vehicle Catalog Interfaces
export type VehicleCategory = 'overland' | 'supercar' | 'luxury_suv' | 'tuner';

export interface VehicleSpec {
  engine: string;
  power: string;
  drivetrain: string;
  bodyStyle: string;
  recommendedService: string;
  idealBranch: BranchId;
}

export interface VehicleModel {
  id: string;
  slug: string;
  brand: string;
  model: string;
  edition: string;
  category: VehicleCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  specs: VehicleSpec;
  posterImage: string;
  accentColor: string;
  badges: string[];
  tuningPackagesAvailable: string[];
  dimensions: {
    lengthMm: number;
    widthMm: number;
    heightMm: number;
  };
  recommendedPPFThickness: string;
}

// Finish & Customization Presets
export type FinishType = 'paint' | 'wrap' | 'ppf' | 'tint';

export interface ColorFinishPreset {
  id: string;
  name: string;
  hex: string;
  finishType: 'gloss' | 'satin' | 'matte' | 'metallic' | 'iridescent';
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  description: string;
  isFlagship?: boolean;
}

export interface PPFProtectionTier {
  id: 'none' | 'track_pack' | 'full_gloss' | 'full_stealth_matte';
  name: string;
  subname: string;
  thicknessMils: number;
  selfHealing: boolean;
  warrantyYears: number;
  description: string;
  priceEstimateSoles: number;
  recommendedFor: string;
}

export interface WindowTintTier {
  id: 'clear_70' | 'medium_35' | 'dark_20' | 'limo_05';
  vltPercentage: number;
  name: string;
  type: string;
  irRejectionPct: number;
  uvRejectionPct: number;
  description: string;
  legalInPeru: boolean;
}

export interface QuotationConfig {
  vehicleId: string;
  branchId: BranchId;
  finishColorId: string;
  ppfTierId: string;
  windowTintId: string;
  includeValvetronicExhaust: boolean;
  includeBrakeCaliperCustomization: boolean;
  customerName?: string;
  customerPhone?: string;
}
