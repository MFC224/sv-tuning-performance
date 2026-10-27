# SV Tuning & Performance — Plataforma Web de Ultra Lujo

Plataforma digital de estética, blindaje óptico (**PPF SV Defender Ultra 8.5 mil**), tratamientos nanocerámicos 9H y personalización de alto rendimiento para **SV Tuning & Performance** (**Paul Abel Ayamamani López** / `SV TUNING AREQUIPA S.A.C.` - RUC 20614788632), ubicada en **Arequipa, Perú**.

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_PBR-black?logo=three.js)](https://threejs.org/)
[![Tests](https://img.shields.io/badge/Tests-41_Passing-emerald)](https://vitest.dev/)

---

## Características Principales

- **Estudio 3D Central ("SV 3D Studio")**:
  - Motor de renderizado **Three.js WebGL PBR** con ciclorama de estudio oscuro e iluminación personalizable (*Estudio Día* / *Noche Neón*).
  - Modelos paramétricos fotorrealistas:
    1. **Toyota Hilux Overland Edition** (Chasis elevado, snorkel, winche Warn y protección 10 mil).
    2. **Porsche 911 GT3 (992)** (Alerón cuello de cisne Swan-neck, splitter aerodinámico y PPF Stealth Satin).
    3. **Porsche Macan Turbo** (SUV de ultra lujo, detailing VIP y polarizado nanocerámico 99% UV).
    4. **Subaru WRX Rally & Street** (Toma de aire en capó, escape Valvetronic y alerón de competición).
  - Controles orbitales 360° con 5 perspectivas canónicas con interpolación suave.
  - **GPU Freeze**: Suspensión automática del bucle de animación vía `IntersectionObserver` cuando el canvas no está en pantalla para preservar 60-120 FPS y batería.

- **Hero Cinemático & Scrollytelling**:
  - Precarga de imagen LCP (`fetchpriority="high"`) garantizando Core Web Vitals (< 1.8s LCP).
  - **Despiece Cinemático en Capas (*Exploded Layers*)**: Chasis de fábrica $\rightarrow$ Pintura OEM $\rightarrow$ PPF SV Defender Ultra $\rightarrow$ Escudo Nanocerámico 9H Graphene.
  - **Simulador Interactivo *Scratch & Heal***: Cicatrización térmica en vivo por memoria molecular.
  - **Línea de Tiempo del Fundador**: De un taller de 2x2m con $100 USD al **SEMA Show de Las Vegas**.

- **Arquitectura Multisede en Arequipa**:
  - **Sede Dolores**: Av. Dolores 128, Bustamante y Rivero (+51 960 595 412).
  - **Sede Sachaca**: Av. Fernandini / Tahuaycani s/n (+51 987 507 459).
  - Selector en vivo en la Navbar flotante y generación de enlaces estructurados a WhatsApp con código **SV-Code**.

---

## Tecnologías Utilizadas

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript.
- **Estilos**: Tailwind CSS v4, Paleta *Dark Luxury Obsidian* (`#07090E`, `#111622`, `#00F0FF`, `#FF3823`, `#E5B869`).
- **Renderizado 3D**: Three.js (WebGL, PBR, ACES Filmic Tone Mapping, sombras PCF).
- **Smooth Scroll**: Lenis Scroll synchronizado con GSAP Ticker.
- **Suite de Pruebas**: Vitest, `@testing-library/react`, JSDOM (41 pruebas unitarias y de integración).

---

## Instalación y Ejecución Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/MFC224/sv-tuning-performance.git
cd sv-tuning-performance

# 2. Instalar dependencias
npm install

# 3. Ejecutar pruebas unitarias y de integración
npm run test

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Compilar para producción
npm run build
npm run start
```

---

## Despliegue en Vercel

1. Ingresa a [Vercel Dashboard](https://vercel.com/new).
2. Conecta tu cuenta de GitHub (`MFC224`).
3. Importa el repositorio **`sv-tuning-performance`**.
4. Haz clic en **Deploy**. El proyecto se compilará y desplegará en la nube global de Vercel.

---

**SV Tuning & Performance** • Arequipa, Perú  
Fundador & Master Installer: Paul Abel Ayamamani López • SEMA Show Certified
