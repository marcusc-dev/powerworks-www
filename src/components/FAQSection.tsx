'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'Do you work on all makes and models?',
    answer: 'Yes! Our British-trained technicians are experienced with all major car brands including European, Japanese, American, and Korean vehicles. From Audi to Toyota, BMW to Nissan, we service them all with the same high standards.',
  },
  {
    question: 'Can I get a quote on WhatsApp?',
    answer: "Absolutely! Just send us a WhatsApp message with your car details and what you need done. We'll typically respond within 30 minutes during business hours with an estimate. It's the fastest way to get a quote.",
  },
  {
    question: 'Where are you located?',
    answer: "We're located in Al Quoz Industrial Area, Dubai - easy to access from Sheikh Zayed Road. We have free customer parking and a comfortable waiting area. We also offer pickup and dropoff service for your convenience.",
  },
  {
    question: 'Do you use genuine parts?',
    answer: 'We use genuine OEM parts or high-quality OEM-equivalent parts depending on your preference and budget. We always discuss parts options with you before proceeding and never use substandard components.',
  },
  {
    question: 'How long does a typical service take?',
    answer: 'A standard service typically takes 2-4 hours. More complex repairs vary depending on the work needed. We always give you a time estimate upfront and keep you updated via WhatsApp with progress photos.',
  },
  {
    question: 'Do you offer pickup and delivery?',
    answer: "Yes, we offer free pickup and delivery within Dubai for services over a certain value. We also have a courtesy car available for longer repairs. Just ask when you book and we'll arrange it.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[var(--pw-red)] font-semibold text-sm uppercase tracking-wider mb-4">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--pw-blue-dark)] mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[var(--pw-gray-600)] max-w-2xl mx-auto">
            Quick answers to common questions. Can&apos;t find what you&apos;re looking for?
            Send us a WhatsApp message.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? 'border-[var(--pw-red)] shadow-md'
                  : 'border-[var(--pw-gray-200)] hover:border-[var(--pw-gray-300)]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-[var(--pw-off-white)] transition-colors"
              >
                <span className="font-semibold text-[var(--pw-blue-dark)] pr-8">
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                    openIndex === index
                      ? 'bg-[var(--pw-red)] text-white rotate-180'
                      : 'bg-[var(--pw-off-white)] text-[var(--pw-blue-dark)]'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-6 pt-0 text-[var(--pw-gray-600)] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-[var(--pw-gray-600)] mb-4">
            Still have questions? We&apos;re here to help.
          </p>
          <a
            href="https://wa.me/971521217425?text=Hi%20Powerworks%2C%20I%20have%20a%20question"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--pw-green-whatsapp)] text-white font-semibold rounded-lg hover:brightness-110 transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Ask Us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
