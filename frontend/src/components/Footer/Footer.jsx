import React from 'react';
import './Footer.css';

function Footer()
{
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          {/* <span className="text-lg font-bold">TrackIt</span> */}
          <button className="text-3xl font-bold text-gray-800 transition-colors duration-300 bg-transparent border-none hover:border-none hover:text-blue-500 focus:outline-none">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">TrackIt</span>
          </button>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-blue-500 transition-colors text-slate-100 duration-300">Home</a>
          <a href="#features" className="hover:text-blue-500 transition-colors text-slate-100 duration-300">Features</a>
          <a href="#pricing" className="hover:text-blue-500 transition-colors text-slate-100 duration-300">Pricing</a>
          <a href="#contact" className="hover:text-blue-500 transition-colors text-slate-100 duration-300">Contact</a>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm text-slate-100">&copy; 2024 TrackIt. All rights reserved.</p>
        </div>
      </div>
    </footer>

    // <footer className="footer">
    //   <p>© 2024 TrackIt. All rights reserved.</p>
    // </footer>
  );
}

export default Footer;

