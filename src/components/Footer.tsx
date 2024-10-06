import React from 'react';
import { Github } from './icons/Github';

const Footer = () => {
  return (
    <footer className="w-full bg-cyan-500 text-white py-4">
      <div className='flex justify-between px-20'>
        <p className="text-sm">
          © {new Date().getFullYear()} Cyan Team. All Rights Reserved.
        </p>
        <div className='flex justify-center items-center gap-2'>
          <span>Project:</span>
          <a href="#">
            <Github />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
