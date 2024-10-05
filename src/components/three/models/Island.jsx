// components/Island.jsx
import React from 'react';
import { useGLTF } from '@react-three/drei';

// Componente para carregar o modelo GLB
const Island = () => {
  // Carrega o modelo 3D usando o hook useGLTF
  const { scene } = useGLTF('/models/green_island.glb'); // Substitua pelo caminho correto para o seu arquivo .glb

  console.log('GLTF Scene:', scene);


  return (
    <primitive 
      object={scene} 
      scale={(100 * Math.PI) * 1.5}  // Ajuste o tamanho do modelo conforme necessário
      position={[0, 26, 0]} // Posicione o modelo conforme a cena
      rotation={[0, Math.PI / 2, 0]}  // Altere a rotação conforme necessário
    />
  );
};

export default Island;
