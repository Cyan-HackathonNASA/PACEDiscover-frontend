/* eslint-disable react/no-unescaped-entities */
const About = () => {
  return (
    <section id='about' className='min-h-screen flex flex-col items-center justify-center'>
      <div className='flex flex-col gap-12 text-white'>
        <div>
          <h1 className='text-4xl font-semibold'>About The Project</h1>
          <p className='mt-6'>
            This project uses data from NASA&apos;s PACE satellite to map the distribution of algae and plankton in the oceans. Based on the collected data, the project aims to improve ocean literacy and provide resources for teachers and students worldwide. The PACE mission, launched in February 2024, offers detailed insights into marine ecosystems, such as the exchange of carbon dioxide between the atmosphere and the ocean and the growth of phytoplankton. Through the visualization of this data and the application of artificial intelligence, the project predicts where concentrations of plankton and algae will increase, helping to broaden understanding of the ocean in the classroom.
          </p>
        </div>
        <div>
          <h3>See more</h3>
          <div className='flex justify-between gap-2'>
            <a className="underline" href="https://www.spaceappschallenge.org/">NASA Space Apps Challenge</a>
            <a className="underline" href="https://oceancolor.gsfc.nasa.gov/l3/">Ocean Color</a>
            <a className="underline" href="https://pace.oceansciences.org/learn_documents.htm">Documents</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
