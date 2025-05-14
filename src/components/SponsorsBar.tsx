import React from 'react';

const SponsorsBar = () => {
  return (
    <div className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <img 
            src="https://siwebcanarias.es/build/img/kitdigital/kitdigital_logos_transparent.png" 
            alt="Kit Digital Sponsors" 
            className="h-24 object-contain w-full max-w-5xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SponsorsBar;