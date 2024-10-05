import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes'; // Importe o arquivo de rotas

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
