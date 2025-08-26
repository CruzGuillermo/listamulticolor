import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import BuscarLegajo from './BuscarLegajo';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #e3edf7 0%, #c7d2fe 100%)',
        padding: 0,
        margin: 0,
        overflowX: 'hidden'
      }}
    >
      <Navbar />
      <BuscarLegajo />
      <Footer />
    </div>
  );
}

export default App
