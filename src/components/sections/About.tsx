import SceneOcean from './three/SceneOcean';

// Código do componente Hero
const About = () => {
  return (
    <section id='about' className='min-h-screen flex flex-col items-center justify-center'>
      <div className='flex flex-col gap-12 text-white'>
        <div>
          <h1 className='text-4xl font-semibold'>About The Project</h1>
          <p className='mt-6'>
            This project uses data from NASA's PACE satellite to map the distribution of algae and plankton in the oceans. Based on the collected data, the project aims to improve ocean literacy and provide resources for teachers and students worldwide. The PACE mission, launched in February 2024, offers detailed insights into marine ecosystems, such as the exchange of carbon dioxide between the atmosphere and the ocean and the growth of phytoplankton. Through the visualization of this data and the application of artificial intelligence, the project predicts where concentrations of plankton and algae will increase, helping to broaden understanding of the ocean in the classroom.
          </p>
        </div>
        <div>
          <h3>See more</h3>
          <div className='flex justify-between gap-2'>
            <a className="underline" href="#">NASA Space Apps Challenge</a>
            <a className="underline" href="#">Ocean Color</a>
            <a className="underline" href="#">Community of Practice</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
