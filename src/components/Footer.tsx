'use client';

import Link from 'next/link';
import Image from 'next/image';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place//data=!4m3!3m2!1s0x3e5f6921b362aa0d:0x8bc322a165f1d7a5!12e1?source=g.page.m.kd._&laa=lu-desktop-review-solicitation';
const INSTAGRAM_URL = 'https://www.instagram.com/powerworksgarage/?hl=en';

const usefulLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Testimonials', href: '/#reviews' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Made & Partners', href: '/partners' },
];

const services = [
  { label: 'Hybrid Maintenance', href: '/services/hybrid' },
  { label: 'Car Servicing', href: '/services/car-service' },
  { label: 'Car Performance Upgrades', href: '/services/performance' },
  { label: 'Car AC Services', href: '/services/ac-repair' },
];

const socials = [
  { label: 'Leave a Review on Google', href: GOOGLE_MAPS_URL },
  { label: 'YouTube', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: INSTAGRAM_URL },
  { label: 'LinkedIn', href: '#' },
];

const brands = [
  { name: 'Bentley', logo: '/bentley.png' },
  { name: 'Audi', logo: '/audi.png' },
  { name: 'Volkswagen', logo: '/vw.png' },
  { name: 'Porsche', logo: '/porsche.png' },
];

export default function Footer() {
  return (
    <footer>
      {/* Brand Logos Strip */}
      <div className="bg-white py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="relative w-16 h-12 lg:w-24 lg:h-16 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-[var(--pw-gray-500)] text-sm mt-6">
            A FEW OF THE MAKES WE LOVE TO WORK ON
          </p>
        </div>
      </div>

      {/* Red CTA Banner */}
      <div className="bg-[var(--pw-red)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Schedule Your Appointment Today
              </h3>
              <p className="text-white/80 text-sm">
                Give Us a Call or, Leave Us Your Details for Online Booking
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="tel:0521217425"
                className="text-2xl lg:text-3xl font-bold text-white hover:text-white/90 transition-colors"
              >
                052 121 7425
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 bg-[var(--pw-blue-dark)] text-white font-semibold rounded hover:bg-[var(--pw-blue)] transition-colors flex items-center gap-2"
              >
                APPOINTMENT
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[var(--pw-blue-deep)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Logo & Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src="/pw-logo-dark-footer.png"
                    alt="Powerworks Garage"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
              <p className="text-white/60 text-sm mb-6">
                Powerworks Garage is a British owned independent automotive and car repair specialist in Dubai. We aim to offer reliability, honesty and integrity on every job, for every customer.
              </p>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <span>19 Al Falaya Street</span>
              </div>
              <div className="text-sm text-white/60">
                Al Quoz, Dubai
              </div>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="font-semibold text-white mb-6">Useful Links</h4>
              <ul className="space-y-3">
                {usefulLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-[var(--pw-red)] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h4 className="font-semibold text-white mb-6">Our Services</h4>
              <ul className="space-y-3">
                {services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-[var(--pw-red)] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Socials */}
            <div>
              <h4 className="font-semibold text-white mb-6">Our Socials</h4>
              <ul className="space-y-3">
                {socials.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-[var(--pw-red)] transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <div className="space-y-6">
                {/* Email */}
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email us</p>
                  <a
                    href="mailto:help@powerworksgarage.com"
                    className="text-white hover:text-[var(--pw-red)] transition-colors text-sm"
                  >
                    help@powerworksgarage.com
                  </a>
                </div>

                {/* Phone */}
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Call us on</p>
                  <a
                    href="tel:0521217425"
                    className="text-white hover:text-[var(--pw-red)] transition-colors text-sm"
                  >
                    052 121 7425
                  </a>
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/971521217425"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--pw-green-whatsapp)] text-white text-sm font-semibold rounded hover:brightness-110 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[var(--pw-blue-deep)] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              &copy; Copyright Powerworks Garage 2024
            </p>
            <p className="text-white/50 text-sm">
              Created by Performacode &nbsp;&nbsp; | &nbsp;&nbsp; Developed by Performacode
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
