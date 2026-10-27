import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Syne } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/providers/LenisProvider';
import Navbar from '@/components/layout/Navbar';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['700', '800'],
});

export const viewport: Viewport = {
  themeColor: '#06080C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'SV Tuning & Performance | Blindaje PPF, Detailing y Tuning en Arequipa',
  description: 'Taller de ultra lujo en Arequipa fundado por Paul Abel Ayamamani López. Especialistas certificados en PPF SV Defender Ultra, polarizado nanocerámico 99% UV, tratamiento cerámico 9H y escapes Valvetronic. Sedes en Dolores y Sachaca.',
  icons: {
    icon: '/favicon.svg',
  },
  keywords: [
    'SV Tuning',
    'Paul Ayamamani',
    'PPF Arequipa',
    'Paint Protection Film Peru',
    'Detailing Arequipa',
    'Polarizado Nanoceramico',
    'Ceramico 9H',
    'Tuning Arequipa',
    'SEMA Show',
    'SV Film Defender Ultra',
    'Sede Dolores',
    'Sede Sachaca'
  ],
  authors: [{ name: 'Paul Abel Ayamamani López' }],
  creator: 'SV TUNING AREQUIPA S.A.C.',
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://svtuning.pe',
    title: 'SV Tuning & Performance | Blindaje PPF y Detailing de Ultra Lujo',
    description: 'La máxima autoridad en protección y estética automotriz en Arequipa. Sedes Dolores y Sachaca.',
    siteName: 'SV Tuning & Performance',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${jakartaSans.variable} ${syne.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen bg-[#06080C] text-[#F8FAFC] antialiased selection:bg-[#C5A059] selection:text-black">
        <LenisProvider>
          <Navbar />
          <main className="relative pt-20 sm:pt-24 min-h-screen flex flex-col">
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
