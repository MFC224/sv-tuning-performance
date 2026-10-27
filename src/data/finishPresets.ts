import { ColorFinishPreset, PPFProtectionTier, WindowTintTier } from '@/types';

export const colorFinishPresets: ColorFinishPreset[] = [
  {
    id: 'obsidian-black',
    name: 'SV Ultra Obsidian Black',
    hex: '#0A0D14',
    finishType: 'gloss',
    roughness: 0.12,
    metalness: 0.85,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    description: 'Negro piano ultra profundo con reflejos cristalinos de cuarzo líquido. Acabado insignia de SV Tuning.',
    isFlagship: true
  },
  {
    id: 'stealth-satin-grey',
    name: 'Stealth Satin Matte Gunmetal',
    hex: '#2B2F38',
    finishType: 'satin',
    roughness: 0.42,
    metalness: 0.70,
    clearcoat: 0.3,
    clearcoatRoughness: 0.40,
    description: 'Transformación satinada mate mediante PPF SV Defender Stealth. Difunde la luz y resalta líneas de carrocería.',
    isFlagship: true
  },
  {
    id: 'cyber-neon-cyan',
    name: 'Cyber Neon Cyan Metallic',
    hex: '#00F0FF',
    finishType: 'metallic',
    roughness: 0.20,
    metalness: 0.90,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    description: 'Cian neón electrizante con escamas metálicas iridiscentes. Inspirado en el ambiente nocturno del taller.',
    isFlagship: true
  },
  {
    id: 'racing-rosso-corsa',
    name: 'Racing Rosso Performance Red',
    hex: '#FF1F1F',
    finishType: 'gloss',
    roughness: 0.15,
    metalness: 0.65,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    description: 'Rojo carreras puro de competición. Acabado brillante de alto impacto visual y saturación profunda.'
  },
  {
    id: 'nardo-chalk-grey',
    name: 'Nardo Chalk Combat Grey',
    hex: '#8C929D',
    finishType: 'gloss',
    roughness: 0.18,
    metalness: 0.25,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    description: 'Gris tiza no metálico de estilo Nürburgring. El color contemporáneo más cotizado en superdeportivos.'
  },
  {
    id: 'alpine-white-pearl',
    name: 'Alpine White Diamond Pearl',
    hex: '#F4F7FB',
    finishType: 'metallic',
    roughness: 0.14,
    metalness: 0.40,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    description: 'Blanco perla inmaculado con destellos iridiscentes al mediodía bajo el sol arequipeño.'
  },
  {
    id: 'overland-desert-sand',
    name: 'Overland Sahara Matte Tan',
    hex: '#B89C72',
    finishType: 'matte',
    roughness: 0.60,
    metalness: 0.15,
    clearcoat: 0.0,
    clearcoatRoughness: 0.60,
    description: 'Tono arena táctico mate militar diseñado para expedición y rutas desérticas de la costa sur.'
  }
];

export const ppfProtectionTiers: PPFProtectionTier[] = [
  {
    id: 'none',
    name: 'Sin Blindaje PPF',
    subname: 'Pintura expuesta a la intemperie',
    thicknessMils: 0,
    selfHealing: false,
    warrantyYears: 0,
    description: 'La carrocería conserva el barniz de fábrica sin protección física adicional contra gravilla ni rayos UV.',
    priceEstimateSoles: 0,
    recommendedFor: 'Vehículos de exhibición en interiores o con fines exclusivamente estéticos temporales.'
  },
  {
    id: 'track_pack',
    name: 'Track Pack (Zonas de Alto Impacto)',
    subname: 'Capó completo, parachoques frontal, faros LED, espejos y guardabarros',
    thicknessMils: 8.5,
    selfHealing: true,
    warrantyYears: 7,
    description: 'Protege las superficies que reciben el 90% de los impactos de piedras a alta velocidad en autopistas interprovinciales.',
    priceEstimateSoles: 3200,
    recommendedFor: 'Autos de uso diario y viajes frecuentes en carretera Panamericana Sur o Arequipa-Mollendo.'
  },
  {
    id: 'full_gloss',
    name: 'Full Body Gloss SV Defender Ultra',
    subname: 'Blindaje total de carrocería en acabado hiperbrillante cristalino',
    thicknessMils: 8.5,
    selfHealing: true,
    warrantyYears: 10,
    description: 'Cobertura del 100% de paneles pintados con película autorregenerativa óptica que magnifica el brillo original del auto.',
    priceEstimateSoles: 6900,
    recommendedFor: 'Superdeportivos, SUVs de alta gama y propietarios que exigen conservación del 100% del valor de reventa.'
  },
  {
    id: 'full_stealth_matte',
    name: 'Full Body Stealth Satin SV Defender',
    subname: 'Blindaje total con conversión instantánea a acabado satín mate militar',
    thicknessMils: 8.5,
    selfHealing: true,
    warrantyYears: 10,
    description: 'Transforma cualquier color brillante de fábrica en una terminación satinada mate de fábrica, sumando máxima protección física.',
    priceEstimateSoles: 7500,
    recommendedFor: 'Vehículos premium que buscan un aspecto intimidante y exclusivo sin someter el auto a pintura permanente.'
  }
];

export const windowTintTiers: WindowTintTier[] = [
  {
    id: 'clear_70',
    vltPercentage: 70,
    name: 'Nanocerámico Clear Shield 70%',
    type: 'Parabrisas Delantero y Visión Cristalina',
    irRejectionPct: 92,
    uvRejectionPct: 99.5,
    description: 'Película prácticamente transparente de altísima tecnología diseñada específicamente para parabrisas delanteros. Cero pérdida de visibilidad nocturna y máxima protección térmica.',
    legalInPeru: true
  },
  {
    id: 'medium_35',
    vltPercentage: 35,
    name: 'Nanocerámico Medium Smoke 35%',
    type: 'Equilibrio Óptimo y Confort Visual',
    irRejectionPct: 95,
    uvRejectionPct: 99.9,
    description: 'Tonalidad ahumada moderada que resalta la elegancia del vehículo, reduciendo el deslumbramiento solar y manteniendo la cabina con una temperatura fresca.',
    legalInPeru: true
  },
  {
    id: 'dark_20',
    vltPercentage: 20,
    name: 'Nanocerámico Dark Privacy 20%',
    type: 'Privacidad y Alto Rechazo Térmico',
    irRejectionPct: 96,
    uvRejectionPct: 99.9,
    description: 'Excelente nivel de privacidad hacia el interior del habitáculo. Ideal para proteger objetos de valor y evitar la mirada de transeúntes.',
    legalInPeru: true
  },
  {
    id: 'limo_05',
    vltPercentage: 5,
    name: 'Nanocerámico Limo Stealth 5%',
    type: 'Máxima Privacidad VIP y Bloqueo Total',
    irRejectionPct: 98,
    uvRejectionPct: 99.9,
    description: 'La máxima opacidad permitida para lunas traseras y zona de carga/pasajeros. Rechazo implacable de radiación y oscuridad casi absoluta desde el exterior.',
    legalInPeru: false
  }
];

export const hardwareAddons = [
  {
    id: 'valvetronic-titanium',
    name: 'Escape Valvetronic con Válvula Inalámbrica',
    priceSoles: 2600,
    description: 'Control dual Quiet / Sport con mando a distancia o app Bluetooth y salidas en titanio azul o carbono.'
  },
  {
    id: 'caliper-custom-color',
    name: 'Pintura Cerámica de Calipers de Freno',
    priceSoles: 650,
    description: 'Esmaltado térmico curado al horno en Rojo Brembo, Amarillo Acid, Cian Neón o Dorado Metálico con logos OEM.'
  },
  {
    id: 'carbon-mirror-caps',
    name: 'Cubiertas de Espejo en Fibra de Carbono Real',
    priceSoles: 950,
    description: 'Fibra de carbono real tejida en 3K con acabado autoclave y sellado cerámico resistente a rayos UV.'
  }
];
