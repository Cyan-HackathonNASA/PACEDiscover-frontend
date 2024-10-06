import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Ocean from './Ocean';
import Island from './models/Island';

const SceneOcean = () => {
  return (
    <Canvas camera={{ position: [0, 100, 300], fov: 50 }}> {/* Câmera ajustada para simular uma visão elevada */}
      <Suspense fallback={null}>
        {/* Componente de ambiente para o background */}
        <Environment files="./envs/sky2.hdr" background />
        
        {/* Controles de órbita para navegação */}
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.3}  // Limita o controle de órbita para evitar que olhe para baixo do horizonte
          minPolarAngle={Math.PI / 3.5}  // Ajuste de ângulo para reforçar a visão de mar aberto
          target={[0, 20, 0]}  // Define o ponto focal para dar mais ênfase no horizonte
          minDistance={150}  // Limite mínimo de zoom (aproximação)
          maxDistance={500}  // Limite máximo de zoom (afastamento)
        />

        {/* Componente do Oceano */}
        <Ocean />

        {/* Adiciona a ilha à cena */}
        <Island />
      </Suspense>
    </Canvas>
  );
};

export default SceneOcean;
