'use client';

import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Glenn Power',
    role: 'Owner',
    image: '/team-gp.jpg',
  },
  {
    name: 'DJ',
    role: 'Workshop Manager',
    image: '/team-dj.jpg',
  },
  {
    name: 'Liradeo Santiago',
    role: 'Master Tech',
    image: '/team-lala.jpg',
  },
  {
    name: 'Justin Nunez',
    role: 'Service Doctor',
    image: '/team-ju.jpg',
  },
];

export default function TeamSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--pw-blue-dark)]">
              Our Team
            </h2>
          </div>
          <Link
            href="/about#team"
            className="inline-flex items-center gap-2 text-[var(--pw-red)] font-semibold hover:gap-3 transition-all"
          >
            <span>Meet all the team</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="group">
              {/* Image */}
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-[var(--pw-gray-100)]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div>
                <h3 className="font-bold text-[var(--pw-blue-dark)] flex items-center gap-2">
                  {member.name}
                  <span className="w-8 h-0.5 bg-[var(--pw-red)]"></span>
                </h3>
                <p className="text-sm text-[var(--pw-gray-600)] uppercase tracking-wider">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
