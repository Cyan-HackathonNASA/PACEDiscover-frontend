import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import OscillatingStars from './OscillatingStars';
import { useControls } from 'leva'

const EarthScene = () => {
  //

  
  // Texturas de exemplo (textura original)
  const dayTexture = useLoader(
    THREE.TextureLoader,
    '/AQUA_MODIS.20020801_20020831.L3m.MO.CHL.chlor_a.4km.nc.png'
  );
  const nightTexture = useLoader(
    THREE.TextureLoader,
    '/AQUA_MODIS.20020801_20020831.L3m.MO.CHL.chlor_a.4km.nc.png'
  );
  const cloudsTexture = useLoader(
    THREE.TextureLoader,
    '/AQUA_MODIS.20020801_20020831.L3m.MO.CHL.chlor_a.4km.nc.png'
  );

  // Texturas de seleção dinâmicas
  const textureLinks = [
    { name: 'Chlorophyll - August 2002', url: '/AQUA_MODIS.20020801_20020831.L3m.MO.CHL.chlor_a.4km.nc.png' },
    { name: 'Chlorophyll - September 2002', url: '/AQUA_MODIS.20020901_20020930.L3m.MO.CHL.chlor_a.4km.nc.png' },
    { name: 'Chlorophyll - October 2002', url: '/AQUA_MODIS.20021001_20021031.L3m.MO.CHL.chlor_a.4km.nc.png' },
    { name: 'Chlorophyll - November 2002', url: '/AQUA_MODIS.20021101_20021130.L3m.MO.CHL.chlor_a.4km.nc.png' }
  ];

  // Estado para armazenar a textura dinâmica, começando com a textura original
  const [selectedTexture, setSelectedTexture] = useState(dayTexture);
  const [selectedTextureOpacity, setSelectedTextureOpacity] = useState(1.0); // Estado para controlar a opacidade

  // Estado para a URL da textura selecionada no select (inicia como vazio)
  const [selectedTextureUrl, setSelectedTextureUrl] = useState('');

  // Carregar a nova textura dinâmica quando o URL mudar, exceto no início
  useEffect(() => {
    if (selectedTextureUrl) {
      const loader = new THREE.TextureLoader();
      loader.load(selectedTextureUrl, (texture) => {
        setSelectedTexture(texture);
      });
    }
  }, [selectedTextureUrl]);

  // Textura de fundo para o espaço
  const spaceTexture = useLoader(
    THREE.TextureLoader,
    '/hdri_test.jpg'
  );
  spaceTexture.wrapS = THREE.RepeatWrapping;
  spaceTexture.wrapT = THREE.RepeatWrapping;
  spaceTexture.repeat.set(4, 4); // Define a quantidade de repetição horizontal e vertical

  return (
    <div style={{display: 'flex', flexDirection: 'row', height: '-webkit-fill-available', width: '-webkit-fill-available'}}>
      <div style={{flex: 1, marginTop: '15vh'}}>
        <p style={{...titleText, marginBottom: '5vh'}}>Satellite: PACE-OCI</p>
        <p style={{...titleText, fontSize: 40}}>Filters:</p>
      </div>
      <div style={{flex: 1}}>
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          {/* Controles de órbita */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            zoomSpeed={0.5}
            minDistance={1.5}  // Limite mínimo de zoom (aproximação)
            maxDistance={6.0} 
          />

          {/* Iluminação */}
          <ambientLight intensity={0.8} />

          <Environment files="./envs/hdri_nebula.hdr" background />
          
          {/* Planeta Terra com a textura atual */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial 
              map={selectedTexture}              // Aplica a textura selecionada dinamicamente
              emissive={new THREE.Color(0x00B1FF)} 
              emissiveIntensity={0.9}            
              emissiveMap={selectedTexture}       // Aplica a emissividade na textura
              opacity={selectedTextureOpacity}    // Controla a opacidade dinâmica
              transparent={true}                  // Permite transparência para controlar visibilidade
            />
            <Html center>
              <div style={{ color: 'white', background: 'rgba(0, 0, 0, 0.5)', padding: '2px 5px', borderRadius: '3px' }}>
                Earth
              </div>
            </Html>
          </mesh>

          {/* Neon Glow em torno da Terra com emissividade */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1.04, 64, 64]} />
            <meshPhysicalMaterial 
              emissive={new THREE.Color(0x0099FF)} 
              emissiveIntensity={4.5}              
              clearcoat={1}                      
              roughness={0}                      
              transparent={true}
              opacity={0.5}                      
              side={THREE.BackSide}              
            />
          </mesh>

          {/* Componente de Estrelas Oscilantes */}
          <OscillatingStars />


          {/* Background manual com textura repetida */}
          <mesh>
            <sphereGeometry args={[100, 64, 64]} />
            <meshBasicMaterial map={spaceTexture} side={THREE.BackSide} />
          </mesh>

          {/* Efeito de pós-processamento para brilho */}
          <EffectComposer>
            <Bloom 
              intensity={3}            
              luminanceThreshold={0.1}  
              luminanceSmoothing={0.9}  
              radius={1}                
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
};

const titleText = {
  color: 'white',
  fontSize: 48,
  fontWeight: 700,
}

export default EarthScene;
