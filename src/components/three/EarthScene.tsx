/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import OscillatingStars from './OscillatingStars';
import api from '@/app/api';

const EarthScene = () => {
  const defaultTexture = useLoader(THREE.TextureLoader, '/earth-default.jpg');
  const spaceTexture = useLoader(THREE.TextureLoader, '/hdri_test.jpg');

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<string|undefined>();
  const [month, setMonth] = useState<string|undefined>();
  const [selectedTexture, setSelectedTexture] = useState(defaultTexture);

  const getProducts = async () => {
    const {data} = await api.get('/product')
    setProducts(data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    const getTexture = async () => {
      const {data} = await api.get(`/image/?product=${selectedProduct}&year=2024&month=${month}&res=4km&period=monthly`)
      const loader = new THREE.TextureLoader();
      loader.load(
        `data:image/png;base64, ${data.image_base64}`,
        (texture: any) => {
          setSelectedTexture(texture)
        })
    }
    if (selectedProduct && month) {
      getTexture()
    }
  }, [selectedProduct, month])

  // Configuração da textura de fundo

  return (
    <div className='flex flex-col items-center lg:flex-row min-h-screen lg:gap-10'>
      <div className='z-20 text-white w-full lg:w-2/3 ml-12 lg:mb-40'>
        <h1 className='text-4xl font-semibold select-none'>Satellite: PACE-OCI</h1>
        <div className='flex flex-col gap-2 select-none'>
          <p className='text-xl font-light'>Filters:</p>
          <label htmlFor="dataType">Data type:</label>
          <select id='dataType' onChange={(e) => setSelectedProduct(e.target.value)}>
            <option value={''}>Select</option>
            {products.map((product: any) => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div style={{marginTop: '1vh'}}></div>
        <div className='flex flex-col gap-2 select-none'>
          <label htmlFor="dataMonth">Month:</label>
          <select id="dataMonth" onChange={(e) => setMonth(e.target.value)} >
            <option value={''}>Select</option>
            <option value={'03'}>March</option>
            <option value={'04'}>April</option>
            <option value={'05'}>May</option>
            <option value={'06'}>June</option>
            <option value={'07'}>July</option>
            <option value={'08'}>August</option>
            <option value={'09'}>September</option>
          </select>
        </div>
      </div>
      <div className='h-svh w-full lg:w-1/2 right-0 absolute z-10'>
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

          {/* <Environment files="./envs/hdri_nebula.hdr" background /> */}
          
          {/* Planeta Terra com a textura atual */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial 
              map={selectedTexture}              // Aplica a textura selecionada dinamicamente
              emissive={new THREE.Color(0x00B1FF)} 
              emissiveIntensity={0.9}            
              emissiveMap={selectedTexture}       // Controla a opacidade dinâmica
              transparent={true}                  // Permite transparência para controlar visibilidade
            />
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

const labelText = {
  color: 'white',
  fontSize: 28,
  fontWeight: 400,
  marginBottom: '1vh'
}

const select = {
  backgroundColor: 'transparent',
  color: 'white',
  padding: 16,
  width: 340,
  height: 64,
  borderWidth: 1,
  borderColor: 'white',
  fontSize: 20,
}

export default EarthScene;
