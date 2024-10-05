// explorer-ocean/page.tsx
'use client';
import React from 'react';
import dynamic from 'next/dynamic';

// Importa o componente de forma dinâmica, desabilitando a renderização no lado do servidor
const EarthScene = dynamic(() => import('@/components/three/EarthScene'), { ssr: false });

export default function ExplorerOcean() {
  return (
    <section className="">
      <EarthScene />
    </section>
  );
}
