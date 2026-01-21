import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Brands from '@/components/Brands';
import WhyChoose from '@/components/WhyChoose';
import AboutOwner from '@/components/AboutOwner';
import Services from '@/components/Services';
import Fleet from '@/components/Fleet';
import AskGlenn from '@/components/AskGlenn';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Brands />
        <WhyChoose />
        <AboutOwner />

        {/* Section Separator */}
        <div className="relative py-8 bg-white">
          <div className="max-w-4xl mx-auto px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent shadow-sm"></div>
          </div>
        </div>

        <Services />
        <Fleet />
        <AskGlenn />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
