import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';

// Extensão para usar `Water` como JSX no React
extend({ Water });

const Ocean = () => {
  const waterRef = useRef();

  // Carregar textura para o normal map da água
  const waterNormals = useLoader(
    THREE.TextureLoader,
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg'
  );
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  // Configuração da geometria e parâmetros do plano de água
  const waterGeometry = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const waterConfig = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(0, 1, 0),
      sunColor: 0xddeeff,
      waterColor: 0x0077be,
      distortionScale: 3.7,
      fog: false,
    }),
    [waterNormals]
  );

  // Atualiza o tempo da água para criar o movimento
  useFrame((state, delta) => {
    if (waterRef.current) {
      waterRef.current.material.uniforms['time'].value += delta;
    }
  });

  return (
    <>
      {/* Iluminação adicional para realçar o tom azulado */}
      <ambientLight intensity={0.6} color="#aad3e6" />
      <directionalLight position={[5, 10, -10]} intensity={1} color="#ffffff" />

      {/* Plano de água */}
      <mesh>
        <water ref={waterRef} args={[waterGeometry, waterConfig]} rotation-x={-Math.PI / 2} position={[0, 0, 0]} />
      </mesh>
    </>
  );
};

export default Ocean;
