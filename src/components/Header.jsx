import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 shadow-lg py-5 px-6 animate-slide-in-down">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FaHeart className="text-3xl text-white animate-bounce-slow" />
          <h1 className="text-3xl font-romantic text-white">
            Chat del Amor
          </h1>
        </div>
        <div>
          <span className="text-sm md:text-base text-pink-100 font-medium">
            Desarrollado con ❤️ para UNICATÓLICA 2025
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
