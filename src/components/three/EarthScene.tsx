/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import OscillatingStars from './OscillatingStars';
import api from '@/app/api';
import Select from 'react-select';

const EarthScene = () => {
  const defaultTexture = useLoader(THREE.TextureLoader, '/earth-default.jpg');
  const spaceTexture = useLoader(THREE.TextureLoader, '/hdri_test.jpg');

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();
  const [month, setMonth] = useState<string | undefined>();
  const [selectedTexture, setSelectedTexture] = useState(defaultTexture);

  const getProducts = async () => {
    const { data } = await api.get('/product/');
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const getTexture = async () => {
      const { data } = await api.get(
        `/image/?product=${selectedProduct}&year=2024&month=${month}&res=4km&period=monthly`
      );
      const loader = new THREE.TextureLoader();
      loader.load(`data:image/png;base64, ${data.image_base64}`, (texture: any) => {
        setSelectedTexture(texture);
      });
    };
    if (selectedProduct && month) {
      getTexture();
    }
  }, [selectedProduct, month]);

  // Opções do dropdown
  const productOptions = products.map((product: any) => ({
    value: product.id,
    label: product.name,
  }));

  const monthOptions = [
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '-webkit-fill-available',
        width: '-webkit-fill-available',
      }}
    >
      <div style={{ flex: 1, marginTop: '15vh' }}>
        <p style={{ ...titleText, marginBottom: '5vh' }}>Satellite: PACE-OCI</p>
        <p style={{ ...titleText, fontSize: 40, marginBottom: '2vh' }}>Filters:</p>
        <p style={labelText}>Data type:</p>
        <Select
          options={productOptions}
          onChange={(option) => setSelectedProduct(option?.value)}
          styles={customSelectStyles}
        />
        <div style={{ marginTop: '1vh' }}></div>
        <p style={labelText}>Month:</p>
        <Select
          options={monthOptions}
          onChange={(option) => setMonth(option?.value)}
          styles={customSelectStyles}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          {/* Controles de órbita */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            zoomSpeed={0.5}
            minDistance={1.5} // Limite mínimo de zoom (aproximação)
            maxDistance={6.0}
          />

          {/* Iluminação */}
          <ambientLight intensity={0.8} />

          {/* Planeta Terra com a textura atual */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
              map={selectedTexture} // Aplica a textura selecionada dinamicamente
              emissive={new THREE.Color(0x00b1ff)}
              emissiveIntensity={0.9}
              emissiveMap={selectedTexture} // Controla a opacidade dinâmica
              transparent={true} // Permite transparência para controlar visibilidade
            />
          </mesh>

          {/* Neon Glow em torno da Terra com emissividade */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1.04, 64, 64]} />
            <meshPhysicalMaterial
              emissive={new THREE.Color(0x0099ff)}
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
};

const labelText = {
  color: 'white',
  fontSize: 28,
  fontWeight: 400,
  marginBottom: '1vh',
};

const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: 'transparent',
    borderColor: 'white',
    color: 'white',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: 'black',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
    color: 'white',
  }),
};

export default EarthScene;
