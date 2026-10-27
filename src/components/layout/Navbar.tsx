'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  ChevronDown, 
  Clock, 
  Sparkles, 
  Menu, 
  X, 
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { businessData } from '@/data/businessData';
import { BranchId } from '@/types';
import { useLenis } from '@/components/providers/LenisProvider';

export default function Navbar() {
  const { scrollTo } = useLenis();
  const [selectedBranchId, setSelectedBranchId] = useState<BranchId>('dolores');
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentBranch = businessData.branches[selectedBranchId];
  const alternateBranch = businessData.branches[selectedBranchId === 'dolores' ? 'sachaca' : 'dolores'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    scrollTo(hash, { offset: -90 });
  };

  const navLinks = [
    { label: 'Estudio 3D', href: '#estudio-3d' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Catálogo', href: '#catalogo' },
    { label: 'Despiece PPF', href: '#despiece-ppf' },
    { label: 'Historia SEMA', href: '#historia' },
    { label: 'Sedes Arequipa', href: '#sedes' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300">
      <div 
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 ${
          isScrolled 
            ? 'glass-panel shadow-2xl shadow-black/80 py-2.5 px-4 sm:px-6 border-white/10' 
            : 'bg-[#0B0F17]/80 backdrop-blur-md py-3.5 px-4 sm:px-6 border border-white/5'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                scrollTo(0);
              }
            }}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#111622] to-[#1A2234] border border-[#00F0FF]/30 group-hover:border-[#00F0FF] transition-all duration-300 shadow-lg shadow-[#00F0FF]/10">
              <span className="font-extrabold text-sm tracking-tighter text-[#00F0FF] group-hover:scale-110 transition-transform">
                SV
              </span>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FF3823] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black tracking-wider text-base sm:text-lg text-white">
                  SV TUNING
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-[#FF3823]/20 text-[#FF3823] border border-[#FF3823]/30 hidden sm:inline-block">
                  PERFORMANCE
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                Arequipa • Paul Ayamamani
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-[#94A3B8]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Branch Selector Pill & Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Branch Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#111622] hover:bg-[#1A2234] border border-white/10 hover:border-[#00F0FF]/40 text-xs text-white transition-all duration-200"
                aria-expanded={isBranchDropdownOpen}
              >
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span className="font-semibold text-white whitespace-nowrap">
                    {currentBranch.name}
                  </span>
                </div>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Abierto
                </span>
                <ChevronDown className={`w-3 h-3 text-[#94A3B8] transition-transform duration-200 ${isBranchDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Branch Dropdown Menu */}
              {isBranchDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl glass-panel shadow-2xl shadow-black border border-white/15 p-3 text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2 px-2">
                    Seleccionar Sede en Arequipa
                  </div>

                  {/* Branch List */}
                  <div className="space-y-1.5">
                    {(['dolores', 'sachaca'] as BranchId[]).map((branchId) => {
                      const branch = businessData.branches[branchId];
                      const isSelected = selectedBranchId === branchId;

                      return (
                        <button
                          key={branchId}
                          type="button"
                          onClick={() => {
                            setSelectedBranchId(branchId);
                            setIsBranchDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl transition-all duration-150 flex flex-col gap-1 border ${
                            isSelected 
                              ? 'bg-[#1A2234] border-[#00F0FF]/50 shadow-md shadow-[#00F0FF]/10' 
                              : 'bg-transparent border-transparent hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white flex items-center gap-1.5">
                              {branch.name}
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                              )}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-medium">
                              {branch.operatingHours.weekdays}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#94A3B8]">
                            {branch.address} • {branch.district}
                          </span>
                          <span className="text-[10px] text-[#00F0FF] flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {branch.phoneDisplay}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-between px-2 text-[11px]">
                    <span className="text-[#94A3B8]">Atención Inmediata</span>
                    <a
                      href={`https://wa.me/${currentBranch.whatsappNumber}?text=${encodeURIComponent(currentBranch.whatsappMessagePreset)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00F0FF] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <MessageCircle className="w-3 h-3" /> Chatear en WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Call to Action */}
            <a
              href={`https://wa.me/${currentBranch.whatsappNumber}?text=${encodeURIComponent(`Hola SV Tuning (${currentBranch.name}), me comunico desde la plataforma web para cotizar blindaje PPF / Detailing para mi vehículo.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold text-xs text-black bg-[#00F0FF] hover:bg-[#38f4ff] transition-all duration-200 shadow-md shadow-[#00F0FF]/25 hover:shadow-lg hover:shadow-[#00F0FF]/40 active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-black" />
              <span className="hidden sm:inline">Cotizar en</span> WhatsApp
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-[#111622] border border-white/10 text-white hover:text-[#00F0FF] transition-colors"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-2 pb-2">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 rounded-xl text-sm font-semibold text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-[#94A3B8]" />
                </a>
              ))}
            </nav>

            <div className="mt-2 p-3 rounded-xl bg-[#07090E] border border-white/10 flex flex-col gap-1.5">
              <div className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider">
                Sede Activa para Contacto
              </div>
              <div className="flex items-center justify-between text-xs text-white font-semibold">
                <span>{currentBranch.name}</span>
                <span className="text-emerald-400 font-bold">{currentBranch.phoneDisplay}</span>
              </div>
              <p className="text-[11px] text-[#94A3B8]">
                {currentBranch.address}, {currentBranch.district}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
