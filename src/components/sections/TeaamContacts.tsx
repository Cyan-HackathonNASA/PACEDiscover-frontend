import { Github } from "../icons/Github";
import { Linkedin } from "../icons/Linkedin";

const TeamContacts = () => {
  const listTeamContacts = [
    {
      name: "Roberto Braga",
      github: "https://github.com/BetoBraga",
      linkedin: "https://www.linkedin.com/in/borerto/",
    },
    {
      name: "Ricardo Gumiero",
      github: "https://github.com/RickGusG",
      linkedin: "https://www.linkedin.com/in/ricardogumiero"
    },
    {
      name: "Caio Chagas",
      github: "https://github.com/caiython",
      linkedin: "https://linkedin.com/in/caiocvl",
    },
    {
      name: "Leon Kennedy",
      github: "#",
      linkedin: "#",
    },
    {
      name: "Márcio Machado",
      github: "#",
      linkedin: "#",
    },
    {
      name: "Gustavo Valentin",
      github: "https://github.com/GustavoValentim19",
      linkedin: "https://www.linkedin.com/in/gustavo-valentim-61086b212/",
    },
  ];

  return (
    <section id="team-contacts" className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white py-12'>
      <div className='flex flex-col items-center gap-12 px-6 max-w-5xl'>
        {/* Título e Descrição */}
        <div className='text-center'>
          <h1 className='text-5xl font-bold mb-4 text-cyan-400'>Meet Our Team</h1>
          <p className='text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed'>
            This project uses data from NASA's PACE satellite to map the distribution of algae and plankton in the oceans. It aims to improve ocean literacy and provide resources for teachers and students worldwide. The PACE mission, launched in February 2024, offers detailed insights into marine ecosystems, such as the exchange of carbon dioxide between the atmosphere and the ocean and the growth of phytoplankton.
          </p>
        </div>

        {/* Grid de Contatos */}
        <div className='w-full'>
          <h3 className='text-3xl font-semibold text-center mb-6'>Our Team Members</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listTeamContacts.map((contact, index) => (
              <li key={index} className="flex justify-center">
                <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6 w-72 text-center transition-transform transform hover:scale-105">
                  {/* Placeholder para Imagem */}
                  <div className="bg-gray-600 w-24 h-24 mx-auto rounded-full mb-4"></div>
                  
                  {/* Nome do Membro */}
                  <h4 className="text-xl font-bold text-cyan-300 mb-2">{contact.name}</h4>

                  {/* Ícones de Links */}
                  <div className="flex justify-center gap-4 mt-4">
                    <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all duration-300">
                      <Github width="24" height="24" />
                    </a>
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all duration-300">
                      <Linkedin width="24" height="24" />
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