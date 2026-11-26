import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import rawData from '@/data/templates.json';
import { PharmaceuticalTemplateData } from '@/types/templates.types';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Virexa | Precision Pharmaceuticals & cGMP Clinical Therapeutics',
  description:
    'Virexa develops and manufactures cGMP-certified small molecules, sterile hospital injectables, and targeted biologics for healthcare systems worldwide.',
  icons: {
    icon: '/main logo/header logo.webp',
  },
};

function extractFontName(value: string): string {
  return value.split(',')[0].replace(/['"]/g, '').trim();
}

function buildGoogleFontsUrl(fonts: string[]): string {
  const unique = [...new Set(fonts.map(extractFontName).filter(Boolean))];
  const families = unique
    .map((name) => `family=${encodeURIComponent(name)}:wght@400;500;600;700;800`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const data = rawData as PharmaceuticalTemplateData;
  const sections = data.categories.Pharmaceutical.sections;
  const bodyFont = extractFontName(data.common.theme.fontFamily);
  const displayFont = extractFontName(data.common.theme.displayFontFamily);
  const googleFontsHref = buildGoogleFontsUrl([bodyFont, displayFont]);

  const fontStyle = {
    '--font-site': `'${bodyFont}', system-ui, sans-serif`,
    '--font-display-site': `'${displayFont}', system-ui, sans-serif`,
    fontFamily: `'${bodyFont}', system-ui, sans-serif`,
  } as CSSProperties;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={googleFontsHref} />
      </head>
      <body style={fontStyle} className="font-sans antialiased">
        <Header data={sections.Header.variants.PharmaceuticalHeader2} />
        {children}
        <Footer data={data.common.Footer} />
      </body>
    </html>
  );
}
