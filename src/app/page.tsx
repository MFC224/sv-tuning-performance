import React from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Sparkles, 
  SunDim, 
  Volume2, 
  Palette, 
  Compass, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle
} from 'lucide-react';
import { businessData } from '@/data/businessData';
import { vehicleCatalog } from '@/data/vehicleCatalog';
import HeroCinematic from '@/components/hero/HeroCinematic';
import SV3DStudio from '@/components/studio3d/SV3DStudio';
import ExplodedLayers from '@/components/scrollytelling/ExplodedLayers';
import FounderStoryTimeline from '@/components/story/FounderStoryTimeline';

export default function HomePage() {
  const { branches, services, uvProtectionNotice } = businessData;

  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#C5A059]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#E5B869]" />,
    SunDim: <SunDim className="w-6 h-6 text-[#FF3823]" />,
    Volume2: <Volume2 className="w-6 h-6 text-[#C5A059]" />,
    Palette: <Palette className="w-6 h-6 text-[#A855F7]" />,
    Compass: <Compass className="w-6 h-6 text-[#EAB308]" />,
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. HERO SECTION (LCP < 1.8s, Priority Image & Authority Badges) */}
      <HeroCinematic />

      {/* 2. SV 3D STUDIO EXPERIENCE (WebGL Three.js Studio, Hilux Overland, 911 GT3, Macan, WRX) */}
      <SV3DStudio />

      {/* 3. EXPLODED LAYERS SCROLLYTELLING (Chasis -> Pintura OEM -> PPF SV Defender -> 9H Graphene) */}
      <ExplodedLayers />

      {/* 3. UV RADIATION ALERT (Arequipa 14 - 16+ UVI) */}
      <section className="bg-gradient-to-r from-amber-950/20 via-[#0A0D14] to-amber-950/20 border-y border-[#C5A059]/25 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-[#C5A059] shrink-0 border border-[#C5A059]/20">
              <SunDim className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">
                Alerta de Radiación Solar Arequipa: <span className="text-[#E5B869] font-black">{uvProtectionNotice.uvIndexArequipa}</span>
              </p>
              <p className="text-[11px] text-[#94A3B8]">
                {uvProtectionNotice.sunDamageFact}
              </p>
            </div>
          </div>
          <a
            href="#despiece-ppf"
            className="text-xs font-semibold text-[#C5A059] hover:text-white flex items-center gap-1.5 shrink-0 transition-colors"
          >
            Ver Blindaje SV Defender <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 4. VEHICLE CATALOG (Toyota Hilux Overland, Porsche 911 GT3, Macan Turbo, Subaru WRX) */}
      <section id="catalogo" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Portafolio de Ingeniería Automotriz
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              VEHÍCULOS EMBLEMÁTICOS
            </h2>
          </div>
          <p className="text-[#94A3B8] text-sm max-w-md mt-4 md:mt-0">
            Cada chasis recibe un protocolo milimétrico adaptado a la geografía andina y a la velocidad en carretera.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {vehicleCatalog.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group rounded-3xl glass-panel p-6 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-[#C5A059]/40 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Row: Brand, Category, Badges */}
              <div className="flex items-start justify-between gap-4 mb-4 z-10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                    {vehicle.categoryLabel}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <span className="text-xs font-semibold text-[#E5B869]">
                    {vehicle.edition}
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-[#111622] border border-white/10 text-white shrink-0">
                  Sede {branches[vehicle.specs.idealBranch].name}
                </span>
              </div>

              {/* Vehicle Poster Image with Responsive Sizing */}
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-white/5 bg-neutral-900/50">
                <Image
                  src={vehicle.posterImage}
                  alt={`${vehicle.brand} ${vehicle.model} en SV Tuning Arequipa`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080C] via-transparent to-transparent opacity-80" />
                
                {/* Overlay Badges */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                  {vehicle.badges.map((b) => (
                    <span key={b} className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/75 text-white backdrop-blur-md border border-white/15">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs & Description */}
              <div className="space-y-4 mb-6 z-10">
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {vehicle.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs bg-[#0A0D14]/90 p-3 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[#94A3B8] block text-[10px] uppercase font-semibold">Motorización</span>
                    <span className="text-white font-bold">{vehicle.specs.power}</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8] block text-[10px] uppercase font-semibold">Blindaje Óptimo</span>
                    <span className="text-white font-bold">{vehicle.recommendedPPFThickness}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between z-10">
                <span className="text-xs text-[#94A3B8]">
                  {vehicle.specs.recommendedService}
                </span>
                <a
                  href={`https://wa.me/${branches[vehicle.specs.idealBranch].whatsappNumber}?text=${encodeURIComponent(`Hola Paul SV Tuning, me interesa configurar y cotizar el tratamiento para mi ${vehicle.brand} ${vehicle.model} (${vehicle.edition}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A059] hover:text-white transition-colors"
                >
                  Cotizar Proyecto <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FOUNDER STORY TIMELINE (Paul Ayamamani: 2x2m con $100 -> SEMA Show Las Vegas) */}
      <FounderStoryTimeline />

      {/* 6. SERVICES SECTION (PPF, Cerámico 9H, Polarizado, Escapes Valvetronic, Wraps, Overland) */}
      <section id="servicios" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-2 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Especialidad Quirúrgica Automotriz
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            TRATAMIENTOS DE PRECISIÓN
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-4">
            Cada servicio cuenta con cabina presurizada libre de polvo, corte computarizado por software 3D y garantía escrita oficial de hasta 10 años.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-3xl glass-panel p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-[#111622] border border-white/10">
                    {iconMap[service.iconName] || <ShieldCheck className="w-6 h-6 text-[#C5A059]" />}
                  </div>
                  {service.badge && (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#C5A059]/15 text-[#E5B869] border border-[#C5A059]/30">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {service.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
                  {service.fullDesc}
                </p>

                <div className="space-y-2 mb-6">
                  {service.featuredSpecs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#94A3B8] block">Garantía</span>
                  <span className="text-xs font-bold text-emerald-400">{service.warrantyYears}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#94A3B8] block">Desde</span>
                  <span className="text-sm font-black text-white">S/ {service.startingPriceSoles}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SEDES EN AREQUIPA (Dolores & Sachaca) */}
      <section id="sedes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" /> Ubicaciones en Arequipa
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            NUESTRAS 2 SEDES OPERATIVAS
          </h2>
          <p className="text-[#94A3B8] text-sm mt-3">
            Infraestructura con cabina de flujo laminar HEPA, iluminación estroboscópica y lounge VIP.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Sede Dolores */}
          <div className="rounded-3xl glass-panel p-8 border border-white/10 hover:border-[#C5A059]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase text-[#C5A059] tracking-wider">
                  Sede Detailing & Mantenimiento VIP
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Abierto Hoy
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                {branches.dolores.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] mb-6">
                {branches.dolores.address}, {branches.dolores.district}, {branches.dolores.city}
              </p>

              <div className="space-y-2 mb-6">
                {branches.dolores.specialties.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase block font-semibold">Teléfono Directo</span>
                <span className="text-sm font-bold text-white">{branches.dolores.phoneDisplay}</span>
              </div>
              <a
                href={`https://wa.me/${branches.dolores.whatsappNumber}?text=${encodeURIComponent(branches.dolores.whatsappMessagePreset)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs transition-all shadow-md shadow-white/10"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-black" />
                Agendar en Dolores
              </a>
            </div>
          </div>

          {/* Sede Sachaca */}
          <div className="rounded-3xl glass-panel p-8 border border-white/10 hover:border-[#FF3823]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase text-[#FF3823] tracking-wider">
                  Mega Taller PPF & Performance
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Cabinas Presurizadas Activas
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                {branches.sachaca.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] mb-6">
                {branches.sachaca.address}, {branches.sachaca.district}, {branches.sachaca.city}
              </p>

              <div className="space-y-2 mb-6">
                {branches.sachaca.specialties.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF3823] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase block font-semibold">Teléfono Directo</span>
                <span className="text-sm font-bold text-white">{branches.sachaca.phoneDisplay}</span>
              </div>
              <a
                href={`https://wa.me/${branches.sachaca.whatsappNumber}?text=${encodeURIComponent(branches.sachaca.whatsappMessagePreset)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#b38f48] text-black font-bold text-xs transition-all shadow-md shadow-[#C5A059]/20"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-black" />
                Agendar en Sachaca
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="mt-20 border-t border-white/10 bg-[#06080C] px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <span className="font-black text-lg text-white">SV TUNING & PERFORMANCE</span>
            <span className="text-xs text-[#94A3B8]">
              {businessData.legalName} • RUC {businessData.ruc} • Arequipa, Perú
            </span>
            <span className="text-[11px] text-[#94A3B8]">
              Fundador: Paul Abel Ayamamani López • 3M & SEMA Certified
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#94A3B8]">
            <a href="#catalogo" className="hover:text-white transition-colors">Catálogo</a>
            <a href="#despiece-ppf" className="hover:text-white transition-colors">Despiece PPF</a>
            <a href="#historia" className="hover:text-white transition-colors">Historia SEMA</a>
            <a href="#sedes" className="hover:text-white transition-colors">Sedes</a>
            <a href={businessData.socialProof.tiktokUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A059] transition-colors">
              TikTok Oficial
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
