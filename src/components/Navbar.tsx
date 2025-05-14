import React from 'react';
import { Phone } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0">
            <img src='https://i.postimg.cc/0NdffqXR/Logo-Kit-Digital.png' border='0' alt='Logo-Kit-Digital' className='h-10'/>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="tel:828670848" className="flex items-center text-gray-600 hover:text-gray-800">
              <Phone className="w-4 h-4 mr-1" />
              <span>TEL: 828 670 848</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;