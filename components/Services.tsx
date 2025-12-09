import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { SERVICES, LOTTIE_URLS } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-24 opacity-10 pointer-events-none">
             <Player
                autoplay
                loop
                src={LOTTIE_URLS.mechanic}
                style={{ height: '100px', width: '100px' }}
             />
          </div>
          
          <span className="text-power-red font-bold uppercase tracking-wider text-sm">Our Expertise</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-6">Complete Car Care</h2>
          <p className="text-gray-600 text-lg">
            From routine maintenance to complex diagnostics, our certified technicians use state-of-the-art equipment to keep your vehicle running perfectly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-power-blue/20 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-power-blue/5 rounded-lg flex items-center justify-center text-power-blue group-hover:bg-power-blue group-hover:text-white transition-colors duration-300 mb-6">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">Don't see what you need? We probably do it.</p>
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-power-blue bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-colors">
                Contact Us for Custom Requests
            </a>
        </div>
      </div>
    </section>
  );
};

export default Services;