'use client';
import React, { Suspense } from 'react';
import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';

// Carregar Onboarding de forma dinâmica com Suspense e fallback
const Onboarding = dynamic(() => import('@/components/three/Onboarding'), {
  ssr: false,
  loading: () => <Loading />, // Adicione o fallback aqui também, caso necessário
});

export default function SeeOnboarding() {
  return (
    <section className="h-screen bg-black text-white flex items-center justify-center">
      <Suspense fallback={<Loading />}>
        <Onboarding />
      </Suspense>
    </section>
  );
}
