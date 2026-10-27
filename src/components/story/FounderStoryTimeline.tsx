'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Award, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  TrendingUp, 
  ShieldCheck, 
  Star, 
  ChevronRight,
  MessageCircle,
  Building2,
  Sparkles
} from 'lucide-react';
import { businessData } from '@/data/businessData';

interface Milestone {
  year: string;
  title: string;
  location: string;
  description: string;
  badge: string;
  icon: string;
  metricLabel: string;
  metricValue: string;
}

const MILESTONES: Milestone[] = [
  {
    year: '2018',
    title: 'El Comienzo: Taller de 2x2m con $100',
    location: 'Arequipa, Perú',
    description: 'Paul Abel Ayamamani López, graduado en Negocios Internacionales, apostó sus últimos $100 de capital y una pistola de calor en un reducido local de 2x2 metros. Guiado por una obsesión extrema por el detalle y la estética automotriz, comenzó polarizando y protegiendo autos particulares con técnicas artesanales.',
    badge: 'Capital Semilla',
    icon: 'Sparkles',
    metricLabel: 'Inversión Inicial',
    metricValue: '$100 USD'
  },
  {
    year: '2020',
    title: 'Acreditación Internacional & Especialización 3M',
    location: 'Certificaciones Globales',
    description: 'Viajó para capacitarse en técnicas de blindaje de poliuretano y corrección de barniz con estándares norteamericanos, logrando la certificación como Instalador Acreditado 3M. Introdujo el concepto de corte computarizado por software en Arequipa para proteger la pintura de fábrica sin bisturí.',
    badge: 'Certificación 3M',
    icon: 'Award',
    metricLabel: 'Cortes con Bisturí',
    metricValue: '0% (100% Plotter)'
  },
  {
    year: '2022',
    title: 'Creación de SV Film & Apertura Sede Dolores',
    location: 'Av. Dolores 128, Bustamante y Rivero',
    description: 'Ante el clima abrasivo de Arequipa (16 UVI), Paul desarrolló la fórmula de poliuretano autorregenerativo SV Film Defender Ultra (8.5 mil). Inauguró la Sede Dolores, especializada en Detailing 360°, corrección óptica de pintura y polarizados nanocerámicos de alto rechazo térmico.',
    badge: 'Marca Propia',
    icon: 'Building2',
    metricLabel: 'Espesor PPF',
    metricValue: '8.5 Mils'
  },
  {
    year: '2024',
    title: 'SEMA Show Las Vegas & Mega Taller Sachaca',
    location: 'Las Vegas Convention Center / Sachaca, Arequipa',
    description: 'Paul asiste como técnico especializado al evento automotriz más grande del planeta: el SEMA Show de Las Vegas, adoptando las últimas formulaciones de grafeno y escapes Valvetronic. Ese mismo año inaugura el Mega Taller de Sachaca, con cabina quirúrgica presurizada con filtración HEPA.',
    badge: 'SEMA Show Las Vegas',
    icon: 'Award',
    metricLabel: 'Cabina Quirúrgica',
    metricValue: 'Flujo Laminar HEPA'
  },
  {
    year: '2026',
    title: 'Liderazgo Regional, +64k TikTok & Red B2B',
    location: 'Sur del Perú',
    description: 'SV Tuning & Performance se consolida como la máxima autoridad en protección automotriz de la región. Más de 64,000 seguidores en TikTok, 4.9 estrellas con más de 350 reseñas en Google Maps y distribución mayorista de láminas SV Film a más de 15 talleres en Cusco, Puno, Moquegua y Tacna.',
    badge: 'Autoridad Líder',
    icon: 'TrendingUp',
    metricLabel: 'Comunidad TikTok',
    metricValue: '+64.2K Seguidores'
  }
];

export default function FounderStoryTimeline() {
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(3); // Highlight SEMA Show Las Vegas
  const activeMilestone = MILESTONES[activeMilestoneIndex];
  const { founder, socialProof, legalName, ruc } = businessData;

  return (
    <section id="historia" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5B869]/15 border border-[#E5B869]/30 text-xs font-bold text-[#E5B869] mb-3">
            <Award className="w-3.5 h-3.5" /> Biografía de Superación & Liderazgo Automotriz
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            DE UN TALLER DE 2X2M AL SEMA SHOW
          </h2>
        </div>
        <p className="text-[#94A3B8] text-sm sm:text-base max-w-lg mt-4 md:mt-0 leading-relaxed">
          La trayectoria de <strong>Paul Abel Ayamamani López</strong>: disciplina técnica, perfeccionismo quirúrgico y el desarrollo de la marca <em>SV Film</em> en el sur del Perú.
        </p>
      </div>

      {/* Timeline Nav Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-10">
        {MILESTONES.map((milestone, idx) => {
          const isActive = activeMilestoneIndex === idx;

          return (
            <button
              key={milestone.year}
              type="button"
              onClick={() => setActiveMilestoneIndex(idx)}
              className={`p-3.5 sm:p-4 rounded-2xl transition-all duration-200 text-left border cursor-pointer ${
                isActive 
                  ? 'bg-[#1A2234] border-[#00F0FF] shadow-lg shadow-[#00F0FF]/15 scale-[1.02]' 
                  : 'bg-[#111622]/70 border-white/5 hover:bg-[#111622] text-[#94A3B8]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-black ${isActive ? 'text-[#00F0FF]' : 'text-[#94A3B8]'}`}>
                  {milestone.year}
                </span>
                <span className="text-[10px] uppercase font-bold text-[#94A3B8] hidden sm:inline">
                  {milestone.badge}
                </span>
              </div>
              <span className={`text-xs sm:text-sm font-bold block truncate ${isActive ? 'text-white' : 'text-slate-400'}`}>
                {milestone.title.split(':')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Milestone Spotlight Feature Card */}
      <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-white/15 relative overflow-hidden">
        
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 relative">
          
          {/* Milestone Details */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm sm:text-base font-black px-3.5 py-1 rounded-xl bg-[#00F0FF] text-black">
                {activeMilestone.year}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E5B869] px-3 py-1 rounded-xl bg-[#E5B869]/10 border border-[#E5B869]/20">
                {activeMilestone.location}
              </span>
              <span className="text-xs text-[#94A3B8]">
                {activeMilestone.badge}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {activeMilestone.title}
            </h3>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              {activeMilestone.description}
            </p>

            {/* Achievements Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-white/10">
              {founder.achievements.slice(0, 4).map((achieve, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{achieve}</span>
                </div>
              ))}
            </div>

            {/* Direct Social Proof & Legal Attribution */}
            <div className="flex flex-wrap items-center gap-4 pt-4 mt-2">
              <a
                href={socialProof.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00F0FF] hover:bg-[#38f4ff] text-black text-xs font-bold transition-all shadow-md shadow-[#00F0FF]/25"
              >
                <span>Ver Proceso en TikTok ({socialProof.tiktokFollowers})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://wa.me/51960595412?text=${encodeURIComponent(`Hola Paul Ayamamani, he leído tu trayectoria con SV Tuning y me gustaría agendar una asesoría para mi vehículo.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111622] hover:bg-[#1A2234] border border-white/15 text-white text-xs font-bold transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#FF3823]" />
                <span>Contactar a Paul Ayamamani</span>
              </a>
            </div>

          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            <div className="p-6 rounded-2xl bg-[#07090E]/90 border border-white/10 flex flex-col items-center text-center">
              <span className="text-xs uppercase font-extrabold text-[#94A3B8] tracking-widest mb-1">
                {activeMilestone.metricLabel}
              </span>
              <span className="text-3xl sm:text-4xl font-black text-[#00F0FF]">
                {activeMilestone.metricValue}
              </span>
              <span className="text-[11px] text-[#94A3B8] mt-2">
                Hito verificado en la evolución de SV Tuning
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#111622]/60 border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#94A3B8]">
                <span>Razón Social:</span>
                <span className="font-semibold text-white">{legalName}</span>
              </div>
              <div className="flex items-center justify-between text-[#94A3B8]">
                <span>RUC:</span>
                <span className="font-semibold text-white">{ruc}</span>
              </div>
              <div className="flex items-center justify-between text-[#94A3B8]">
                <span>Acreditación:</span>
                <span className="font-semibold text-emerald-400">Master Installer 3M</span>
              </div>
              <div className="flex items-center justify-between text-[#94A3B8]">
                <span>Red Mayorista:</span>
                <span className="font-semibold text-[#E5B869]">15+ Talleres en Provincias</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
