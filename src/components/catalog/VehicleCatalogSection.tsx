'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  SlidersHorizontal,
  MapPin,
  Check
} from 'lucide-react';
import { vehicleCatalog } from '@/data/vehicleCatalog';
import { businessData } from '@/data/businessData';
import { VehicleCategory } from '@/types';

export default function VehicleCatalogSection() {
  const { branches } = businessData;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: `Todos (${vehicleCatalog.length})` },
    { id: 'overland', label: 'Overland & Pickups 4x4' },
    { id: 'luxury_suv', label: 'SUVs de Lujo & Familia' },
    { id: 'supercar', label: 'Superdeportivos & Élite' },
    { id: 'tuner', label: 'Street Tuner & Rally' },
  ];

  const filteredVehicles = useMemo(() => {
    return vehicleCatalog.filter((v) => {
      const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query || 
        v.brand.toLowerCase().includes(query) ||
        v.model.toLowerCase().includes(query) ||
        v.edition.toLowerCase().includes(query) ||
        v.tagline.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="catalogo" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Portafolio Automotriz Oficial • 20 Modelos para el Perú
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            VEHÍCULOS EMBLEMÁTICOS
          </h2>
        </div>
        <p className="text-[#94A3B8] text-sm max-w-md mt-4 md:mt-0 leading-relaxed">
          Cada chasis recibe un protocolo milimétrico adaptado a la geografía andina, la radiación extrema de 16 UVI en Arequipa y la velocidad en carretera.
        </p>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-3xl bg-[#0F131C] border border-white/10 mb-10">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white text-black shadow-md'
                  : 'bg-[#141A26] text-[#94A3B8] hover:text-white hover:bg-[#1A2232]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[260px] sm:w-72">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar modelo (ej. Hilux, Prado, Raptor, Porsche)..."
            className="w-full bg-[#141A26] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-[#94A3B8]/60 focus:outline-none focus:border-[#C5A059] transition-colors"
          />
        </div>

      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="group rounded-3xl glass-panel p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-[#C5A059]/40 transition-all duration-300 relative overflow-hidden"
          >
            <div>
              {/* Top Row: Brand, Category, Badges */}
              <div className="flex items-start justify-between gap-3 mb-4 z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
                    {vehicle.categoryLabel}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <span className="text-xs font-semibold text-[#E5B869] block">
                    {vehicle.edition}
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-[#111622] border border-white/10 text-white shrink-0">
                  Sede {branches[vehicle.specs.idealBranch].name}
                </span>
              </div>

              {/* Vehicle Poster Image with Responsive Sizing */}
              <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-5 border border-white/5 bg-neutral-900/60">
                <Image
                  src={vehicle.posterImage}
                  alt={`${vehicle.brand} ${vehicle.model} en SV Tuning Arequipa`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080C] via-transparent to-transparent opacity-80" />
                
                {/* Overlay Badges */}
                <div className="absolute bottom-2.5 left-2.5 flex flex-wrap gap-1">
                  {vehicle.badges.slice(0, 2).map((b) => (
                    <span key={b} className="text-[9px] font-bold px-2 py-0.5 rounded bg-black/80 text-white backdrop-blur-md border border-white/15">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs & Description */}
              <div className="space-y-3 mb-5 z-10">
                <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                  {vehicle.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs bg-[#0A0D14]/90 p-2.5 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[#94A3B8] block text-[9px] uppercase font-semibold">Motorización</span>
                    <span className="text-white font-bold text-xs truncate block">{vehicle.specs.power.split('/')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8] block text-[9px] uppercase font-semibold">Blindaje Óptimo</span>
                    <span className="text-[#C5A059] font-bold text-xs truncate block">{vehicle.recommendedPPFThickness}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between z-10 mt-auto">
              <span className="text-[11px] text-[#94A3B8] truncate max-w-[170px]">
                {vehicle.specs.recommendedService.split('+')[0]}
              </span>
              <a
                href={`https://wa.me/${branches[vehicle.specs.idealBranch].whatsappNumber}?text=${encodeURIComponent(`Hola Paul SV Tuning, me interesa configurar y cotizar el tratamiento para mi ${vehicle.brand} ${vehicle.model} (${vehicle.edition}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A059] hover:text-white transition-colors"
              >
                Cotizar <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-[#0F131C] border border-white/10 my-8">
          <p className="text-sm text-[#94A3B8]">
            No se encontraron modelos con el término &quot;{searchQuery}&quot;.
          </p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-[#C5A059] text-black"
          >
            Ver todos los 20 modelos
          </button>
        </div>
      )}

    </section>
  );
}
