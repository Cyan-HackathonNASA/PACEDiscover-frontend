import React from 'react';

const ChatLayout = () => {
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2>Hello human!</h2>
        <h3>I can help you better understand PACE-OCI.</h3>
      </div>
      <div style={chatBoxContainerStyle}>
        <div style={chatBoxChatStyle}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et semper justo, a luctus est. Nam feugiat euismod risus. Nullam ut quam sit amet dui molestie pretium.</p>
        </div>
        <div style={chatBoxPersonStyle}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et semper justo, a luctus est. Nam feugiat euismod risus. Nullam ut quam sit amet dui molestie pretium.</p>
        </div>
      </div>
      <div style={inputContainerStyle}>
        <input type="text" placeholder="Ask to PACE I.A..." style={inputStyle} />
        <button style={buttonStyle}>Enviar</button>
      </div>
    </div>
  );
};

const containerStyle = {
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

const headerStyle = {
  textAlign: 'center'
};

const chatBoxContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  flex: 1,
  width: '100%'
};

const chatBoxChatStyle = {
  backgroundColor: '#222',
  borderRadius: '10px',
  padding: '20px',
  width: '80%',
  maxWidth: '600px',
  textAlign: 'left'
};

const chatBoxPersonStyle = {
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