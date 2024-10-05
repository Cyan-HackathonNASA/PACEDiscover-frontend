import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-10">
      {/* Container para o rodapé */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0">
        
        {/* Primeira Coluna - Sobre a Empresa */}
        <div className="md:w-1/2">
          <h4 className="text-xl font-semibold mb-4">About Our Project</h4>
          <p className="text-gray-400 leading-relaxed">
            This project aims to enhance ocean literacy by using data from NASA's PACE satellite to map the distribution of algae and plankton in the oceans. It provides resources for teachers and students to better understand the marine ecosystem and promote environmental awareness.
          </p>
        </div>

        {/* Segunda Coluna - Links de Navegação */}
        <div className="md:w-1/2 flex flex-col md:items-end">
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-2">
            <li><a href="/" className="hover:text-cyan-400 transition duration-300">Home</a></li>
            <li><a href="/explorer-ocean" className="hover:text-cyan-400 transition duration-300">Explore the Ocean</a></li>
            <li><a href="/about" className="hover:text-cyan-400 transition duration-300">About the Project</a></li>
            <li><a href="/contact" className="hover:text-cyan-400 transition duration-300">Team Contacts</a></li>
          </ul>
        </div>
      </div>

      {/* Rodapé Inferior */}
      <div className="bg-gray-800 mt-10 py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Ocean Literacy Project. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
