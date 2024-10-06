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
  // Estado para armazenar a textura dinâmica, começando com a textura original
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<string|undefined>();
  const [month, setMonth] = useState<string|undefined>();
  const [selectedTexture, setSelectedTexture] = useState(null);


  const spaceTexture = useLoader(THREE.TextureLoader, '/hdri_test.jpg');

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
    <div style={{display: 'flex', flexDirection: 'row', height: '-webkit-fill-available', width: '-webkit-fill-available'}}>
      <div style={{flex: 1, marginTop: '15vh'}}>
        <p style={{...titleText, marginBottom: '5vh'}}>Satellite: PACE-OCI</p>
        <p style={{...titleText, fontSize: 40, marginBottom: '2vh'}}>Filters:</p>
        <p style={labelText}>Data type:</p>
        <select onChange={(e) => setSelectedProduct(e.target.value)} style={select}>
          <option value={''}>Select</option>
          {products.map((product: any) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
        <div style={{marginTop: '1vh'}}></div>
        <p style={labelText}>Month:</p>
        <select onChange={(e) => setMonth(e.target.value)} style={select}>
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
              emissiveMap={selectedTexture}       // Controla a opacidade dinâmica
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
