import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ExplorerOcean from '../pages/ExplorerOcean';
import LayoutBase from '../components/layouts/LayoutBase';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutBase />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="explorer-ocean" element={<ExplorerOcean />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
