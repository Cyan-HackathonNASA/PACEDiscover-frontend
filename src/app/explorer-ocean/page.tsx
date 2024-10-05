'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import SceneOcean from '@/components/three/SceneOcean';
import EarthScene from '@/components/three/EarthScene';

export default function ExplorerOcean() {
  return (
    <section className="h-screen">
      <EarthScene />
    </section>
  );
}
