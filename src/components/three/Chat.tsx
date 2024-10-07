/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import api from '@/app/api';
import Image from 'next/image';
import React, { useState } from 'react';
import uuid from 'react-uuid';

const ChatLayout = () => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const handleChatIconClick = () => {
    setIsChatModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsChatModalOpen(false);
  };
  
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{text: string, isResponse: boolean}[]>([]);
  
  const chatId = uuid()

  const postMessage = async () => {
    setText('')
    setMessages((state) => ([...state, {text: text, isResponse: false}]))
    setLoading(true);
    try {
      const {data} = await api.post('/chat/', { 
        chat_uuid: chatId,
        message: text
      })
      setMessages((state) => ([...state, {text: data.response, isResponse: true}]))
      setLoading(false)
    } catch {
      throw new Error('Error, try again.')
    }
  }
    

  return (
    <>
      <div className="fixed bottom-5 left-5 cursor-pointer" onClick={handleChatIconClick}>
        <Image src="/icons/chat.svg" alt="Chat Icon" width={50} height={50} />
      </div>
      {isChatModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
          <div className="bg-black p-5 rounded-md max-w-md w-full relative">
            <button className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded" onClick={handleCloseModal}>
              Exit
            </button>
            <div className="flex justify-center">
              <div style={containerStyle}>
                <div style={headerStyle}>
                  <h2>Hello human!</h2>
                  <h3>I can help you better understand PACE-OCI.</h3>
                </div>
                <div style={chatBoxContainerStyle}>
                  {messages.map((message, index) => (
                    <div key={index} style={message.isResponse ? chatBoxChatStyle : chatBoxPersonStyle}>
                      <p>{message.text}</p>
                    </div>
                  ))}
                </div>
                <div style={inputContainerStyle}>
                  <input onKeyDown={(e) => e.key === 'Enter' && text.trim() !== '' && postMessage()} disabled={loading} type="text" placeholder="Ask to PACE I.A..." style={inputStyle} value={text} onChange={(e) => setText(e.target.value.trim())} />
                  <button onClick={postMessage} style={buttonStyle}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const containerStyle: any = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'transparent',
  color: 'white',
  height: '100vh',
  width: '100vw',
  justifyContent: 'space-between',
  padding: '20px'
};

const headerStyle: any = {
  textAlign: 'center'
};

const chatBoxContainerStyle: any = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  flex: 1,
  width: '100%'
};

const chatBoxChatStyle: any = {
  backgroundColor: '#222',
  borderRadius: '10px',
  padding: '20px',
  width: '80%',
  maxWidth: '600px',
  textAlign: 'left'
};

const chatBoxPersonStyle: any = {
  backgroundColor: '#555',
  borderRadius: '10px',
  padding: '20px',
  width: '80%',
  maxWidth: '600px',
  textAlign: 'left'
};

const inputContainerStyle = {
  display: 'flex',
  width: '80%',
  maxWidth: '600px',
  gap: '10px'
};

const buttonStyle = {
  borderRadius: '4px',
  border: '2px solid white',
  backgroundColor: 'transparent',
  color: 'white',
  cursor: 'pointer',
  padding: '8px 16px'
};

const inputStyle = {
  flex: 1,
  borderRadius: '60px',
  border: '2px solid white',
  padding: '8px 16px',
  backgroundColor: 'transparent',
  color: 'white'
};

// Estilo para o placeholder
const placeholderStyle = `
  input::placeholder {
    color: white;
  }
`;

// Adicionando o estilo do placeholder ao documento
const styleElement = document.createElement('style');
styleElement.innerHTML = placeholderStyle;
document.head.appendChild(styleElement);

export default ChatLayout;