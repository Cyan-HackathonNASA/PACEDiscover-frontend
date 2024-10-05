import React, { useRef, useEffect, useState } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const OscillatingStars = () => {
  const starsRef = useRef();
  const [starsLoaded, setStarsLoaded] = useState(false);
  const { camera } = useThree(); // Obter a câmera atual para acessar sua posição

  useEffect(() => {
    // Configuração da geometria e do material das estrelas
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 10000; // Quantidade de estrelas
    const starPositions = new Float32Array(starCount * 3); // Array para armazenar posições (5000 estrelas * 3 coordenadas)
    const starSizes = new Float32Array(starCount); // Array para armazenar tamanhos individuais

    // Cria posições aleatórias para as estrelas e tamanhos variados
    for (let i = 0; i < starCount; i++) {
      // Posição entre -250 e 250 para cada eixo (x, y, z)
      starPositions[i * 3] = (Math.random() - 0.5) * 500;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 500;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 500;

      // Tamanho entre 0.2 e 1.2
      starSizes[i] = 0.2 + Math.random();
    }

    // Define a geometria e tamanhos para as estrelas
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    // Cria material para as estrelas
    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 3.0 },
        uCameraPosition: { value: new THREE.Vector3() }, // Uniform para a posição da câmera
      },
      vertexShader: `
        attribute float size;
        varying float vOpacity;
        uniform float uTime;
        uniform vec3 uCameraPosition;
        
        void main() {
          // Modifica a posição de cada estrela com base no tempo e oscila aleatoriamente
          vec3 pos = position;
          
          // Movimento responsivo à posição da câmera (efeito paralaxe)
          pos += (position - uCameraPosition) * 0.1;

          // Animações simples para oscilação de posição e opacidade
          pos.x += sin(uTime + position.y * 0.1) * 0.2;
          pos.y += cos(uTime + position.x * 0.1) * 0.2;
          
          vOpacity = 0.5 + 0.5 * sin(uTime + position.y * 0.1);
          
          // Definir posição e tamanho
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        
        void main() {
          // Define um círculo suave para as estrelas
          vec2 uv = gl_PointCoord.xy - 0.5;
          float alpha = 1.0 - smoothstep(0.4, 0.5, length(uv));
          gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * vOpacity);
        }
      `,
      transparent: true,
    });

    // Cria o objeto `Points` com geometria e material e o associa ao `ref`
    const stars = new THREE.Points(starsGeometry, starMaterial);

    starsRef.current = stars;

    // Adiciona um pequeno atraso para garantir o carregamento e evitar bugs visuais
    setTimeout(() => {
      setStarsLoaded(true);
    }, 500); // Adiciona um atraso de 500ms
  }, []);

  // Controle de tempo para a animação de brilho e movimento
  useFrame((state) => {
    if (starsRef.current && starsLoaded) {
      // Atualiza o tempo uniform
      starsRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();

      // Atualiza a posição da câmera no uniforme
      starsRef.current.material.uniforms.uCameraPosition.value.copy(camera.position);
    }
  });

  // Renderiza as estrelas como um `primitive` do Three.js
  return starsLoaded && starsRef.current ? <primitive object={starsRef.current} /> : null;
};

export default OscillatingStars;
