'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  Sun, 
  Flame, 
  CheckCircle2, 
  ChevronRight,
  Info,
  Droplets,
  Activity
} from 'lucide-react';

interface LayerData {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  thickness: string;
  hardness: string;
  uvProtection: string;
  heatResponse: string;
  description: string;
  highlights: string[];
  accentColor: string;
  gradient: string;
}

const PROTECTION_LAYERS: LayerData[] = [
  {
    id: 1,
    slug: 'chasis',
    name: 'Capa 01: Chasis & Sustrato Metálico',
    subtitle: 'Acero estampado de alta resistencia / Aluminio aeronáutico',
    thickness: '0.7 - 1.2 mm',
    hardness: '5.5 Mohs',
    uvProtection: '0% (Requiere sellado externo)',
    heatResponse: 'Dilatación térmica estándar',
    description: 'La estructura de fábrica del automóvil. Es altamente vulnerable a la humedad, salitre andino y corrosión galvánica si la pintura exterior se fractura con el impacto de gravilla en carretera.',
    highlights: [
      'Base estructural sobre la que reposa la pintura de fábrica',
      'Vulnerable al óxido si no se aísla de la intemperie',
      'Sometido a vibración y torsión en trochas andinas'
    ],
    accentColor: '#94A3B8',
    gradient: 'from-slate-700 to-slate-900',
  },
  {
    id: 2,
    slug: 'pintura-oem',
    name: 'Capa 02: Pintura OEM & Barniz Original',
    subtitle: 'Pigmento de fábrica y capa transparente transparente (Clearcoat)',
    thickness: '100 - 140 micrones (4 - 5.5 mil)',
    hardness: '2.5 - 3.5 Mohs (Barniz blando moderno)',
    uvProtection: 'Defensa básica de fábrica',
    heatResponse: 'Calcinación prematura bajo 16 UVI',
    description: 'El acabado estético original del fabricante. Los barnices contemporáneos con base agua son extremadamente blandos y sufren micro-rayas (swirl marks) en cada lavado, además de perder brillo por la radiación extrema de Arequipa.',
    highlights: [
      'Grosor microscópico vulnerable a pedradas a más de 60 km/h',
      'El 80% de los autos en Arequipa presentan opacidad en menos de 3 años',
      'La pérdida de pintura original reduce el valor de reventa hasta en un 30%'
    ],
    accentColor: '#FF3823',
    gradient: 'from-red-900/60 to-slate-900',
  },
  {
    id: 3,
    slug: 'ppf-defender',
    name: 'Capa 03: PPF SV Defender Ultra (8.5 Mil)',
    subtitle: 'Poliuretano termoplástico elastomérico con memoria molecular',
    thickness: '215 micrones (8.5 mil de alta densidad)',
    hardness: 'Elástica autorreparable',
    uvProtection: '99.8% Bloqueo Ultravioleta',
    heatResponse: 'Autorregeneración inmediata con calor (>30°C)',
    description: 'La armadura óptica desarrollada por Paul Ayamamani. Disipa la energía cinética de piedras de carretera, ramas espinosas y llaves. Su capa superior elástica cicatriza cualquier rayón con la simple exposición al sol arequipeño o agua tibia.',
    highlights: [
      'Absorción de impactos mecánicos de gravilla a más de 120 km/h',
      'Propiedad de memoria molecular térmica: los arañazos desaparecen solos',
      'Corte milimétrico por computadora (Plotter 3D) sin bisturí en el auto',
      '10 Años de garantía escrita contra desprendimiento o amarillamiento'
    ],
    accentColor: '#C5A059',
    gradient: 'from-[#C5A059]/30 to-[#111622]',
  },
  {
    id: 4,
    slug: 'nano-ceramic',
    name: 'Capa 04: Tratamiento Cerámico 9H Graphene',
    subtitle: 'Matriz molecular de cuarzo líquido y nanoplacas de grafeno',
    thickness: '2 - 3 micrones (Escudo ultradenso)',
    hardness: '9H Certificado en Escala Mohs',
    uvProtection: '100% Barrera de absorción UV/IR',
    heatResponse: 'Resistente hasta 850°C de temperatura',
    description: 'La capa exterior que interactúa con el medio ambiente. Sella los microporos del PPF creando una tensión superficial extrema: el agua rueda en esferas perfectas arrastrando el polvo volcánico y evitando que el barro se incruste.',
    highlights: [
      'Ángulo de contacto hidrofóbico superior a 110° (efecto loto)',
      'Efecto antiestático: el polvo volcánico no se adhiere a la carrocería',
      'Brillo ultra profundo con efecto espejo permanente',
      'Facilita el lavado semanal en menos de 10 minutos sin frotar'
    ],
    accentColor: '#E5B869',
    gradient: 'from-[#E5B869]/30 to-[#111622]',
  }
];

export default function ExplodedLayers() {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(2); // Default to PPF Defender
  const [isSimulatingHeat, setIsSimulatingHeat] = useState(false);
  const [scratchRepaired, setScratchRepaired] = useState(false);

  const activeLayer = PROTECTION_LAYERS[selectedLayerIndex];

  const handleSimulateHeat = () => {
    setIsSimulatingHeat(true);
    setScratchRepaired(false);
    setTimeout(() => {
      setScratchRepaired(true);
      setIsSimulatingHeat(false);
    }, 1800);
  };

  return (
    <section id="despiece-ppf" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A26] border border-white/10 text-xs font-semibold text-[#C5A059] mb-3">
            <Layers className="w-3.5 h-3.5" /> Arquitectura Óptica de Protección Multicapa
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            DESPIECE CINEMÁTICO EN CAPAS
          </h2>
        </div>
        <p className="text-[#94A3B8] text-sm sm:text-base max-w-lg mt-4 md:mt-0 leading-relaxed">
          Descubre cómo el chasis de fábrica se transforma en un blindaje impenetrable mediante la combinación de poliuretano autorregenerativo y nano-grafeno 9H.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 3D Exploded Representation & Interactive Layer Selector */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Visual Exploded Stack Container */}
          <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col justify-between">
            
            {/* Ambient Background Glow matching active layer */}
            <div 
              className="absolute inset-0 opacity-20 blur-3xl pointer-events-none transition-all duration-700"
              style={{ backgroundColor: activeLayer.accentColor }}
            />

            {/* Header info inside stage */}
            <div className="flex items-center justify-between z-10 border-b border-white/10 pb-4">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#94A3B8]">
                Vista Esquemática de Carrocería
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-white">
                Espesor Total: ~1.4 mm
              </span>
            </div>

            {/* Exploded Layers Visualizer (Stacked 3D Perspective Bars) */}
            <div className="my-8 flex flex-col gap-3 sm:gap-4 z-10">
              {PROTECTION_LAYERS.map((layer, index) => {
                const isSelected = selectedLayerIndex === index;

                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => {
                      setSelectedLayerIndex(index);
                      setScratchRepaired(false);
                    }}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 relative flex items-center justify-between cursor-pointer border ${
                      isSelected 
                        ? 'bg-[#161D2C] border-white/30 shadow-xl scale-[1.02]' 
                        : 'bg-[#0B0F17]/70 border-white/5 hover:bg-white/5 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div 
                        className="w-3.5 h-10 sm:h-12 rounded-lg shrink-0 shadow-md transition-colors"
                        style={{ backgroundColor: layer.accentColor }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-extrabold text-white">
                            {layer.name}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30">
                              Activa
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] sm:text-xs text-[#94A3B8] block mt-0.5">
                          {layer.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] text-[#94A3B8] block uppercase font-semibold">Grosor</span>
                      <span className="text-xs font-bold text-white">{layer.thickness}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Interactive Scratch & Heal Simulator */}
            <div className="pt-4 border-t border-white/10 z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                <Flame className={`w-4 h-4 ${isSimulatingHeat ? 'text-[#DC2626] animate-bounce' : 'text-[#C5A059]'}`} />
                <span>
                  {scratchRepaired 
                    ? '✓ Microrrayón reparado por calor térmico (Memoria elástica)' 
                    : isSimulatingHeat 
                      ? 'Simulando radiación solar / calor a 45°C...' 
                      : 'Prueba la autorregeneración molecular del film SV Defender'}
                </span>
              </div>

              <button
                type="button"
                onClick={handleSimulateHeat}
                disabled={isSimulatingHeat}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-white hover:bg-neutral-200 disabled:opacity-50 transition-all cursor-pointer shadow-md"
              >
                <Sun className="w-3.5 h-3.5 text-neutral-800" />
                Simular Calor Solar Arequipa
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: Layer Detailed Technical Inspection Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/15 relative overflow-hidden">
            
            <div className="flex items-center justify-between mb-4">
              <span 
                className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/10"
                style={{ color: activeLayer.accentColor }}
              >
                {activeLayer.slug.toUpperCase()}
              </span>
              <span className="text-xs text-[#94A3B8] font-bold">
                Especificación Técnica
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {activeLayer.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
              {activeLayer.description}
            </p>

            {/* Technical Metrics Bento Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-[#07090E]/80 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-[#94A3B8] block">Espesor Nominal</span>
                <span className="text-sm font-black text-white">{activeLayer.thickness}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#07090E]/80 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-[#94A3B8] block">Dureza Estructural</span>
                <span className="text-sm font-black text-[#E5B869]">{activeLayer.hardness}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#07090E]/80 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-[#94A3B8] block">Filtro Radiación UV</span>
                <span className="text-sm font-black text-emerald-400">{activeLayer.uvProtection}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#07090E]/80 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-[#94A3B8] block">Comportamiento Térmico</span>
                <span className="text-xs font-bold text-[#C5A059]">{activeLayer.heatResponse}</span>
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-2.5 pt-4 border-t border-white/10">
              <span className="text-xs uppercase font-extrabold text-[#94A3B8] tracking-wider block">
                Beneficios Operativos
              </span>
              {activeLayer.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action CTA for this Layer */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <a
                href={`https://wa.me/51987507459?text=${encodeURIComponent(`Hola Paul SV Tuning, deseo consultar sobre la instalación de ${activeLayer.name} para mi vehículo.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-white bg-[#141A26] hover:bg-[#1A2232] border border-white/10 hover:border-[#C5A059] transition-all duration-200"
              >
                <span>Cotizar esta capa con Paul Ayamamani</span>
                <ChevronRight className="w-4 h-4 text-[#C5A059]" />
              </a>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
