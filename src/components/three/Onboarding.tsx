import React, { useState, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import OscillatingStars from './OscillatingStars';

const Onboarding = () => {
  // Texturas de exemplo (textura original)
  const dayTexture = useLoader(
    THREE.TextureLoader,
    '/earth_spec.png'
  );

  const clorofilaTexture = useLoader(
    THREE.TextureLoader,
    '/clorofila-setembro.png'
  );

  const planctonTexture = useLoader(
    THREE.TextureLoader,
    '/plancton-setembro.png'
  );

  const carbonoTexture = useLoader(
    THREE.TextureLoader,
    '/carbono-setembro.png'
  );

  // Estado para armazenar a textura dinâmica, começando com a textura original
  const [selectedTexture, setSelectedTexture] = useState(dayTexture);
  const [selectedTextureOpacity, setSelectedTextureOpacity] = useState(1.0); // Estado para controlar a opacidade

  // Textura de fundo para o espaço
  const spaceTexture = useLoader(
    THREE.TextureLoader,
    '/hdri_test.jpg'
  );
  spaceTexture.wrapS = THREE.RepeatWrapping;
  spaceTexture.wrapT = THREE.RepeatWrapping;
  spaceTexture.repeat.set(4, 4); // Define a quantidade de repetição horizontal e vertical

  // Estado do carrossel
  const carouselItems = [
    {
      title: "Introduction to ocean mapping",
      content: "NASA satellites capture light reflected by the oceans to measure chlorophyll concentration and estimate phytoplankton biomass.",
      description: "Phytoplankton are microscopic organisms that perform photosynthesis and form the base of the marine food chain. They are responsible for approximately half of the planet's oxygen production.",
    },
    {
      title: "How does the PACE mapping work?",
      content: "The satellite PACE-OCI (Plankton, Aerosol, Cloud, ocean Ecosystem - Ocean Color Instrument) use sensors to detect different wavelengths of light reflected by the oceans, allowing the measurement of chlorophyll concentration and phytoplankton biomass.",
      description: "PACE-OCI is an advanced satellite that combines and expands the capabilities of previous satellites, such as CZCS, SeaWiFS, MODIS, and VIIRS. These previous satellites collected information on pigments, suspended particles, and atmospheric properties. PACE-OCI improves resolution and detection capability, allowing the measurement of various parameters, such as aerosols, phytoplankton community composition, and coastal biology.",
    },
    {
      title: "How chlorophyll and phytoplankton carbon mapping is done?",
      content: "Chlorophyll primarily absorbs light in the blue and red ranges of the spectrum while reflecting green light, which allows satellites to estimate its concentration.",
      description: "Just like chlorophyll, the carbon in phytoplankton also provides insight into productivity and biomass present in different ocean regions. The areas in purple indicate low carbon concentrations, while the areas in brighter colors, such as blue, show higher concentrations.",
    },
    {
      title: "How chlorophyll and phytoplankton carbon mapping is done?",
      content: "Phytoplankton carbon is estimated based on phytoplankton density, using algorithms that relate chlorophyll concentration to biomass. PACE-OCI can detect variations in light absorption caused by the carbon present in phytoplankton, allowing the estimation of the amount of carbon in the biomass. Additionally, the satellite detects differences in light absorption patterns, enabling the identification of different types of phytoplankton and their physiological conditions.",
    },
    {
      title: "Color scale for chlorophyll and carbon",
      content: "The color scale represents phytoplankton density, with blue indicating low concentrations and red indicating high concentrations.",
      description: "Chlorophyll concentration is directly related to the amount of phytoplankton present in a given region. Areas in warm colors (red/yellow) indicate high productivity, while blue areas represent low productivity.",
    },
    {
      title: "Analysis of organic carbon emission",
      content: "Cooler colors (blue and purple) indicate low concentrations, while warm colors (yellow and red) indicate high concentrations of organic carbon. High organic carbon concentration is generally associated with intense biological activity and the influx of organic matter from the continents.",
      description: "Organic carbon is composed of all suspended organic matter, including plant debris, dead organisms, and other compounds.",
    },
    {
      title: "Similarities between chlorophyll, phytoplankton carbon, and organic carbon",
      content: "Chlorophyll measures the photosynthetic capacity of phytoplankton, while phytoplankton carbon reflects the total biomass. Organic carbon measures the amount of organic matter present, which may include not only phytoplankton but also other suspended organic compounds.",
      description: "Upwelling regions, where there is a greater nutrient supply, have high concentrations of chlorophyll, phytoplankton carbon, and organic carbon. These regions are characterized by intense biological activity, leading to an accumulation of biomass and organic matter.",
    },
    {
      title: "Differences between april and september 2024",
      content: "Seasonal variations affect nutrient availability and temperature, resulting in changes in phytoplankton concentration.",
      description: "Tropical regions generally have less seasonal variation, while temperate areas may show more marked biomass fluctuations.",
    },
    {
      title: "Conclusion",
      content: "Phytoplankton are fundamental to the marine food chain and for absorbing carbon dioxide from the atmosphere.",
      description: "Continuous monitoring allows for identifying changes in ocean productivity, helping to predict ecological impacts and climate changes. Chlorophyll, phytoplankton carbon, and organic carbon are complementary indicators of the health and productivity of marine ecosystems.",
    },
  ];

  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleNext = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const handlePrevious = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  // Alternar textura entre clorofila e plancton
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (carouselIndex === 2 || carouselIndex === 3 || carouselIndex === 4 || carouselIndex === 7) {
      setSelectedTexture(clorofilaTexture);
      interval = setInterval(() => {
        setSelectedTexture((prevTexture) =>
          prevTexture === clorofilaTexture ? planctonTexture : clorofilaTexture
        );
      }, 2000);
    } else if (carouselIndex === 5) {
      setSelectedTexture(carbonoTexture);
    } else {
      setSelectedTexture(dayTexture);
    }
    return () => clearInterval(interval);
  }, [carouselIndex, clorofilaTexture, planctonTexture, carbonoTexture, dayTexture]);

  const getImageForCarouselIndex = (index) => {
    if (index === 2 || index === 3 || index === 4 || index === 7) {
      return '/caption-clorofila.png';
    } else if (index === 5) {
      return '/caption-carbon.png';
    } else {
      return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '-webkit-fill-available', width: '-webkit-fill-available' }}>
      {/* Carrossel de informações */}
      <div style={{ flex: 1, display:  'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: '80%' }}>
        <div className="carousel-container" style={carouselContainerStyle}>
          <div className="carousel-content">
            <p style={{ ...titleText, marginBottom: '1vh', fontSize: '32px'}}>Satellite: PACE-OCI</p>
            <h2 style={{ marginBottom: '1vh', color: 'white', fontSize: '22px', fontWeight: 700 }}>{carouselItems[carouselIndex].title}</h2>
            <p style={{ color: 'white', fontSize: '16px' }}>{carouselItems[carouselIndex].content}</p>
            <p style={{ marginTop: '1vh', color: 'white', fontSize: '16px' }}>{carouselItems[carouselIndex].description}</p>
            <div className="carousel-controls" style={containerButtonStyle}>
              <button onClick={handlePrevious} style={carouselButtonStyle}>Previous</button>
              <button onClick={handleNext} style={carouselButtonStyle}>Next</button>
            </div>
            {getImageForCarouselIndex(carouselIndex) && (
              <img
                src={getImageForCarouselIndex(carouselIndex)}
                alt="Chlorophyll or Carbon concentration"
                style={{ marginTop: '16px', width: '100%' }}
              />
            )}
          </div>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
          {/* Controles de órbita */}
          <OrbitControls
            enableZoom={false}
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

// Estilos do carrossel
const carouselContainerStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  zIndex: 10,
  background: 'rgba(0, 0, 0, 0.5)',
  padding: '20px',
  borderRadius: '10px',
};

const containerButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '16px'
}

const carouselButtonStyle = {
  padding: '10px 40px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  color: 'white',
  border: '2px solid white',
  borderRadius: '4px',
};

export default Onboarding;