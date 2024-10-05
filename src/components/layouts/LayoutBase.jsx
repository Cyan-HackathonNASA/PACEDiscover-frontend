// src/components/LayoutBase.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const LayoutBase = () => {
  return (
    <div className="layout-base bg-black">
      {/* Cabeçalho */}
      <Header />
      
      {/* Outlet renderiza as rotas internas */}
      <main className='min-h-screen w-full border'>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutBase;
