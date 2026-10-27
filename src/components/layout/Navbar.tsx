'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  ChevronDown, 
  Sparkles, 
  Menu, 
  X, 
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
    { label: 'Despiece PPF', href: '#despiece-ppf' },
    { label: 'Catálogo', href: '#catalogo' },
    { label: 'Historia SEMA', href: '#historia' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Sedes', href: '#sedes' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300">
      <div 
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0A0D14]/90 backdrop-blur-2xl shadow-2xl shadow-black/80 py-3 px-5 sm:px-7 border border-white/10' 
            : 'bg-[#0A0D14]/60 backdrop-blur-md py-3.5 px-5 sm:px-7 border border-white/5'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Luxury Atelier Brand */}
          <Link 
            href="/" 
            className="flex items-center gap-3.5 group focus:outline-none"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                scrollTo(0);
              }
            }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#141A26] to-[#0A0D14] border border-[#C5A059]/40 group-hover:border-[#D4AF37] transition-all duration-300 shadow-md">
              <span className="font-extrabold text-sm tracking-wider text-[#D4AF37]">
                SV
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-base sm:text-lg text-white">
                  SV TUNING
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-[#C5A059] uppercase hidden sm:inline-block">
                  PERFORMANCE
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Arequipa • Paul Ayamamani
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Branch Selector Pill & Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Branch Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#141A26] hover:bg-[#1A2232] border border-white/10 text-xs text-white transition-all cursor-pointer"
                aria-expanded={isBranchDropdownOpen}
              >
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="font-medium text-white whitespace-nowrap">
                  {currentBranch.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <ChevronDown className={`w-3 h-3 text-[#94A3B8] transition-transform duration-200 ${isBranchDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Branch Dropdown Menu */}
              {isBranchDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#0F131C] shadow-2xl shadow-black border border-white/10 p-3 text-left animate-in fade-in duration-200 z-50 backdrop-blur-2xl">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] mb-2 px-2">
                    Sedes Oficiales en Arequipa
                  </div>

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
                          className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-1 border cursor-pointer ${
                            isSelected 
                              ? 'bg-[#1A2232] border-[#C5A059]/40' 
                              : 'bg-transparent border-transparent hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white flex items-center gap-1.5">
                              {branch.name}
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-medium">
                              {branch.operatingHours.weekdays}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#94A3B8]">
                            {branch.address} • {branch.district}
                          </span>
                          <span className="text-[10px] text-[#C5A059] flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" /> {branch.phoneDisplay}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Call to Action: Clean Luxury Styling */}
            <a
              href={`https://wa.me/${currentBranch.whatsappNumber}?text=${encodeURIComponent(`Hola SV Tuning (${currentBranch.name}), me comunico desde la plataforma web para cotizar blindaje PPF / Detailing para mi vehículo.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs text-black bg-white hover:bg-neutral-200 transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-black" />
              <span>Cotizar WhatsApp</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-[#141A26] border border-white/10 text-white hover:text-[#C5A059] transition-colors"
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
                  className="px-3 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-2 p-3 rounded-xl bg-[#06080C] border border-white/10 flex flex-col gap-1">
              <div className="text-[10px] uppercase font-bold text-[#C5A059] tracking-wider">
                Sede Activa: {currentBranch.name}
              </div>
              <p className="text-xs text-white">{currentBranch.address}, {currentBranch.district}</p>
              <p className="text-xs text-[#94A3B8]">{currentBranch.phoneDisplay}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
