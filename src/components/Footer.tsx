import React from 'react';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
            <p className="text-gray-400 mb-8 max-w-md">
              Ready to give your car the service it deserves? Call us or visit our workshop in Dubai.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gray-800 p-3 rounded-full text-power-red">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Call Us</p>
                  <a href="tel:+971501234567" className="text-lg font-semibold hover:text-power-red transition-colors">+971 50 123 4567</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-800 p-3 rounded-full text-power-red">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Email Us</p>
                  <a href="mailto:info@powerworksgarage.ae" className="text-lg font-semibold hover:text-power-red transition-colors">info@powerworksgarage.ae</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-800 p-3 rounded-full text-power-red">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Opening Hours</p>
                  <p className="text-gray-300">Mon - Sat: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-500 text-sm">Sunday: Closed</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-800 p-3 rounded-full text-power-red">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Location</p>
                  <p className="text-gray-300">Al Quoz Industrial Area 3,<br/>Dubai, United Arab Emirates</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-power-red transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-power-blue transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Map & Form */}
          <div className="bg-white rounded-2xl p-2 overflow-hidden">
            {/* Placeholder Map - In production, replace with Google Maps Embed */}
            <div className="w-full h-full min-h-[400px] bg-gray-200 rounded-xl relative">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.8687702868843!2d55.2274!3d25.1065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f696655555555%3A0x5555555555555555!2sAl%20Quoz!5e0!3m2!1sen!2sae!4v1620000000000!5m2!1sen!2sae" 
                    width="100%" 
                    height="100%" 
                    style={{border:0, borderRadius: '0.75rem'}} 
                    allowFullScreen={true} 
                    loading="lazy"
                    title="Garage Location"
                ></iframe>
                
                {/* Visual Only Form Overlay for Aesthetic */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur shadow-xl p-6 rounded-xl border border-gray-100 hidden md:block">
                   <h4 className="font-bold text-gray-900 mb-2">Quick Enquiry</h4>
                   <div className="flex gap-2">
                      <input type="text" placeholder="Your Phone Number" className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-power-blue" />
                      <button className="bg-power-red text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700">Send</button>
                   </div>
                </div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Powerworks Garage Dubai. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;