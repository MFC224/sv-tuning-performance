import { BusinessData } from '@/types';

export const businessData: BusinessData = {
  brandName: "SV Tuning & Performance",
  legalName: "SV TUNING AREQUIPA S.A.C.",
  ruc: "20614788632",
  founder: {
    name: "Paul Abel Ayamamani López",
    role: "CEO & Master Installer",
    bioShort: "Emprendedor arequipeño graduado en Negocios Internacionales. Transformó un modesto taller de 2x2m y $100 de capital en el epicentro de personalización y blindaje de pintura más prestigioso del sur del Perú, con presencia oficial en el SEMA Show de Las Vegas.",
    originStory: "La historia de Paul Ayamamani es testimonio de superación y perfeccionismo técnico. Inició en el rubro automotriz desde abajo, invirtiendo sus primeros ahorros en herramientas de corte de precisión y películas automotrices. Tras formarse en técnicas de protección nanotecnológica en Estados Unidos y asistir al SEMA Show de Las Vegas, desarrolló su propia línea premium 'SV Film', protegiendo flotas de alta gama en Arequipa y proveyendo material a más de 15 talleres en el sur peruano.",
    achievements: [
      "Asistente y expositor técnico en SEMA Show Las Vegas",
      "Creador y desarrollador de la formulación SV Film Defender Ultra (8.5 mil)",
      "Red de distribución B2B a más de 15 talleres automotrices en el sur del país",
      "Comunidad digital de más de 64,000 seguidores en TikTok con millones de visualizaciones",
      "Calificación de 4.9 estrellas con más de 350 reseñas verificadas en Google Maps"
    ],
    certifications: [
      "3M Certified Film & Wrap Specialist (USA)",
      "Master Installer Paint Protection Film (PPF High Performance)",
      "Graphene & Ceramic Coating 9H Certified Applicator",
      "Especialista en Aislamiento Térmico Nanocerámico para Climas de Gran Altitud"
    ]
  },
  socialProof: {
    googleRating: 4.9,
    googleReviewCount: 368,
    tiktokHandle: "@svtuningarequipa",
    tiktokFollowers: "64.2K+",
    tiktokUrl: "https://www.tiktok.com/@svtuningarequipa",
    instagramHandle: "@svtuningarequipa",
    instagramUrl: "https://www.instagram.com/svtuningarequipa",
    facebookHandle: "SV Tuning & Performance",
    facebookUrl: "https://www.facebook.com/svtuningarequipa"
  },
  branches: {
    dolores: {
      id: 'dolores',
      name: 'Sede Dolores',
      tagline: 'Centro de Detailing, Corrección de Pintura y Mantenimiento VIP',
      address: 'Av. Dolores 128',
      district: 'José Luis Bustamante y Rivero',
      city: 'Arequipa',
      department: 'Arequipa',
      country: 'Perú',
      googleMapsUrl: 'https://maps.google.com/?q=Av.+Dolores+128+Arequipa',
      phone: '960595412',
      phoneDisplay: '+51 960 595 412',
      whatsappNumber: '51960595412',
      whatsappMessagePreset: 'Hola SV Tuning Sede Dolores, deseo cotizar un servicio de detailing y estética automotriz para mi vehículo.',
      operatingHours: {
        weekdays: '08:30 AM - 07:00 PM',
        saturday: '08:30 AM - 05:30 PM',
        sunday: 'Previa Cita VIP'
      },
      isOpenNow: true,
      specialties: [
        'Detailing 360° y Corrección Óptica de Pintura en 3 Pasos',
        'Tratamiento Nanocerámico 9H Graphene',
        'Polarizado Nanocerámico Térmico 99% UV',
        'Limpieza Profunda de Interiores en Cuero y Alcántara',
        'Restauración de Faros y Tratamiento Acrílico'
      ],
      features: {
        hasPaintBoothLaminar: false,
        hasDynoTuning: false,
        hasCleanRoomPPF: true,
        hasVipLounge: true
      }
    },
    sachaca: {
      id: 'sachaca',
      name: 'Sede Sachaca',
      tagline: 'Mega Taller de PPF Quirúrgico, Tuning de Alto Rendimiento y Escapes',
      address: 'Av. Fernandini / Tahuaycani s/n',
      district: 'Sachaca',
      city: 'Arequipa',
      department: 'Arequipa',
      country: 'Perú',
      googleMapsUrl: 'https://maps.google.com/?q=Sachaca+Arequipa+SV+Tuning',
      phone: '987507459',
      phoneDisplay: '+51 987 507 459',
      whatsappNumber: '51987507459',
      whatsappMessagePreset: 'Hola SV Tuning Sede Sachaca, deseo cotizar instalación de PPF Defender Ultra y mejoras de performance para mi auto.',
      operatingHours: {
        weekdays: '08:00 AM - 07:30 PM',
        saturday: '08:30 AM - 06:00 PM',
        sunday: 'Cerrado (Mantenimiento de Cabinas)'
      },
      isOpenNow: true,
      specialties: [
        'Cabina Quirúrgica Presurizada con Filtración HEPA para PPF',
        'Blindaje Total de Carrocería con SV Film Defender Ultra (8.5 mil)',
        'Sistemas de Escape Valvetronic con Apertura Electrónica por Control/App',
        'Custom Wraps 3M 2080 y Techos Panorámicos Piano Black',
        'Equipamiento Overland Hilux (Snorkel, Winche, Luces Baja Designs, Racks)'
      ],
      features: {
        hasPaintBoothLaminar: true,
        hasDynoTuning: true,
        hasCleanRoomPPF: true,
        hasVipLounge: true
      }
    }
  },
  services: [
    {
      id: "ppf-defender-ultra",
      name: "PPF SV Defender Ultra (8.5 Mil)",
      shortDesc: "Lámina autorregenerativa de poliuretano termoplástico contra pedradas, micro-rayas y radiación extrema.",
      fullDesc: "El blindaje definitivo para la carrocería en la Ciudad Blanca. Desarrollado con tecnología de polímeros elastoméricos autorreparables por calor solar o pistola de aire caliente. Elimina por completo las micro-rayas ocasionadas por lavado o polvo volcánico, garantizando la pintura original de fábrica sin un solo rasguño.",
      iconName: "ShieldCheck",
      badge: "Insignia Flagship",
      warrantyYears: "10 Años Escrita",
      startingPriceSoles: 2800,
      featuredSpecs: [
        "Espesor premium de 8.5 mils de protección contra impactos de carretera",
        "Autorregeneración térmica inmediata con calor de Arequipa (>30°C)",
        "Capa superior ultra-hidrofóbica con ángulo de contacto de 110°",
        "Corte computarizado por software 3D para evitar bisturí sobre pintura"
      ]
    },
    {
      id: "ceramic-coating-9h",
      name: "Tratamiento Cerámico 9H Graphene Matrix",
      shortDesc: "Escudo molecular líquido con infusión de grafeno para brillo profundo y máxima protección UV.",
      fullDesc: "Formulación de enlaces moleculares permanentes que sella los poros del barniz automotriz. Crea una capa cristalina con dureza 9H en la escala de Mohs que repele agua, suciedad, excremento de aves y lluvia ácida, conservando un efecto de reflejo espejo permanente.",
      iconName: "Sparkles",
      badge: "Brillo Profundo",
      warrantyYears: 5,
      startingPriceSoles: 1200,
      featuredSpecs: [
        "Dureza certificada 9H contra micro-abrasiones",
        "Efecto de repelencia al polvo volcánico y tierra andina",
        "Brillo húmedo profundo tipo 'Candy Glaze'",
        "Disminución drástica de adherencia de suciedad y facilidad de lavado"
      ]
    },
    {
      id: "nanoceramic-window-tint",
      name: "Polarizado Nanocerámico Térmico 99% UV",
      shortDesc: "Bloqueo del 95% de radiación infrarroja solar para reducir la temperatura interior hasta 15°C.",
      fullDesc: "Diseñado específicamente para el clima implacable de Arequipa (donde la radiación UV supera los 15 puntos). Compuesto por nanopartículas cerámicas no metálicas que rechazan el calor infrarrojo sin interferir con señales de GPS, telepeajes ni telefonía celular.",
      iconName: "SunDim",
      badge: "Clima Arequipa 16 UVI",
      warrantyYears: "Garantía de Por Vida",
      startingPriceSoles: 650,
      featuredSpecs: [
        "99% de reducción de radiación ultravioleta nociva (UVA/UVB)",
        "Hasta 95% de rechazo de calor infrarrojo (IR)",
        "Reducción de temperatura de cabina de 65°C a 32°C bajo el sol",
        "Tonalidades homologadas con certificación de visibilidad"
      ]
    },
    {
      id: "valvetronic-exhaust",
      name: "Sistemas de Escape Valvetronic",
      shortDesc: "Sonido ronco deportivo y silencioso de confort mediante válvulas electrónicas comandadas a distancia.",
      fullDesc: "La dualidad perfecta entre discreción urbana y rugido deportivo en pista. Construcción en acero inoxidable T304 o titanio con compuertas motorizadas de apertura milimétrica controladas por control remoto o botón integrado en cabina.",
      iconName: "Volume2",
      badge: "Performance Sound",
      warrantyYears: 3,
      startingPriceSoles: 1950,
      featuredSpecs: [
        "Modo Quiet para zonas residenciales y Modo Sport para autovía",
        "Ganancia de 8 a 15 HP por optimización de contra-presión",
        "Punteras en fibra de carbono real forjado o quemado titanio azul",
        "Instalación limpia plug & play con soldadura TIG de precisión"
      ]
    },
    {
      id: "custom-wraps-3m",
      name: "Custom Color Wraps & Acabados Satinados",
      shortDesc: "Cambio total de color con vinilos fundidos premium 3M 2080 y Oracal, protegiendo la pintura base.",
      fullDesc: "Personalización visual ilimitada sin repintar tu vehículo. Más de 100 colores disponibles entre acabados satinados, mates, metálicos y camaleónicos con desmontaje profesional y terminación en bordes invisibles.",
      iconName: "Palette",
      warrantyYears: 4,
      startingPriceSoles: 3200,
      featuredSpecs: [
        "Película fundida 3M 2080 de doble capa con tecnología de microcanales de aire",
        "Cero residuos ni daño al adhesivo original al momento del retiro",
        "Protección UV que preserva el valor de reventa de la pintura original",
        "Diseño gráfico personalizado disponible para franjas o libreas deportivas"
      ]
    },
    {
      id: "overland-armor-custom",
      name: "Equipamiento Overland & Blindaje Off-Road",
      shortDesc: "Preparación de camionetas 4x4 para expediciones andinas, rutas mineras y desiertos del sur.",
      fullDesc: "Preparación integral para Toyota Hilux, Ford Ranger, Jeep Wrangler y Land Cruiser. Instalación de suspensiones Old Man Emu/Fox, parachoques con soporte para winche, protecciones inferiores y PPF de alta resistencia de 10 mil para zanjas y ramas.",
      iconName: "Compass",
      badge: "Rutas Andinas",
      warrantyYears: 3,
      startingPriceSoles: 2400,
      featuredSpecs: [
        "Blindaje frontal contra pedrisco de trochas y gravilla de carretera",
        "Instalación certificada de Winches Warn y Snorkels sellados",
        "Iluminación LED Off-road de alta penetración para niebla y altura",
        "Alineamiento y calibración de geometría para neumáticos All-Terrain"
      ]
    }
  ],
  uvProtectionNotice: {
    uvIndexArequipa: "14 - 16+ UVI (Nivel Extremo)",
    sunDamageFact: "Arequipa se encuentra a 2,325 metros sobre el nivel del mar y registra los índices de radiación UV más elevados del continente. Sin una barrera de poliuretano o polarizado nanocerámico, el barniz automotriz sufre calcinación, opacidad y resquebrajamiento prematuro en menos de 24 meses.",
    ppfAdvantageFact: "El film SV Defender Ultra contiene inhibidores UV grado aeroespacial que filtran el 99.8% de los rayos solares y mantienen el interior hasta 20°C más fresco en las horas pico de radiación."
  }
};
