'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  MessageCircle, 
  Star, 
  MapPin, 
  ChevronRight,
  Award
} from 'lucide-react';
import { businessData } from '@/data/businessData';
import { useLenis } from '@/components/providers/LenisProvider';

export default function HeroCinematic() {
  const { scrollTo } = useLenis();
  const { founder, socialProof, branches } = businessData;
  const [activeBranchId, setActiveBranchId] = useState<'dolores' | 'sachaca'>('dolores');

  const activeBranch = branches[activeBranchId];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden border-b border-white/5">
      
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2400&q=85"
          alt="Porsche 911 GT3 con blindaje PPF en SV Tuning Arequipa"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25 brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080C] via-[#06080C]/85 to-[#06080C]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06080C] via-[#06080C]/80 to-transparent" />
        {/* Soft luxury ambient spotlight (Champagne / Warm Gold tone instead of harsh neon cyan) */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C5A059]/10 rounded-full blur-[180px] pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full flex flex-col items-start z-10">
        
        {/* Top Atelier Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#10131A]/90 border border-white/10 text-xs text-[#94A3B8] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span className="font-semibold text-white tracking-wide uppercase text-[11px]">
              SV Tuning & Performance
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[#C5A059] font-medium flex items-center gap-1 text-[11px]">
              <Award className="w-3.5 h-3.5" /> SEMA Show Las Vegas
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10131A]/70 border border-white/5 text-xs text-[#94A3B8] backdrop-blur-md">
            <MapPin className="w-3 h-3 text-emerald-400" />
            <span>Sedes Arequipa:</span>
            <button 
              type="button"
              onClick={() => setActiveBranchId('dolores')}
              className={`font-semibold cursor-pointer transition-colors ${activeBranchId === 'dolores' ? 'text-white underline decoration-[#C5A059]' : 'hover:text-white'}`}
            >
              Dolores
            </button>
            <span>/</span>
            <button 
              type="button"
              onClick={() => setActiveBranchId('sachaca')}
              className={`font-semibold cursor-pointer transition-colors ${activeBranchId === 'sachaca' ? 'text-white underline decoration-[#C5A059]' : 'hover:text-white'}`}
            >
              Sachaca
            </button>
          </div>
        </div>

        {/* Main Editorial Headline */}
        <div className="max-w-4xl text-left mb-8">
          <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08] mb-5">
            BLINDAJE ÓPTICO PPF &{' '}
            <span className="text-gradient-gold block sm:inline">PERFORMANCE</span>{' '}
            PARA VEHÍCULOS DE ÉLITE
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-2xl">
            Taller de ultra lujo fundado por <strong className="text-white font-semibold">Paul Abel Ayamamani López</strong>. Blindaje termoplástico autorregenerativo y nano-grafeno 9H desarrollado para la radiación extrema de <span className="text-white font-semibold">16 UVI en Arequipa</span>.
          </p>
        </div>

        {/* Action CTAs: Quiet Luxury Styling */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-14">
          <button
            type="button"
            onClick={() => scrollTo('#estudio-3d', { offset: -70 })}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-black bg-white hover:bg-neutral-200 transition-all shadow-xl active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            Configurar en Estudio 3D
          </button>

          <a
            href={`https://wa.me/${activeBranch.whatsappNumber}?text=${encodeURIComponent(`Hola Paul Ayamamani / SV Tuning (${activeBranch.name}), deseo cotizar la protección PPF y estética de mi vehículo.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-white bg-[#10131A] hover:bg-[#161B24] border border-white/10 hover:border-[#C5A059]/50 transition-all active:scale-95 group"
          >
            <MessageCircle className="w-4 h-4 text-[#C5A059]" />
            <span>Asesoría en {activeBranch.name}</span>
            <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Authority & Trust Metrics Bar: Clean Understated Design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-8 border-t border-white/10">
          
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-white font-extrabold text-2xl sm:text-3xl">
              <span>{socialProof.googleRating}</span>
              <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
            </div>
            <span className="text-xs text-[#94A3B8] mt-1">
              {socialProof.googleReviewCount}+ Reseñas Verificadas
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-white font-extrabold text-2xl sm:text-3xl">
              {socialProof.tiktokFollowers}
            </span>
            <span className="text-xs text-[#94A3B8] mt-1">
              Comunidad Viral TikTok
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-white font-extrabold text-2xl sm:text-3xl">
              10 Años
            </span>
            <span className="text-xs text-[#94A3B8] mt-1">
              Garantía Escrita PPF
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#C5A059] font-extrabold text-2xl sm:text-3xl">
              2 Sedes
            </span>
            <span className="text-xs text-[#94A3B8] mt-1">
              Dolores & Sachaca
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
