'use client';
import React from 'react';
import Quiz from '@/components/three/Quiz';
import Chat from '@/components/three/Chat';

export default function SeeOnboarding() {
  return (
    <section className="h-screen">
      <Quiz />
      <Chat />
    </section>
  );
}