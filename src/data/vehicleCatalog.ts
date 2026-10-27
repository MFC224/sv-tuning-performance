import { VehicleModel } from '@/types';

export const vehicleCatalog: VehicleModel[] = [
  {
    id: 'toyota-hilux-overland',
    slug: 'toyota-hilux-overland',
    brand: 'Toyota',
    model: 'Hilux',
    edition: 'Overland Extreme Edition',
    category: 'overland',
    categoryLabel: 'Overland & Off-Road 4x4',
    tagline: 'El Rey de los Andes: Blindaje de impacto para minería, trochas y expedición.',
    description: 'La camioneta predilecta del sur peruano llevada a su máxima expresión de resistencia. Equipada con PPF SV Defender Heavy Duty de 10 mil para repeler ramas espinosas y pedradas volcánicas, snorkel sellado contra vados andinos, parachoques de acero con winche integrado y sistema de iluminación de alta penetración.',
    specs: {
      engine: '2.8L D-4D Turbo Diésel Intercooler',
      power: '204 HP / 500 Nm Torque',
      drivetrain: '4x4 Part-Time con Reductora y Bloqueo de Diferencial Trasero',
      bodyStyle: 'Pick-Up Doble Cabina 4 Puertas',
      recommendedService: 'PPF Full Body Heavy Duty (10 Mil) + Polarizado Nanocerámico 99% UV',
      idealBranch: 'sachaca'
    },
    posterImage: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1600&q=80',
    accentColor: '#FF6B00',
    badges: ['Más Solicitado en Arequipa', 'Overland Ready', 'Protección 10 Mil'],
    tuningPackagesAvailable: [
      'Blindaje PPF Zonas de Impacto y Platón Trasero',
      'Snorkel Hermético Safari 4x4',
      'Winche Warn 12,000 lbs con Guía de Alumino',
      'Tratamiento Cerámico para Chasis y Carrocería Anti-Salitre'
    ],
    dimensions: {
      lengthMm: 5325,
      widthMm: 1855,
      heightMm: 1865
    },
    recommendedPPFThickness: '10.0 Mils (Ultra Heavy Duty)'
  },
  {
    id: 'porsche-911-gt3',
    slug: 'porsche-911-gt3',
    brand: 'Porsche',
    model: '911 GT3 (992)',
    edition: 'Aero Track Weapon',
    category: 'supercar',
    categoryLabel: 'Superdeportivo de Pista',
    tagline: 'Precisión milimétrica de Nürburgring adaptada al asfalto de Arequipa.',
    description: 'El pináculo de la ingeniería alemana con motor bóxer atmosférico que gira hasta las 9,000 RPM. Protegido en su totalidad con PPF SV Defender Stealth Satin para convertir su pintura brillante en un intimidante satín mate sin alterar el tono de fábrica, preservando los alerones de fibra de carbono y los deflectores aerodinámicos.',
    specs: {
      engine: '4.0L Bóxer 6 Cilindros Atmosférico (9,000 RPM Redline)',
      power: '510 HP / 470 Nm Torque',
      drivetrain: 'Tracción Trasera (RWD) con PDK de 7 Velocidades',
      bodyStyle: 'Coupé Biplaza con Alerón Cuello de Cisne',
      recommendedService: 'PPF SV Defender Stealth Satin + Coating Cerámico 9H Graphene en Llantas',
      idealBranch: 'sachaca'
    },
    posterImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=80',
    accentColor: '#00F0FF',
    badges: ['Track Weapon', 'Stealth Satin Conversion', '9,000 RPM'],
    tuningPackagesAvailable: [
      'Conversión Completa PPF Satinado Stealth',
      'Escape Valvetronic de Titanio con Salidas Quemadas',
      'Protección Cerámica de Frenos PCCB Carbocerámicos',
      'Polarizado Cerámico 70% Parabrisas con Homologación'
    ],
    dimensions: {
      lengthMm: 4573,
      widthMm: 1852,
      heightMm: 1279
    },
    recommendedPPFThickness: '8.5 Mils (Ultra Elastomérico)'
  },
  {
    id: 'porsche-macan-turbo',
    slug: 'porsche-macan-turbo',
    brand: 'Porsche',
    model: 'Macan Turbo',
    edition: 'GTS Performance SUV',
    category: 'luxury_suv',
    categoryLabel: 'SUV Deportivo de Ultra Lujo',
    tagline: 'El balance supremo entre deportividad pura y confort para la vida urbana.',
    description: 'Diseñada para transitar con total elegancia y potencia por Cayma, Yanahuara y las carreteras panorámicas de Arequipa. Cuenta con polarizado nanocerámico al 99% UV para proteger la tapicería de cuero espresso del sol implacable, más un tratamiento cerámico 9H que genera un efecto espejo deslumbrante en cada curva.',
    specs: {
      engine: '2.9L V6 Biturbo',
      power: '440 HP / 550 Nm Torque',
      drivetrain: 'Tracción Integral Activa AWD con Suspensión Neumática PASM',
      bodyStyle: 'SUV Deportivo 5 Puertas',
      recommendedService: 'Detailing Integral 3 Pasos + Polarizado Nanocerámico Térmico + PPF Frontal',
      idealBranch: 'dolores'
    },
    posterImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
    accentColor: '#E5B869',
    badges: ['Lujo Diario', 'Clima Confort', '9H Graphene Mirror'],
    tuningPackagesAvailable: [
      'Paquete Frontal PPF Track Pack (Capó, Parachoques y Faros LED)',
      'Polarizado Térmico 35% en 4 Lunas + 70% Parabrisas Delantero',
      'Pintura de Calipers en Amarillo Acid o Rojo Brembo con Logo Porsche',
      'Acondicionamiento Cerámico para Interiores de Cuero y Pantallas'
    ],
    dimensions: {
      lengthMm: 4726,
      widthMm: 1927,
      heightMm: 1596
    },
    recommendedPPFThickness: '8.5 Mils (Gloss Shield)'
  },
  {
    id: 'subaru-wrx',
    slug: 'subaru-wrx',
    brand: 'Subaru',
    model: 'WRX',
    edition: 'Rally & Street Spec',
    category: 'tuner',
    categoryLabel: 'Sedán Deportivo / Street Tuner',
    tagline: 'La leyenda de rally con alma de competición callejera y tracción S-AWD.',
    description: 'El ícono de la comunidad tuning en Arequipa. Con su característico capó con toma de aire funcional, tracción total simétrica y puesta a punto de escape Valvetronic para escuchar los petardeos (pops & bangs) a voluntad. Su pintura Azul World Rally se mantiene impecable gracias al sellado de grafeno y film de protección.',
    specs: {
      engine: '2.4L Boxer Turbo FA24F DIT',
      power: '275 HP / 350 Nm Torque',
      drivetrain: 'Symmetrical All-Wheel Drive (AWD) con Diferencial Central',
      bodyStyle: 'Sedán Deportivo 4 Puertas con Toma de Aire Funcional',
      recommendedService: 'Escape Valvetronic Inox T304 + Wrap Capó Carbono + PPF Faros',
      idealBranch: 'sachaca'
    },
    posterImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=80',
    accentColor: '#FF3823',
    badges: ['Rally Heritage', 'Valvetronic Pops & Bangs', 'Boxer Turbo'],
    tuningPackagesAvailable: [
      'Sistema de Escape Valvetronic Cat-Back con Válvula Electrónica',
      'Lip Frontal y Difusor Trasero en Fibra de Carbono 3K',
      'PPF Ahumado Tonalizado para Ópticas Delanteras y Traseras',
      'Reprogramación Stage 1 y Mapeo en Banco de Potencia'
    ],
    dimensions: {
      lengthMm: 4670,
      widthMm: 1825,
      heightMm: 1465
    },
    recommendedPPFThickness: '8.5 Mils (High Gloss)'
  }
];
