'use client';
import React, { useState, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useControls, folder, Leva } from 'leva';

const EarthScene = () => {
  // Usar estado para detectar o lado do cliente
  const [isClient, setIsClient] = useState(false);

  // Atualiza o estado para `true` após a montagem do componente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Carregar texturas usando `useLoader` para que sejam chamadas em todas as renderizações
  const dayTexture = useLoader(THREE.TextureLoader, '/AQUA_MODIS.20020801_20020831.L3m.MO.CHL.chlor_a.4km.nc.png');
  const nightTexture = useLoader(THREE.TextureLoader, '/AQUA_MODIS.20020801_20020831.L3m.MO.CHL.chlor_a.4km.nc.png');
  const cloudsTexture = useLoader(THREE.TextureLoader, '/AQUA_MODIS.20020801_20020831.L3m.MO.CHL.chlor_a.4km.nc.png');
  const spaceTexture = useLoader(THREE.TextureLoader, '/hdri_test.jpg');

  // Texturas dinâmicas
  const textureLinks = [
    { label: 'Chlorophyll - August 2002', value: '/AQUA_MODIS.20020801_20020831.L3m.MO.CHL.chlor_a.4km.nc.png' },
    { label: 'Chlorophyll - September 2002', value: '/AQUA_MODIS.20020901_20020930.L3m.MO.CHL.chlor_a.4km.nc.png' },
    { label: 'Chlorophyll - October 2002', value: '/AQUA_MODIS.20021001_20021031.L3m.MO.CHL.chlor_a.4km.nc.png' },
    { label: 'Chlorophyll - November 2002', value: '/AQUA_MODIS.20021101_20021130.L3m.MO.CHL.chlor_a.4km.nc.png' },
  ];

  // Controles do Leva (sempre chamados, mas com condicional no valor de `options`)
  const { selectedTextureUrl, textureOpacity } = useControls({
    Textures: folder({
      selectedTextureUrl: {
        label: 'Select Texture',
        options: isClient
          ? {
              'Earth Day': dayTexture,
              'Earth Night': nightTexture,
              'Earth Clouds': cloudsTexture,
              ...textureLinks.reduce((acc, link) => ({ ...acc, [link.label]: link.value }), {}),
            }
          : {}, // Opções vazias no lado do servidor
      },
      textureOpacity: { value: 1.0, min: 0, max: 1, step: 0.01, label: 'Texture Opacity' },
    }),
  });

  // Estado para a textura selecionada e atualização dinâmica
  const [selectedTexture, setSelectedTexture] = useState(dayTexture);
  const [hovered, setHovered] = useState(false);

  // Atualiza a textura quando `selectedTextureUrl` muda (também no lado do cliente)
  useEffect(() => {
    if (isClient && typeof selectedTextureUrl === 'string') {
      const loader = new THREE.TextureLoader();
      loader.load(selectedTextureUrl, (texture) => {
        setSelectedTexture(texture);
      });
    }
  }, [selectedTextureUrl, isClient]);

  // Configuração da textura de fundo
  useEffect(() => {
    if (spaceTexture) {
      spaceTexture.wrapS = THREE.RepeatWrapping;
      spaceTexture.wrapT = THREE.RepeatWrapping;
      spaceTexture.repeat.set(4, 4); // Define a repetição horizontal e vertical da textura
    }
  }, [spaceTexture]);

  return (
    <div className='flex w-full h-screen'>
      {/* Painel de Controle Leva no lado esquerdo */}
      <div className='absolute left-12 top-12 lg:left-20 lg:top-20 p-4 z-50'>
        <Leva fill />
      </div>

      {/* Canvas de Visualização 3D no lado direito */}
      <div className='w-full h-full'>
        {isClient && ( // Renderiza o Canvas apenas no cliente
          <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
            {/* Componente de câmera e controles */}
            <OrbitControls enableZoom={true} enablePan={false} zoomSpeed={0.5} minDistance={0.5} maxDistance={4.0} />

            {/* Iluminação e ambiente */}
            <ambientLight intensity={0.8} />
            <Environment files="./envs/hdri_nebula.hdr" background />

            {/* Planeta Terra com a textura selecionada */}
            <mesh position={[0, 0, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial
                map={selectedTexture}
                emissive={hovered ? new THREE.Color(0xff8800) : new THREE.Color(0x00B1FF)}
                emissiveIntensity={0.9}
                emissiveMap={selectedTexture}
                opacity={textureOpacity}
                transparent={true}
              />
              <Html center>
                <div style={{ color: 'white', background: 'rgba(0, 0, 0, 0.5)', padding: '2px 5px', borderRadius: '3px' }}>
                  Earth
                </div>
              </Html>
            </mesh>

            {/* Neon Glow ao redor da Terra */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1.04, 64, 64]} />
              <meshPhysicalMaterial
                emissive={hovered ? new THREE.Color(0xff8800) : new THREE.Color(0x0099FF)}
                emissiveIntensity={4.5}
                clearcoat={1}
                roughness={0}
                transparent={true}
                opacity={0.5}
                side={THREE.BackSide}
              />
            </mesh>

            {/* Background manual com a textura repetida */}
            <mesh>
              <sphereGeometry args={[100, 64, 64]} />
              <meshBasicMaterial map={spaceTexture} side={THREE.BackSide} />
            </mesh>

            {/* Efeito de pós-processamento para brilho */}
            <EffectComposer>
              <Bloom intensity={3} luminanceThreshold={0.1} luminanceSmoothing={0.9} radius={1} />
            </EffectComposer>
          </Canvas>
        )}
      </div>
    </div>
  );
};

export default EarthScene;
