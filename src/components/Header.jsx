import React, { useState } from 'react';

const Header = () => {
  // Estado para controlar a visibilidade do menu
  const [menuOpen, setMenuOpen] = useState(false);

  const listLinks = [
    { label: 'Home', url: '/' },
    { label: 'Explore the ocean', url: '/explorer-ocean' },
    { label: 'About the project', url: '/about' },
    { label: 'Team Contacts', url: '/contact' },
  ];

  // Alternar a visibilidade do menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className='shadow-lg flex flex-1 w-full justify-between fixed top-0 z-50 p-6 bg-gray/30 backdrop-blur-md'>
      <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path fill="white" d="M14 23.2v-2q2.925 0 4.963-2.037T21 14.2h2q0 1.875-.712 3.513t-1.925 2.85t-2.85 1.925T14 23.2m0-4v-2q1.25 0 2.125-.875T17 14.2h2q0 2.075-1.463 3.538T14 19.2m-8.45 3.375q-.375 0-.75-.15T4.125 22l-3.55-3.55q-.275-.3-.425-.675t-.15-.75q0-.4.15-.763t.425-.637L3.75 12.45q.575-.575 1.425-.587t1.425.562l1.25 1.25l.7-.7l-1.25-1.25q-.575-.575-.575-1.4t.575-1.4L8.725 7.5q.575-.575 1.413-.575t1.412.575l1.25 1.25l.7-.7l-1.25-1.25q-.575-.575-.575-1.412t.575-1.413L15.425.8q.3-.3.675-.45t.75-.15t.738.15t.662.45l3.55 3.55q.3.275.438.638t.137.762q0 .375-.137.75t-.438.675l-3.175 3.175q-.575.575-1.412.575T15.8 10.35L14.55 9.1l-.7.7l1.25 1.25q.575.575.563 1.413t-.588 1.412l-1.4 1.4q-.575.575-1.412.575t-1.413-.575l-1.25-1.25l-.7.7l1.25 1.25q.575.575.563 1.425t-.588 1.425L6.95 22q-.275.275-.638.425t-.762.15m0-1.975l1.05-1.05L3.05 16L2 17.05zm2.125-2.125l1.05-1.05l-3.55-3.55l-1.05 1.05zm9.55-9.55l1.05-1.05l-3.55-3.55l-1.05 1.05zM19.35 6.8l1.05-1.05l-3.55-3.55l-1.05 1.05z"/>
        </svg>
      </a>

      <nav>
        {/* Links para telas maiores */}
        <ul className='gap-10 hidden lg:flex'>
          {listLinks.map(link => (
            <li key={link.label}>
              <a href={link.url} className='text-lg font-light text-white hover:text-sky-500'>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botão para abrir/fechar o menu em telas menores */}
        <button
          onClick={toggleMenu}
          className='lg:hidden text-white bg-sky-500 hover:bg-sky-600 rounded-lg p-2'>
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        {/* Menu Dropdown para telas menores */}
        <ul
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } flex-col gap-4 p-4 bg-gray-800 rounded-md fixed top-16 right-6 lg:hidden`}>
          {listLinks.map(link => (
            <li key={link.label}>
              <a href={link.url} className='text-lg font-light text-white hover:text-sky-500'>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className='hidden lg:flex'></div>
    </header>
  );
};

export default Header;
