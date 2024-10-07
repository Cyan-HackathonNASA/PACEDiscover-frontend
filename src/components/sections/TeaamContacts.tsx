/* eslint-disable react/no-unescaped-entities */
import { Github } from "../icons/Github";
import { Linkedin } from "../icons/Linkedin";

const TeamContacts = () => {
  const listTeamContacts = [
    {
      name: "Roberto Braga",
      github: "https://github.com/BetoBraga",
      linkedin: "https://www.linkedin.com/in/borerto/",
      image: "/team/roberto.jpeg",
    },
    {
      name: "Ricardo Gumiero",
      github: "https://github.com/RickGusG",
      linkedin: "https://www.linkedin.com/in/ricardogumiero",
      image: "/team/ricardo.jpeg",
    },
    {
      name: "Caio Chagas",
      github: "https://github.com/caiython",
      linkedin: "https://linkedin.com/in/caiocvl",
      image: "/team/caio.jpeg",
    },
    {
      name: "Leon Kennedy",
      github: "https://github.com/leonsk0",
      linkedin: "https://www.linkedin.com/in/leonskennedy/",
      image: "/team/leon.png",
    },
    {
      name: "Márcio Machado",
      github: "https://github.com/marcinhojazz",
      linkedin: "https://www.linkedin.com/in/marcio-pontes-2a2661137/",
      image: "/team/marcio.jpeg",
    },
    {
      name: "Gustavo Valentin",
      github: "https://github.com/GustavoValentim19",
      linkedin: "https://www.linkedin.com/in/gustavo-valentim-61086b212/",
      image: "/team/gustavo.jpeg",
    },
  ];

  return (
    <section id="team-contacts" className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black text-white py-12'>
      <div className='flex flex-col items-center gap-12 px-6 max-w-5xl'>
        {/* Título e Descrição */}
        <div className='text-center'>
          <h1 className='text-5xl font-bold mb-4 text-white'>Meet Our Team</h1>
          <p className='text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed'>
            This project uses data from NASA&apos;s PACE satellite to map the distribution of algae and plankton in the oceans. It aims to improve ocean literacy and provide resources for teachers and students worldwide. The PACE mission, launched in February 2024, offers detailed insights into marine ecosystems, such as the exchange of carbon dioxide between the atmosphere and the ocean and the growth of phytoplankton.
          </p>
        </div>

        {/* Grid de Contatos */}
        <div className='w-full'>
          <h3 className='text-3xl font-semibold text-center mb-6'>Our Team Members</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listTeamContacts.map((contact, index) => (
              <li key={index} className="flex justify-center">
                <div className="bg-gray-950 border border-gray-900 rounded-lg shadow-md p-6 w-72 text-center transition-transform transform hover:scale-105">
                  {/* Imagem do Membro */}
                  <div className="w-24 h-24 mx-auto rounded-full mb-4 overflow-hidden">
                    <img src={contact.image} alt={contact.name} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Nome do Membro */}
                  <h4 className="text-xl font-bold text-cyan-300 mb-2">{contact.name}</h4>

                  {/* Ícones de Links */}
                  <div className="flex justify-center gap-4 mt-4">
                    <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all duration-300">
                      <Github />
                    </a>
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all duration-300">
                      <Linkedin />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TeamContacts;