'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  Star, 
  MapPin, 
  CheckCircle2, 
  ChevronRight,
  Flame,
  Award,
  Zap,
  Volume2
} from 'lucide-react';
import { businessData } from '@/data/businessData';
import { useLenis } from '@/components/providers/LenisProvider';

export default function HeroCinematic() {
  const { scrollTo } = useLenis();
  const { founder, socialProof, branches } = businessData;
  const [activeBranchId, setActiveBranchId] = useState<'dolores' | 'sachaca'>('dolores');

  const activeBranch = branches[activeBranchId];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 lg:py-24 overflow-hidden border-b border-white/10">
      
      {/* Background Poster Image with fetchPriority="high" for Sub-1.8s LCP */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2400&q=85"
          alt="Porsche 911 GT3 con blindaje PPF en SV Tuning Arequipa"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 brightness-75 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Obsidian Vignette and Neon Radial Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/80 to-[#07090E]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090E] via-[#07090E]/70 to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00F0FF]/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#FF3823]/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full flex flex-col items-start z-10">
        
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111622]/90 border border-[#00F0FF]/40 text-xs text-white shadow-lg shadow-[#00F0FF]/10 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
            </span>
            <span className="font-bold text-white tracking-wide">SV TUNING & PERFORMANCE</span>
            <span className="text-[#00F0FF]">•</span>
            <span className="text-[#00F0FF] font-semibold flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> SEMA Show Las Vegas
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111622]/80 border border-white/10 text-xs text-[#94A3B8] backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Arequipa:</span>
            <button 
              type="button"
              onClick={() => setActiveBranchId('dolores')}
              className={`font-semibold cursor-pointer transition-colors ${activeBranchId === 'dolores' ? 'text-white underline decoration-[#00F0FF]' : 'hover:text-white'}`}
            >
              Dolores
            </button>
            <span>/</span>
            <button 
              type="button"
              onClick={() => setActiveBranchId('sachaca')}
              className={`font-semibold cursor-pointer transition-colors ${activeBranchId === 'sachaca' ? 'text-white underline decoration-[#FF3823]' : 'hover:text-white'}`}
            >
              Sachaca
            </button>
          </div>
        </div>

        {/* Main H1 Title */}
        <div className="max-w-4xl text-left mb-6">
          <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08] mb-4">
            BLINDAJE ÓPTICO PPF &{' '}
            <span className="text-gradient-cyan block sm:inline">ALTO RENDIMIENTO</span>{' '}
            PARA VEHÍCULOS DE ÉLITE
          </h1>
          <p className="text-base sm:text-xl text-[#94A3B8] font-normal leading-relaxed max-w-2xl">
            Desarrollado bajo la dirección de <strong className="text-white font-semibold">Paul Abel Ayamamani López</strong>. Protegemos tu inversión frente a la radiación solar extrema de <span className="text-[#FF3823] font-bold">16 UVI en Arequipa</span> con poliuretano autorregenerativo y nano-grafeno 9H.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
          <button
            type="button"
            onClick={() => scrollTo('#despiece-ppf', { offset: -80 })}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-black bg-[#00F0FF] hover:bg-[#38f4ff] transition-all duration-200 shadow-xl shadow-[#00F0FF]/30 hover:shadow-2xl hover:shadow-[#00F0FF]/50 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            Ver Despiece Cinemático PPF
          </button>

          <a
            href={`https://wa.me/${activeBranch.whatsappNumber}?text=${encodeURIComponent(`Hola Paul Ayamamani / SV Tuning (${activeBranch.name}), deseo cotizar la protección PPF y estética de mi vehículo.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-white bg-[#111622] hover:bg-[#1A2234] border border-white/15 hover:border-[#FF3823]/60 transition-all duration-200 active:scale-95 shadow-lg group"
          >
            <MessageCircle className="w-4 h-4 text-[#FF3823] group-hover:scale-110 transition-transform" />
            <span>Cotizar en {activeBranch.name}</span>
            <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Authority & Trust Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl pt-6 border-t border-white/10">
          
          <div className="p-3.5 rounded-2xl glass-panel-subtle flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-[#E5B869] font-black text-2xl sm:text-3xl">
              <span>{socialProof.googleRating}</span>
              <Star className="w-5 h-5 fill-[#E5B869] text-[#E5B869]" />
            </div>
            <span className="text-[11px] text-[#94A3B8] font-medium mt-0.5">
              {socialProof.googleReviewCount}+ Reseñas Verificadas
            </span>
          </div>

          <div className="p-3.5 rounded-2xl glass-panel-subtle flex flex-col justify-center">
            <span className="text-[#00F0FF] font-black text-2xl sm:text-3xl">
              {socialProof.tiktokFollowers}
            </span>
            <span className="text-[11px] text-[#94A3B8] font-medium mt-0.5">
              Comunidad Viral TikTok
            </span>
          </div>

          <div className="p-3.5 rounded-2xl glass-panel-subtle flex flex-col justify-center">
            <span className="text-[#FF3823] font-black text-2xl sm:text-3xl">
              10 Años
            </span>
            <span className="text-[11px] text-[#94A3B8] font-medium mt-0.5">
              Garantía Escrita PPF
            </span>
          </div>

          <div className="p-3.5 rounded-2xl glass-panel-subtle flex flex-col justify-center">
            <span className="text-emerald-400 font-black text-2xl sm:text-3xl">
              15+ Talleres
            </span>
            <span className="text-[11px] text-[#94A3B8] font-medium mt-0.5">
              Red B2B en Provincias
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
