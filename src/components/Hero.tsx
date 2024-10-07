import SceneOcean from './three/SceneOcean';

// Código do componente Hero
const Hero = () => {
  return (
    <div className='relative w-full h-screen'>
      {/* Canvas para o fundo do oceano */}
      <SceneOcean />

      {/* Container centralizado com texto e botão */}
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center'>
        <h1 style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', padding : '10px', borderRadius: '10px'}} className='text-white text-5xl font-bold mb-4'>Discover The Ocean</h1>
        <a href='#explore'>
          <button className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 ease-in-out'>
            Learn from this Experience
          </button>
        </a>
      </div>
    </div>
  );
};

export default Hero;
