'use client';
import React, { useState } from 'react';
import Quiz from '@/components/three/Quiz';
import Chat from '@/components/three/Chat';
import Image from 'next/image';

export default function SeeOnboarding() {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const handleChatIconClick = () => {
    setIsChatModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsChatModalOpen(false);
  };

  return (
    <section className="h-screen">
      <Quiz />
      <div className="fixed bottom-5 left-5 cursor-pointer" onClick={handleChatIconClick}>
        <Image src="/icons/chat.svg" alt="Chat Icon" width={50} height={50} />
      </div>
      {isChatModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
          <div className="bg-black p-5 rounded-md max-w-md w-full relative">
            <button className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded" onClick={handleCloseModal}>
              Sair
            </button>
            <div className="flex justify-center">
              <Chat />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}