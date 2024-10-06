'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

// Importa o componente EarthScene de forma dinâmica, desativando o SSR
// const EarthScene = dynamic(() => import('@/components/three/EarthScene'), { ssr: false, loading: () => <Loading /> });

export default function ExplorerOcean() {
  // Estado para controlar a renderização da cena 3D
  const [show3D, setShow3D] = useState(false);

  return (
    <section className="bg-gray-900 text-white">
      <div className='min-h-screen flex flex-col lg:flex-row items-center justify-between lg:px-20 px-6'>
        
        {/* Seção de texto e botões */}
        <div className='lg:w-1/2 flex flex-col gap-6 items-center justify-center lg:items-start'>
          <h1 className='font-semibold text-5xl text-center lg:text-left w-full'>Explore the Ocean</h1>
          <p className='leading-relaxed tracking-wide mt-2 text-lg text-center lg:text-left'>
            In this section, users will be able to navigate the Earth in an interactive 3D environment. By using filters, they can view specific data on algae and plankton in more detail. Additional information about each filter will be available to help with understanding.
          </p>

          {/* Botões de navegação */}
          {!show3D && (
            <div className='w-full flex gap-4 mt-4'>
              <button
                className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-2 transition-all duration-300 ease-in-out w-1/2'
                onClick={() => setShow3D(true)}
              >
                Explore the interactive 3D ocean
              </button>
              <button className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-2 transition-all ease-in-out duration-300 w-1/2'>
                Learn about PACE-OCI
              </button>
            </div>
          )}
        </div>

        {/* Carregar a experiência 3D apenas após o clique */}
        {show3D && (
          <div className='lg:w-1/2 w-full h-screen lg:h-auto z-50 mt-10 lg:mt-0'>
            {/* <EarthScene /> */}
          </div>
        )}
      </div>
    </section>
  );
}
