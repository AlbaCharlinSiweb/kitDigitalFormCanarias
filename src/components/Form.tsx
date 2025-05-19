import React, { useState } from 'react';
import FormField from './FormField';
import { createContact, createContract } from '../services/api';
import { isValidSpanishId } from '../services/validatorCif';

interface FormData {
  nombre: string;
  cif: string;
  telefono: string;
  producto: string;
}

interface FormErrors {
  nombre?: string;
  cif?: string;
  telefono?: string;
  producto?: string;
}

interface FormProps {
  onComplete: () => void;
}

const initialFormData: FormData = {
  nombre: '',
  cif: '',
  telefono: '',
  producto: 'web_tienda',
};

const Form: React.FC<FormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [incluirOrdenador, setIncluirOrdenador] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    if (!formData.cif.trim()) {
      newErrors.cif = 'El CIF es obligatorio';
    } else if (!isValidSpanishId(formData.cif)) {
      newErrors.cif = 'El NIF o CIF no es válido';
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    } else if (!/^\d{9}$/.test(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe tener 9 dígitos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await createContract({
          tax_id: formData.cif.toUpperCase(),
          product: formData.producto === 'web_tienda' ? 'wp-pc-kd' : 'rrss-pc-kd'
        });

        await createContact({
          name: formData.nombre,
          cif: formData.cif,
          phone: parseInt(formData.telefono),
          option: formData.producto === 'web_tienda' ? 'wp-pc-kd' : 'rrss-pc-kd'
        });
        
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Ha ocurrido un error al enviar el formulario. Por favor, inténtelo de nuevo.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center animate-fadeIn">
        <div className="flex flex-col items-center justify-center py-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Sigue estos pasos:</h2>
          <div className="text-left space-y-4 mb-8">
            <p className="flex items-start">
              <span className="font-bold mr-2">1-</span>
              En los próximos minutos, recibirás un <span className="font-bold mx-1">SMS</span> en el número de teléfono que has proporcionado.
            </p>
            <p className="flex items-start">
              <span className="font-bold mr-2">2-</span>
              Abre el SMS y haz clic en el enlace que contiene.
            </p>
            <p className="flex items-start">
              <span className="font-bold mr-2">3-</span>
              Revisa la información en el contrato.
            </p>
            <p className="flex items-start">
              <span className="font-bold mr-2">4-</span>
              Firma el documento directamente en la pantalla del móvil.
            </p>
            <p className="flex items-start">
              <span className="font-bold mr-2">5-</span>
              Una vez firmado pulsa el botón finalizar.
            </p>
          </div>
          
          <button
            onClick={onComplete}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 animate-slideUp delay-200 mt-6"
          >
            Finalizar
          </button>
          <div className="text-center text-gray-700 max-w-lg mt-10">
            <p className="mb-4">
              Si tienes algún problema o no recibes el SMS, por favor, ponte en contacto con nosotros al{' '}
              <a href="tel:828670848" className="text-blue-500 hover:text-blue-700 font-bold">
                llama al 828 670 848
              </a>
              {' '}o envía un correo a{' '}
              <a href="mailto:info@siwebcanarias.es" className="text-blue-500 hover:text-blue-700">
                info@siwebcanarias.es
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center mb-8 animate-fadeIn">
      <h1 className="text-2xl font-bold mb-2 bg-green-200 p-2 rounded-lg">
          Solicitud concedida
        </h1>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Activar bono
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>
  
      {/* Caja de selección de servicios */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8 transform transition-all duration-500 hover:shadow-lg animate-slideUp border border-blue-100">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Seleccione los servicios deseados</h2>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3 p-3 rounded-lg bg-blue-200">
              <input
                type="checkbox"
                checked={incluirOrdenador}
                disabled
                className="form-checkbox h-5 w-5 text-green-500"
              />
              <div>
                <span className="font-medium text-gray-900">Ordenador portátil (incluido)</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="producto"
                value="web_tienda"
                checked={formData.producto === 'web_tienda'}
                onChange={handleInputChange}
                className="form-radio h-5 w-5 text-blue-500"
              />
              <div>
                <span className="font-medium text-gray-900">Web o tienda online</span>
              </div>
            </label>
  
            <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="producto"
                value="redes_sociales"
                checked={formData.producto === 'redes_sociales'}
                onChange={handleInputChange}
                className="form-radio h-5 w-5 text-blue-500"
              />
              <div>
                <span className="font-medium text-gray-900">Redes sociales</span>
              </div>
            </label>
  
          </div>
        </div>
      </div>
  
      {/* Caja de datos personales */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8 transform transition-all duration-500 hover:shadow-lg animate-slideUp border border-blue-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            label="Nombre"
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Introduzca su nombre"
            error={errors.nombre}
          />
          
          <FormField
            label="CIF"
            name="cif"
            type="text"
            value={formData.cif}
            onChange={handleInputChange}
            placeholder="Ej: B12345678"
            error={errors.cif}
          />
          
          <FormField
            label="Teléfono"
            name="telefono"
            type="tel"
            value={formData.telefono}
            onChange={handleInputChange}
            placeholder="Ej: 612345678"
            error={errors.telefono}
          />
        </div>
      </div>
      
      {/* Botón enviar */}
      <div className="text-center pt-8 animate-fadeIn delay-300">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 
            text-white font-bold py-4 px-12 rounded-full transition-all duration-300 
            transform hover:-translate-y-1 hover:shadow-xl
            before:absolute before:inset-0 before:bg-gradient-to-r 
            before:from-blue-500 before:to-blue-600 before:opacity-0 
            before:transition-opacity before:duration-300 hover:before:opacity-100
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <span className="relative">
            {isSubmitting ? 'Enviando...' : 'Continuar'}
          </span>
        </button>
      </div>
    </form>
  );  
};

export default Form;