import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import { BLOG_POSTS, IMAGES, LOTTIE_URLS } from '../constants';

const AskGlenn: React.FC = () => {
  return (
    <section 
      id="ask-glenn" 
      className="py-20 relative bg-white"
      style={{
        backgroundImage: `linear-gradient(45deg, #f3f4f6 2px, transparent 2px), linear-gradient(-45deg, #f3f4f6 2px, transparent 2px)`,
        backgroundSize: '24px 24px'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header - Redesigned with avatar on left */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16">
          {/* Large Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white">
              <img
                src="/its-glenn.jpg"
                alt="Glenn Power - Owner of Powerworks Garage"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Lottie Animation */}
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-16 h-16 md:w-20 md:h-20 z-20 pointer-events-none">
               <Player
                  autoplay
                  loop
                  src={LOTTIE_URLS.chat}
                  style={{ height: '100%', width: '100%' }}
               />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-3 -left-3 w-full h-full bg-power-blue/10 rounded-2xl -z-10"></div>
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <span className="text-power-blue font-bold uppercase tracking-wider text-sm mb-3 block">The Knowledge Hub</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">Ask Glenn</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed mb-6">
              Driving in the UAE presents unique challenges. Here are my top tips and honest advice for keeping your car running perfectly in the desert heat.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
              <span className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                15+ Years Experience
              </span>
              <span className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-600">
                <span className="w-2 h-2 bg-power-blue rounded-full"></span>
                UK Certified
              </span>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <article 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute top-4 left-4 bg-power-blue/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  {post.category}
                </div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs text-gray-400 mb-3 font-medium">{post.date}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-power-red transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                
                <a 
                  href="#contact" 
                  className="inline-flex items-center text-power-blue font-bold text-sm hover:text-power-red transition-colors mt-auto"
                >
                  Read Article <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Improved CTA */}
        <div className="mt-20 relative rounded-2xl overflow-hidden shadow-2xl">
            {/* Background with Gradient and accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-power-blue to-gray-900"></div>
            
            {/* Decorative Circle */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-power-red/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                
                <div className="max-w-2xl">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                        Still unsure about that engine noise?
                    </h3>
                    <p className="text-blue-100 text-lg leading-relaxed">
                        Skip the forums and get a straight answer. Send me a voice note or photo on WhatsApp, and I'll personally take a look.
                    </p>
                </div>

                <div className="flex-shrink-0">
                    <a
                        href="https://wa.me/971521217425"
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center justify-center bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#20bd5a] transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-green-900/30"
                    >
                        <MessageCircle className="mr-2 h-6 w-6 group-hover:animate-bounce" /> 
                        WhatsApp Glenn
                    </a>
                    <p className="text-white/40 text-xs mt-3 text-center">Typically replies in 1 hour</p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default AskGlenn;