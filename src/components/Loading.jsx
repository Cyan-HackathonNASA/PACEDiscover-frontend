import React from 'react';

const Loading = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading...</p>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#000000',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '8px solid rgba(255, 255, 255, 0.1)',
    borderTop: '8px solid #00B1FF',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  text: {
    color: '#ffffff',
    fontSize: '20px',
    marginTop: '20px',
    letterSpacing: '1.5px',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
};

// Definir animações globalmente usando a tag <style>
const styleElement = document.createElement('style');
styleElement.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;
document.head.appendChild(styleElement);

export default Loading;
