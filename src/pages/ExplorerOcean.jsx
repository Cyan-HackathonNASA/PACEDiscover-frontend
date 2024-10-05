import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { useControls } from 'leva';

const ExplorerOcean = () => {
  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState(true);

  // 
  const { name, aNumber } = useControls({ name: 'World', aNumber: 0 })

  // useEffect para definir o atraso de 1.5 segundos no carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    // Limpa o timer ao desmontar o componente
    return () => clearTimeout(timer);
  }, []);

  // Se está carregando, exibe o componente de Loading
  if (isLoading) {
    return <Loading />;
  }

  // Após o carregamento, exibe o conteúdo da página Explorer Ocean
  return (
    <div className='content-container'>
      <h1>Explore the Ocean</h1>
      <p className='text-center'>
        In this section, users will be able to navigate the Earth in an interactive 3D environment. By using filters, they can view specific data on algae and plankton in more detail. Additional information about each filter will be available to help with understanding.
      </p>
      <button class="mt-6 px-6 py-3 text-lg text-white border border-white rounded-[15px] hover:bg-white hover:text-black transition-all duration-300 transform hover:-skew-y-3 hover:scale-105">
        Explore the interactive 3D ocean
      </button>
      <button class="trapezoid-button px-10 py-3 text-lg text-white border border-white hover:bg-white hover:text-black transition-all duration-300">
        Explore the interactive 3D ocean
      </button>
      <button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all ease-in-out duration-300">Cyan</button>
    </div>
  );
};

export default ExplorerOcean;
