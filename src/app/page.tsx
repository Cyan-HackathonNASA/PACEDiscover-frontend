'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Hero from '../components/Hero';
import Island from '../components/three/models/Island';
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
