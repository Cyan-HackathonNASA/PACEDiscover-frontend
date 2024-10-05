import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import Ocean from './Ocean';

// Componente para carregar o modelo GLB
const Island = () => {
  // Carrega o modelo 3D usando useGLTF
  const { scene } = useGLTF('/models/green_island.glb');

  return (
    <primitive 
      object={scene} 
      scale={(100 * Math.PI) * 1.5}
      position={[0, 26, 0]}
      rotation={[0, 1.1, 0]}
    />
  );
};

// Código do componente Hero
const Hero = () => {
  return (
    <div className='relative w-full h-screen'>
      {/* Canvas para o fundo do oceano */}
      <Canvas camera={{ position: [0, 100, 300], fov: 50 }}> {/* Câmera ajustada para simular uma visão elevada */}
        <Suspense fallback={null}>
          {/* Componente de ambiente para o background */}
          <Environment files="./envs/sky2.hdr" background />
          
          {/* Controles de órbita para navegação */}
          <OrbitControls 
            maxPolarAngle={Math.PI / 2.3}  // Limita o controle de órbita para evitar que olhe para baixo do horizonte
            minPolarAngle={Math.PI / 3.5}  // Ajuste de ângulo para reforçar a visão de mar aberto
            target={[0, 20, 0]}  // Define o ponto focal para dar mais ênfase no horizonte
          />

          {/* Componente do Oceano */}
          <Ocean />

          {/* Adiciona a ilha à cena */}
          <Island />
        </Suspense>
      </Canvas>

      {/* Container centralizado com texto e botão */}
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center'>
        <h1 className='text-white text-5xl font-bold mb-4'>Discover The Ocean</h1>
        <button className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 ease-in-out'>
          Learn from this Experience
        </button>
      </div>
    </div>
  );
};

export default Hero;
