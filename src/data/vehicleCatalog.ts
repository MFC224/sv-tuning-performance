import { VehicleModel } from '@/types';

export const vehicleCatalog: VehicleModel[] = [
  // ==========================================
  // 1. OVERLAND & OFF-ROAD 4X4 (LÍDERES EN PERÚ)
  // ==========================================
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
    posterImage: '/images/vehicles/toyota-hilux.png',
    model3dPath: '/models/pickup.glb',
    accentColor: '#FF6B00',
    badges: ['Más Solicitado en Arequipa', 'Overland Ready', 'Protección 10 Mil'],
    tuningPackagesAvailable: [
      'Blindaje PPF Zonas de Impacto y Platón Trasero',
      'Snorkel Hermético Safari 4x4',
      'Winche Warn 12,000 lbs con Guía de Aluminio',
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
    id: 'ford-ranger-raptor',
    slug: 'ford-ranger-raptor',
    brand: 'Ford',
    model: 'Ranger Raptor',
    edition: 'Baja Desert Racer Edition',
    category: 'overland',
    categoryLabel: 'Overland & Off-Road 4x4',
    tagline: 'Desempeño puro de competición off-road con amortiguadores FOX Live Valve.',
    description: 'La bestia todoterreno definitiva. Motor V6 EcoBoost bi-turbo con sistema de escape activo con válvulas y suspensión de carrera. Exige blindaje PPF en sus prominentes pasos de rueda y capó abombado para resistir la fricción de arena andina a alta velocidad.',
    specs: {
      engine: '3.0L V6 EcoBoost Bi-Turbo Naftero',
      power: '392 HP / 583 Nm Torque',
      drivetrain: '4x4 Automática de 10 Velocidades con Modo Baja',
      bodyStyle: 'Pick-Up Super-Performance Doble Cabina',
      recommendedService: 'PPF Track Pack Frontal + Coating Cerámico 9H Graphene en Llantas Method',
      idealBranch: 'sachaca'
    },
    posterImage: '/images/vehicles/toyota-hilux.png',
    model3dPath: '/models/pickup.glb',
    accentColor: '#0055FF',
    badges: ['392 HP Twin-Turbo', 'FOX Suspension', 'Modo Baja'],
    tuningPackagesAvailable: [
      'PPF Zonas de Alta Erosión (Pasos de rueda ensanchados)',
      'Escape Valvetronic con apertura remota de sonido',
      'Polarizado Cerámico 20% Térmico con rechazo IR 95%',
      'Sellado de Grapheno en suspensiones y trapecios'
    ],
    dimensions: {
      lengthMm: 5381,
      widthMm: 2028,
      heightMm: 1926
    },
    recommendedPPFThickness: '10.0 Mils (Heavy Duty)'
  },
  {
    id: 'toyota-land-cruiser-prado',
    slug: 'toyota-land-cruiser-prado',
    brand: 'Toyota',
    model: 'Land Cruiser Prado',
    edition: 'VX Executive Overland',
    category: 'luxury_suv',
    categoryLabel: 'SUV Deportivo & Ejecutivo',
    tagline: 'El estándar de oro del prestigio familiar y corporativo en Cayma y Yanahuara.',
    description: 'La camioneta ejecutiva más respetada del Perú. Combina el confort de un salón rodante con capacidad todoterreno ilimitada. Su pintura original se protege con PPF Full Gloss para mantener el brillo espejo de vitrina de por vida, más polarizado atérmico para eliminar el calor solar de cabina.',
    specs: {
      engine: '4.0L V6 VVT-i / 2.8L Turbo Diésel',
      power: '271 HP / 381 Nm Torque',
      drivetrain: '4WD Permanente con Bloqueo Torsen Central',
      bodyStyle: 'SUV 5 Puertas 3 Filas de Asientos',
      recommendedService: 'PPF Full Body Gloss SV Defender + Polarizado Térmico 35% en 6 Lunas',
      idealBranch: 'dolores'
    },
    posterImage: '/images/vehicles/porsche-macan.png',
    model3dPath: '/models/compact.glb',
    accentColor: '#C5A059',
    badges: ['Prestigio Ejecutivo', 'Full Confort 7 Asientos', '4WD Permanente'],
    tuningPackagesAvailable: [
      'PPF Completo Auto-Regenerativo SV Defender',
      'Protección Nanocerámica para Interior de Cuero y Paneles',
      'Aislación Acústica de Puertas y Pasos de Rueda',
      'Láminas de Seguridad 12 Mil + Polarizado Cerámico'
    ],
    dimensions: {
      lengthMm: 4840,
      widthMm: 1885,
      heightMm: 1845
    },
    recommendedPPFThickness: '8.5 Mils (Gloss Shield)'
  },
  {
    id: 'toyota-fortuner',
    slug: 'toyota-fortuner',
    brand: 'Toyota',
    model: 'Fortuner',
    edition: 'Diamond Edition 4x4',
    category: 'luxury_suv',
    categoryLabel: 'SUV Deportivo & Ejecutivo',
    tagline: 'Robustez mecánica sobre chasis de largueros con elegancia de alta gama.',
    description: 'La SUV favorita para viajes interdepartamentales Arequipa - Cusco - Puno. Su altura libre al suelo y tracción 4x4 se complementan con un sellado cerámico de grafeno 9H y PPF frontal para evitar el picado de piedras en carretera.',
    specs: {
      engine: '2.8L D-4D Turbo Diésel',
      power: '204 HP / 500 Nm Torque',
      drivetrain: '4x4 con Caja Reductora y Tracción Trasera Desconectable',
      bodyStyle: 'SUV Mediana 7 Plazas',
      recommendedService: 'PPF Frontal Track Pack + Cerámico 9H Graphene Integral',
      idealBranch: 'sachaca'
    },
    posterImage: '/images/vehicles/toyota-hilux.png',
    model3dPath: '/models/pickup.glb',
    accentColor: '#D4AF37',
    badges: ['Top Ventas Perú', 'Chasis de Largueros', 'Garantía 10 Años'],
    tuningPackagesAvailable: [
      'PPF Parachoques, Capó Completo y Faros Bi-LED',
      'Polarizado Cerámico 70% Parabrisas con homologación',
      'Tratamiento Anti-Corrosivo Chasis Inferior',
      'Estribos y Molduras en Negro Piano o Satinado'
    ],
    dimensions: {
      lengthMm: 4795,
      widthMm: 1855,
      heightMm: 1835
    },
    recommendedPPFThickness: '8.5 Mils'
  },
  {
    id: 'nissan-frontier-pro4x',
    slug: 'nissan-frontier-pro4x',
    brand: 'Nissan',
    model: 'Frontier PRO-4X',
    edition: 'Volcanic Desert Warrior',
    category: 'overland',
    categoryLabel: 'Overland & Off-Road 4x4',
    tagline: 'Suspensión trasera multilink con confort insuperable sobre terrenos agrestes.',
    description: 'La pick-up con mejor andar en asfalto y trocha gracias a su eje trasero con resortes helicoidales. Tratamiento de PPF satinado en su parrilla negra y pasos de rueda para realzar su estética agresiva PRO-4X.',
    specs: {
      engine: '2.5L Bi-Turbo Diésel High Output',
      power: '188 HP / 450 Nm Torque',
      drivetrain: '4x4 con Bloqueo de Diferencial Trasero Electrónico',
      bodyStyle: 'Pick-Up Doble Cabina 4x4',
      recommendedService: 'PPF Stealth Satin Parcial + Polarizado Nanocerámico 20%',
      idealBranch: 'sachaca'
    },
    posterImage: '/images/vehicles/toyota-hilux.png',
    model3dPath: '/models/pickup.glb',
    accentColor: '#FF4500',
    badges: ['Suspensión Multilink', 'PRO-4X Package', 'Trocha Confort'],
    tuningPackagesAvailable: [
      'PPF Zonas de Carga y Cantoneras',
      'Sellado Cerámico de Ópticas y Vidrios',
      'Barra LED Oculta en Parrilla Delantera'
    ],
    dimensions: {
      lengthMm: 5260,
      widthMm: 1875,
      heightMm: 1855
    },
    recommendedPPFThickness: '8.5 Mils'
  },
  {
    id: 'mitsubishi-l200-triton',
    slug: 'mitsubishi-l200-triton',
    brand: 'Mitsubishi',
    model: 'L200 Triton',
    edition: 'Rally Dakar Heritage',
    category: 'overland',
    categoryLabel: 'Overland & Off-Road 4x4',
    tagline: 'ADN del Rally Dakar con sistema de tracción Super Select 4WD-II.',
    description: 'La camioneta que permite circular en tracción 4x4 a cualquier velocidad sobre asfalto seco gracias a su diferencial central Torsen. Protección de pintura contra micro-rayones provocados por lavado diario en faena minera.',
    specs: {
      engine: '2.4L MIVEC Turbo Diésel Intercooler',
      power: '178 HP / 430 Nm Torque',
      drivetrain: 'Super Select 4WD-II con 4 Modos Off-Road',
      bodyStyle: 'Pick-Up Doble Cabina',
      recommendedService: 'PPF Heavy Duty Platón y Capó + Cerámico Grafeno 9H',
      idealBranch: 'sachaca'
    },
    posterImage: '/images/vehicles/toyota-hilux.png',
    model3dPath: '/models/pickup.glb',
    accentColor: '#CC0000',
    badges: ['Super Select 4WD', 'Dakar Legend', 'Uso Rudo'],
    tuningPackagesAvailable: [
      'Kit PPF Defensa y Bordes de Puerta',
      'Descontaminado Férrico Profundo Post-Mina',
      'Pulido Técnico en 3 Pasos con Corrección 95%'
    ],
    dimensions: {
      lengthMm: 5225,
      widthMm: 1815,
      heightMm: 1775
    },
    recommendedPPFThickness: '10.0 Mils'
  },
  {
    id: 'volkswagen-amarok-v6',
    slug: 'volkswagen-amarok-v6',
    brand: 'Volkswagen',
    model: 'Amarok V6',
    edition: 'Highline Extreme 258 HP',
    category: 'overland',
    categoryLabel: 'Overland & Off-Road 4x4',
    tagline: 'El torque demoledor de un V6 alemán con tracción 4MOTION permanente.',
    description: 'La camioneta más veloz en carretera del Perú. Acelera de 0 a 100 km/h en 7.4 segundos. Por su alta velocidad en carretera Arequipa - Panamericana Sur, el frontal sufre bombardeo constante de piedrilla volcánica; el PPF SV Defender es obligatorio.',
    specs: {
      engine: '3.0L V6 TDI Turbo Diésel con Overboost',
      power: '258 HP (272 HP con Overboost) / 580 Nm Torque',
      drivetrain: 'Tracción Integral Permanente 4MOTION con Caja ZF de 8 Vel',
      bodyStyle: 'Pick-Up Sport Doble Cabina',
      recommendedService: 'PPF Full Frontal Extended + Escape Deportivo Libre de Salitre',
      idealBranch: 'sachaca'
    },
    posterImage: '/images/vehicles/toyota-hilux.png',
    model3dPath: '/models/pickup.glb',
    accentColor: '#001E50',
    badges: ['V6 Turbo Diésel', '258 HP Overboost', 'Tracción 4MOTION'],
    tuningPackagesAvailable: [
      'Blindaje PPF Capó Entero, Guardafangos y Faros Bi-Xenon',
      'Reprogramación Stage 1 de Potencia (310 HP / 650 Nm)',
      'Coating Cerámico de Pinzas de Freno y Llantas 20 Pulgadas'
    ],
    dimensions: {
      lengthMm: 5254,
      widthMm: 1954,
      heightMm: 1834
    },
    recommendedPPFThickness: '8.5 Mils'
  },
  {
    id: 'isuzu-dmax',
    slug: 'isuzu-dmax',
    brand: 'Isuzu',
    model: 'D-Max',
    edition: 'V-Cross 4x4 Expedition',
    category: 'overland',
    categoryLabel: 'Overland & Off-Road 4x4',
    tagline: 'Ingeniería japonesa de camiones pesados aplicada a una camioneta imparable.',
    description: 'El legendario motor 3.0L de Isuzu conocido por superar los 500,000 km sin abrir bloque. En Arequipa, es la preferida por empresas de ingeniería e inspección técnica de altura.',
    specs: {
      engine: '3.0L 4JJ3-TCX Turbo Diésel Blue Power',
      power: '190 HP / 450 Nm Torque',
      drivetrain: '4x4 con Bloqueo de Diferencial Trasero y Caja de Transferencia',
      bodyStyle: 'Pick-Up Doble Cabina',
      recommendedService: 'PPF Zonas de Desgaste + Polarizado Térmico Nanocerámico',
      idealBranch: 'sachaca'
    },
    posterImage: '/images/vehicles/toyota-hilux.png',
    model3dPath: '/models/pickup.glb',
    accentColor: '#E60012',
    badges: ['Motor 3.0L Camionero', 'Confiabilidad Japonesa', 'Bloqueo Trasero'],
    tuningPackagesAvailable: [
      'Blindaje PPF Zonas Críticas y Techo Solar',
      'Protección de Bajos con Dinitrol Anti-Corrosión',
      'Polarizado Cerámico 35% en Cabina'
    ],
    dimensions: {
      lengthMm: 5265,
      widthMm: 1870,
      heightMm: 1790
    },
    recommendedPPFThickness: '10.0 Mils'
  },

  // ==========================================
  // 2. SUPERDEPORTIVOS & GAMA ALTA (ÉLITE SEMA)
  // ==========================================
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
    posterImage: '/images/vehicles/porsche-911.png',
    model3dPath: '/models/sportcar.glb',
    accentColor: '#C5A059',
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
    categoryLabel: 'SUV Deportivo & Ejecutivo',
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
    posterImage: '/images/vehicles/porsche-macan.png',
    model3dPath: '/models/compact.glb',
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
    id: 'bmw-m4-competition',
    slug: 'bmw-m4-competition',
    brand: 'BMW',
    model: 'M4 Competition (G82)',
    edition: 'Bavarian Track Weapon',
    category: 'supercar',
    categoryLabel: 'Superdeportivo de Pista',
    tagline: '510 caballos de fuerza biturbo y silueta agresiva con techo de carbono.',
    description: 'El coupé deportivo alemán con mayor impacto visual en redes. Su techo de fibra de carbono expuesta y su parrilla vertical requieren protección PPF de corte computarizado 3D para evitar cortes con navaja sobre la pintura original.',
    specs: {
      engine: '3.0L 6 en Línea BMW M TwinPower Turbo S58',
      power: '510 HP / 650 Nm Torque',
      drivetrain: 'Tracción Trasera RWD o M xDrive con Diferencial M Activo',
      bodyStyle: 'Coupé Deportivo 2 Puertas',
      recommendedService: 'PPF Full Body Stealth Satin + Escape Valvetronic Inox T304',
      idealBranch: 'sachaca'
    },
    posterImage: '/images/vehicles/porsche-911.png',
    model3dPath: '/models/sportcar.glb',
    accentColor: '#0066B1',
    badges: ['S58 Twin-Turbo', 'Carbon Roof', '510 HP'],
    tuningPackagesAvailable: [
      'Conversión PPF Completa Satinada',
      'Sistema de Escape Valvetronic con Downpipe de Alto Flujo',
      'Polarizado Cerámico 5% Limousine en Vidrios Posteriores'
    ],
    dimensions: {
      lengthMm: 4794,
      widthMm: 1887,
      heightMm: 1393
    },
    recommendedPPFThickness: '8.5 Mils'
  },
  {
    id: 'mercedes-amg-g63',
    slug: 'mercedes-amg-g63',
    brand: 'Mercedes-Benz',
    model: 'G63 AMG',
    edition: 'Night Edition V8 Biturbo',
    category: 'supercar',
    categoryLabel: 'Superdeportivo & SUV Élite',
    tagline: 'El ícono supremo de exclusividad mundial con motor V8 Biturbo artesanal.',
    description: 'El legendario Clase G modificado por AMG con salidas de escape laterales (*side pipes*) que retumban en el Valle de Chilina. Su carrocería de aristas cuadradas requiere un maestro instalador certificado para lograr terminaciones de film invisibles en los bordes.',
    specs: {
      engine: '4.0L V8 Biturbo Handcrafted AMG',
      power: '585 HP / 850 Nm Torque',
      drivetrain: 'Tracción Integral Permanente AMG Performance 4MATIC con 3 Bloqueos de Diferencial',
      bodyStyle: 'SUV Clásico de Ultra Lujo Militar',
      recommendedService: 'PPF Full Body Ultra Clear (10 Mil) + Coating Cerámico de Cuero Designo',
      idealBranch: 'dolores'
    },
    posterImage: '/images/vehicles/porsche-macan.png',
    model3dPath: '/models/compact.glb',
    accentColor: '#C5A059',
    badges: ['V8 Biturbo 585 HP', 'Side Exhausts', 'Triple Bloqueo'],
    tuningPackagesAvailable: [
      'Blindaje PPF Total con Remoción de Bisagras para Acabado Oculto',
      'Protección Térmica de Cristales Planos con Lámina Nanocerámica 99% UV',
      'Pulido Especial de Salidas de Escape Laterales Cromadas'
    ],
    dimensions: {
      lengthMm: 4873,
      widthMm: 1984,
      heightMm: 1966
    },
    recommendedPPFThickness: '10.0 Mils'
  },
  {
    id: 'audi-rs3-sportback',
    slug: 'audi-rs3-sportback',
    brand: 'Audi',
    model: 'RS3 Sportback',
    edition: 'Quattro 5-Cilindros Turbo',
    category: 'tuner',
    categoryLabel: 'Sedán Deportivo / Street Tuner',
    tagline: 'El rugido inconfundible del 5 cilindros turbo con modo drift RS Torque Splitter.',
    description: 'Uno de los compactos más rápidos del planeta, capaz de hacer el 0-100 km/h en 3.8 segundos. Frecuente en los videos virales de SV Tuning por el sonido brutal de su escape con válvulas electrónicas abiertas.',
    specs: {
      engine: '2.5L TFSI 5 Cilindros Turbo (Secuencia de Encendido 1-2-4-5-3)',
      power: '400 HP / 500 Nm Torque',
      drivetrain: 'Tracción Integral Quattro con RS Torque Splitter Trasero',
      bodyStyle: 'Hatchback Deportivo de Alto Rendimiento',
      recommendedService: 'PPF Track Pack Frontal + Escape Valvetronic Titane',
      idealBranch: 'sachaca'
    },
    posterImage: '/images/vehicles/subaru-wrx.png',
    model3dPath: '/models/sportcar.glb',
    accentColor: '#BB0A30',
    badges: ['5-Cylinder Turbo', '400 HP', 'RS Torque Splitter'],
    tuningPackagesAvailable: [
      'PPF Zonas de Alta Succión Frontal y Tomas de Aire',
      'Línea de Escape Valvetronic Cat-Back en Acero Inoxidable 304',
      'Cerámico 9H en Calipers Rojos de 6 Pistones'
    ],
    dimensions: {
      lengthMm: 4389,
      widthMm: 1851,
      heightMm: 1436
    },
    recommendedPPFThickness: '8.5 Mils'
  },

  // ==========================================
  // 3. SUVS POPULARES DE FAMILIA EN PERÚ
  // ==========================================
  {
    id: 'toyota-rav4-hybrid',
    slug: 'toyota-rav4-hybrid',
    brand: 'Toyota',
    model: 'RAV4',
    edition: 'Hybrid Adventure AWD',
    category: 'luxury_suv',
    categoryLabel: 'SUV Deportivo & Ejecutivo',
    tagline: 'La SUV más vendida del mundo: Eficiencia híbrida y confort para Arequipa.',
    description: 'La compañera perfecta para el día a día entre Cerro Colorado, José Luis Bustamante y Rivero y el Centro Histórico. Su pintura bicolor requiere protección PPF para evitar el desgaste solar en el techo negro y capó.',
    specs: {
      engine: '2.5L 4 Cilindros + Motor Eléctrico Híbrido Auto-Recargable',
      power: '219 HP Combinados',
      drivetrain: 'Tracción Integral Electrónica AWD-e Inteligente',
      bodyStyle: 'SUV Compacta 5 Pasajeros',
      recommendedService: 'PPF Frontal + Polarizado Térmico 35% en Cabina Completa',
      idealBranch: 'dolores'
    },
    posterImage: '/images/vehicles/porsche-macan.png',
    model3dPath: '/models/compact.glb',
    accentColor: '#008080',
    badges: ['Híbrido Auto-Recargable', 'Bajo Consumo', 'E-AWD'],
    tuningPackagesAvailable: [
      'PPF Zonas de Impacto Frontal',
      'Polarizado Cerámico 70% Parabrisas con Reducción Térmica 8°C',
      'Sellado Cerámico de Pintura y Plásticos Exteriores'
    ],
    dimensions: {
      lengthMm: 4600,
      widthMm: 1855,
      heightMm: 1685
    },
    recommendedPPFThickness: '8.5 Mils'
  },
  {
    id: 'hyundai-tucson-nline',
    slug: 'hyundai-tucson-nline',
    brand: 'Hyundai',
    model: 'Tucson',
    edition: 'N-Line Turbo Edition',
    category: 'luxury_suv',
    categoryLabel: 'SUV Deportivo & Ejecutivo',
    tagline: 'Diseño paramétrico futurista y estética deportiva N-Line.',
    description: 'Su compleja parrilla paramétrica con luces LED diurnas ocultas y sus aristas geométricas demandan corte computarizado por software 3D para instalar PPF sin margen de error humano.',
    specs: {
      engine: '1.6L Turbo GDI Smartstream',
      power: '180 HP / 265 Nm Torque',
      drivetrain: 'Tracción Integral HTRAC AWD con Caja DCT de 7 Velocidades',
      bodyStyle: 'SUV Mediana 5 Puertas',
      recommendedService: 'PPF Frontal Paramétrico + Cerámico 9H Graphene',
      idealBranch: 'dolores'
    },
    posterImage: '/images/vehicles/porsche-macan.png',
    model3dPath: '/models/compact.glb',
    accentColor: '#002C6C',
    badges: ['N-Line Styling', 'Parrilla Paramétrica', 'HTRAC AWD'],
    tuningPackagesAvailable: [
      'Corte Computarizado PPF Faros Paramétricos',
      'Polarizado Nanocerámico 99% UV en 4 Lunas',
      'Acondicionamiento Cerámico para Pantalla Digital y Piano Black'
    ],
    dimensions: {
      lengthMm: 4630,
      widthMm: 1865,
      heightMm: 1665
    },
    recommendedPPFThickness: '8.5 Mils'
  },
  {
    id: 'kia-sportage-gtline',
    slug: 'kia-sportage-gtline',
    brand: 'Kia',
    model: 'Sportage',
    edition: 'GT-Line Dark Chrome',
    category: 'luxury_suv',
    categoryLabel: 'SUV Deportivo & Ejecutivo',
    tagline: 'Innovación visual con faros bumerán LED y pantalla curva panorámica.',
    description: 'Una de las SUVs más deseadas en el mercado arequipeño. Los paquetes de cromo oscuro y las molduras en negro piano brillante se rayan con solo lavarlas; el film PPF regenerativo las mantiene como nuevas.',
    specs: {
      engine: '1.6L T-GDI Turbo',
      power: '177 HP / 265 Nm Torque',
      drivetrain: 'AWD Inteligente con Bloqueo 50:50',
      bodyStyle: 'SUV Moderna 5 Asientos',
      recommendedService: 'PPF Molduras Piano Black + Polarizado Térmico',
      idealBranch: 'dolores'
    },
    posterImage: '/images/vehicles/porsche-macan.png',
    model3dPath: '/models/compact.glb',
    accentColor: '#9B111E',
    badges: ['GT-Line', 'Luces Bumerán', 'Interior Curvo'],
    tuningPackagesAvailable: [
      'PPF Zonas Piano Black Interiores y Exteriores',
      'Polarizado Cerámico 20% Privacidad y Confort Solar',
      'Sellado Hidrofóbico de Cristales Anti-Lluvia'
    ],
    dimensions: {
      lengthMm: 4660,
      widthMm: 1865,
      heightMm: 1660
    },
    recommendedPPFThickness: '8.5 Mils'
  },
  {
    id: 'mazda-cx5-signature',
    slug: 'mazda-cx5-signature',
    brand: 'Mazda',
    model: 'CX-5',
    edition: 'Signature Turbo Carbon',
    category: 'luxury_suv',
    categoryLabel: 'SUV Deportivo & Ejecutivo',
    tagline: 'Pintura Soul Red Crystal de triple capa protegida con tecnología de ultra lujo.',
    description: 'La pintura Soul Red Crystal de Mazda es famosa por su belleza y también por su extrema delicadeza ante el impacto de piedras. Requiere blindaje PPF elastomérico antes de que sufra desconchones irreparables.',
    specs: {
      engine: '2.5L Skyactiv-G Turbo con Intercooler',
      power: '228 HP / 420 Nm Torque',
      drivetrain: 'i-ACTIV AWD con Sistema G-Vectoring Control Plus',
      bodyStyle: 'SUV Premium 5 Plazas',
      recommendedService: 'PPF Full Frontal (Soul Red Armor) + Coating Cerámico 9H',
      idealBranch: 'dolores'
    },
    posterImage: '/images/vehicles/porsche-macan.png',
    model3dPath: '/models/compact.glb',
    accentColor: '#8C1D24',
    badges: ['Soul Red Armor', 'Skyactiv Turbo', 'Diseño Kodo'],
    tuningPackagesAvailable: [
      'Blindaje PPF Especial para Pintura Soul Red Crystal',
      'Nutrición y Sellado Cerámico de Cuero Nappa Marrón',
      'Polarizado Atérmico 35% en Parabrisas y Lunas'
    ],
    dimensions: {
      lengthMm: 4575,
      widthMm: 1845,
      heightMm: 1675
    },
    recommendedPPFThickness: '8.5 Mils'
  },
  {
    id: 'jeep-wrangler-rubicon',
    slug: 'jeep-wrangler-rubicon',
    brand: 'Jeep',
    model: 'Wrangler Rubicon',
    edition: 'Rock Crawler 4x4',
    category: 'overland',
    categoryLabel: 'Overland & Off-Road 4x4',
    tagline: 'El ícono mundial del 4x4 puro: Ejes Dana 44 y techo desmontable.',
    description: 'Diseñado para trepar rocas en Chivay, el Cañón del Colca y las quebradas arequipeñas. Su carrocería desmontable y parabrisas vertical sufren impacto directo de piedras; se le aplica lámina de protección de parabrisas Windshield Defender de 4 capas.',
    specs: {
      engine: '3.6L Pentastar V6 / 2.0L Turbo',
      power: '285 HP / 353 Nm Torque',
      drivetrain: 'Rock-Trac 4x4 con Reductora 4:1 y Desconexión de Barra Estabilizadora',
      bodyStyle: 'Todoterreno 4 Puertas Techo Rígido Desmontable',
      recommendedService: 'PPF Heavy Duty 10 Mil + Lámina de Protección de Parabrisas Windshield Defender',
      idealBranch: 'sachaca'
    },
    posterImage: '/images/vehicles/toyota-hilux.png',
    model3dPath: '/models/pickup.glb',
    accentColor: '#D35400',
    badges: ['Ejes Dana 44', 'Desconexión Sway Bar', 'Rubicon Trail Rated'],
    tuningPackagesAvailable: [
      'Lámina Externa de Parabrisas Anti-Pedradas',
      'PPF Zonas de Bisagras y Guardabarros Planos',
      'Tratamiento Anti-Lodo e Hidrofóbico Cerámico Chasis'
    ],
    dimensions: {
      lengthMm: 4785,
      widthMm: 1875,
      heightMm: 1868
    },
    recommendedPPFThickness: '10.0 Mils'
  },

  // ==========================================
  // 4. TUNING, SEDANES & RALLY URBANO
  // ==========================================
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
    posterImage: '/images/vehicles/subaru-wrx.png',
    model3dPath: '/models/sportcar.glb',
    accentColor: '#003399',
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
  },
  {
    id: 'honda-civic-typer',
    slug: 'honda-civic-typer',
    brand: 'Honda',
    model: 'Civic Type R (FL5)',
    edition: 'Championship Track Edition',
    category: 'tuner',
    categoryLabel: 'Sedán Deportivo / Street Tuner',
    tagline: 'El rey de la tracción delantera con récord de vuelta en Suzuka y Nürburgring.',
    description: 'Equipado con asientos baquet de competición en gamuza roja y alerón aerodinámico en fibra de carbono. Protegido en SV Tuning con PPF brillante para mantener su histórico color Championship White inmaculado.',
    specs: {
      engine: '2.0L VTEC Turbo K20C1',
      power: '315 HP / 420 Nm Torque',
      drivetrain: 'Tracción Delantera FWD con Diferencial Helicoidal LSD y Caja Manual de 6 Vel con Rev-Match',
      bodyStyle: 'Hatchback Deportivo de Alto Desempeño',
      recommendedService: 'PPF Full Body Gloss + Protección Cerámica de Butacas Rojas Alcantara',
      idealBranch: 'sachaca'
    },
    posterImage: '/images/vehicles/subaru-wrx.png',
    model3dPath: '/models/sportcar.glb',
    accentColor: '#C00000',
    badges: ['K20C1 VTEC Turbo', 'Championship White', 'Caja Manual Rev-Match'],
    tuningPackagesAvailable: [
      'Blindaje PPF Completo Auto-Curativo',
      'Escape Valvetronic de Salida Triple Central',
      'Sellado Hidrofóbico de Cristales y Alerón de Carbono'
    ],
    dimensions: {
      lengthMm: 4595,
      widthMm: 1890,
      heightMm: 1405
    },
    recommendedPPFThickness: '8.5 Mils'
  }
];
