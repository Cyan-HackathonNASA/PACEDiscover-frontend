'use client';
import React from 'react';
import Hero from '../components/Hero';
import About from '@/components/sections/About';
import TeamContacts from '@/components/sections/TeaamContacts';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TeamContacts />
    </>
  );
}
