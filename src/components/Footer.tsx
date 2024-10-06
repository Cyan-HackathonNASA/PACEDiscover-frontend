import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white">
      {/* Container para o rodapé */}
      {/* <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0"> */}
        {/* Primeira Coluna - Sobre a Empresa */}
        {/* <div className="md:w-1/2 flex flex-col md:items-end">
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-2">
            <li><a href="/" className="hover:text-cyan-400 transition duration-300">Home</a></li>
            <li><a href="/explorer-ocean" className="hover:text-cyan-400 transition duration-300">Explore the Ocean</a></li>
            <li><a href="/about" className="hover:text-cyan-400 transition duration-300">About the Project</a></li>
            <li><a href="/contact" className="hover:text-cyan-400 transition duration-300">Team Contacts</a></li>
          </ul>
        </div>
      </div> */}

      {/* Rodapé Inferior */}
      <div className="bg-gray-800 mt-10 py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Cyan Team. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
