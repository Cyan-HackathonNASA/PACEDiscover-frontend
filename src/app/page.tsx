'use client';
import React from 'react';
import Hero from '../components/Hero';
import About from '@/components/sections/About';
import TeamContacts from '@/components/sections/TeaamContacts';
import Explore from '@/components/sections/Explore';

export default function Home() {
  return (
    <>
      <Hero />
      <Explore />
      <About />
      <TeamContacts />
    </>
  );
}
