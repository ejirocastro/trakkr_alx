import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Routers from './Routes/Routers';

function App()
{
  return (
    <div className="App">
      <Navbar />
        <Routers />
      <Footer />
    </div>
  );
}

export default App;

