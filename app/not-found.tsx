'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-2xl">
          {/* Glenn's Avatar with animation */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mb-8"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative inline-block"
            >
              <Image
                src="/its-glenn.jpg"
                alt="Glenn - Powerworks Garage Owner"
                width={180}
                height={180}
                className="rounded-full border-4 border-power-blue shadow-2xl mx-auto object-cover"
                priority
              />
              {/* Speech bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="absolute -right-4 -top-4 bg-power-blue text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg"
              >
                Oops!
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 404 Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-8xl md:text-9xl font-extrabold text-power-blue mb-4"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
          >
            Wrong Turn, Mate!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8 text-lg"
          >
            Looks like this page took a detour and got lost somewhere in Dubai.
            Don&apos;t worry, we&apos;ll get you back on track!
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/"
              className="bg-power-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-900 transition-all hover:scale-105 transform"
            >
              Back to Home
            </Link>
            <Link
              href="/car-servicing-dubai"
              className="bg-gray-100 text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all hover:scale-105 transform"
            >
              View Services
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Minimal Footer for 404 */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2026 Powerworks Garage Dubai. British Precision. Dubai Hospitality.
          </p>
        </div>
      </footer>
    </div>
  );
}
