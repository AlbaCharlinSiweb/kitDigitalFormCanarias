import React from 'react';
import { CheckCircle } from 'lucide-react';

const Completion = () => {
  return (
    <div className="max-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-blue-50 via-white to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25"></div>
                <CheckCircle className="relative text-green-500 w-20 h-20" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ¡Proceso completado con éxito!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Gracias por confiar en nosotros. En breve un agente se pondrá en contacto contigo para confirmar la dirección de envío de su ordenador.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Completion;