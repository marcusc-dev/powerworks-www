import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AskGlenn from '@/components/AskGlenn';
import { MessageCircle, Phone, HelpCircle, Lightbulb, Wrench, ThermometerSun } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ask Glenn | Expert Car Advice Dubai | Powerworks Garage',
  description: 'Get honest, no-nonsense car advice from Glenn Power. 25+ years experience, zero upselling. Ask about car problems, maintenance, or get a second opinion.',
};

export default function AskGlennPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#25D366] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-power-red rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">Expert Advice</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mt-2 mb-6">
              Ask Glenn
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Got a car question? Get honest, expert advice from someone who genuinely cares about your vehicle—and your wallet.
            </p>
            <a
              href="https://wa.me/971521217425"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-6 h-6" />
              Message Glenn on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* What You Can Ask Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">How Can I Help?</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              What You Can Ask Glenn
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-power-blue/10 rounded-xl flex items-center justify-center mb-6">
                <HelpCircle className="w-7 h-7 text-power-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Second Opinions</h3>
              <p className="text-gray-600">
                Got a quote from another garage that seems too high? Send it over—I&apos;ll give you an honest assessment.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-power-red/10 rounded-xl flex items-center justify-center mb-6">
                <Wrench className="w-7 h-7 text-power-red" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Diagnose a Problem</h3>
              <p className="text-gray-600">
                Strange noise? Warning light? Describe the symptoms and I&apos;ll help identify what might be wrong.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Maintenance Advice</h3>
              <p className="text-gray-600">
                Not sure what service your car needs? I&apos;ll help you understand what&apos;s essential and what can wait.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <ThermometerSun className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dubai Climate Tips</h3>
              <p className="text-gray-600">
                The UAE heat is brutal on cars. Learn how to protect your battery, AC, and other components.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pre-Purchase Checks</h3>
              <p className="text-gray-600">
                Thinking of buying a used car? Ask what to look out for or book a professional inspection.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Phone className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Questions</h3>
              <p className="text-gray-600">
                No question is too small. If it&apos;s about your car, I&apos;m happy to help—no strings attached.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AskGlenn Component (blog posts section) */}
      <AskGlenn />

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-power-red font-bold uppercase tracking-wider text-sm">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Frequently Asked
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'Is the advice really free?',
                a: 'Yes, 100%. I believe in helping people make informed decisions about their cars. If you end up booking with us, great. If not, no hard feelings.'
              },
              {
                q: 'How quickly will Glenn respond?',
                a: 'Usually within a few minutes during business hours (8am-6pm). Outside of hours, I\'ll get back to you first thing next day.'
              },
              {
                q: 'Can you diagnose problems via WhatsApp?',
                a: 'I can often point you in the right direction based on symptoms. For a definitive diagnosis, you\'d need to bring the car in, but I can tell you if it\'s worth investigating.'
              },
              {
                q: 'Do you only help with European cars?',
                a: 'No, I\'m happy to help with any make or model. My expertise is particularly strong with European brands, but cars are cars—the fundamentals are the same.'
              },
              {
                q: 'What if I\'m not in Dubai?',
                a: 'I can still offer general advice! Obviously I can\'t work on your car, but I can help you understand what a local garage is telling you.'
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#25D366]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Ask Your Question?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Glenn typically responds within minutes. No question is too small.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/971521217425"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#25D366] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Start WhatsApp Chat
            </a>
            <a
              href="tel:+971521217425"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              <Phone className="w-5 h-5" />
              Call Instead
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
