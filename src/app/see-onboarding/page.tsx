'use client';
import React, { useState, Suspense } from 'react';
import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';

// Carregar Onboarding de forma dinâmica com Suspense e fallback
const Onboarding = dynamic(() => import('@/components/three/Onboarding'), {
  ssr: false,
  loading: () => <Loading />, // Adicione o fallback aqui também, caso necessário
});

export default function SeeOnboarding() {
  const [experienceStarted, setExperienceStarted] = useState(false);

  return (
    <section className="h-screen bg-black text-white flex items-center justify-center">
      {!experienceStarted ? (
        // Tela inicial antes do carregamento da experiência
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to the PACE Experience</h1>
          <button
            onClick={() => setExperienceStarted(true)}
            className="bg-cyan-500 hover:bg-cyan-600 text-lg font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Start Experience
          </button>
        </div>
      ) : (
        // Envolvendo a experiência em um Suspense para exibir o componente Loading
        <Suspense fallback={<Loading />}>
          <Onboarding />
        </Suspense>
      )}
    </section>
  );
}
