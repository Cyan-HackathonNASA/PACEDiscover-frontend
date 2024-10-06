// Código do componente Hero
const Explore = () => {
  return (
    <section id='explore' className='min-h-screen flex flex-col items-center justify-center'>
      <div className='flex flex-col gap-12 text-white'>
        <div>
          <h1 className='text-4xl font-semibold'>Explore the Ocean</h1>
          <p className='mt-6'>
          In this section, users will be able to navigate the Earth in an interactive 3D environment. By using filters, they can view specific data on algae and plankton in more detail. Additional information about each filter will be available to help with understanding.
          </p>
        </div>
        <div>
        <div className='flex gap-2'>
          <a className='text-white border border-white bg-transparent hover:bg-white hover:text-black font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 ease-in-out' href="/explorer-ocean">Explore the interactive 3D ocean</a>
          <a className='text-white border border-white bg-transparent hover:bg-white hover:text-black font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 ease-in-out' href="/see-onboarding">Learn about PACE-OCI</a>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
