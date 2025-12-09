import {
  Header,
  Footer,
  HeroSection,
  AboutSection,
  ServiceBanner,
  TeamSection,
  VideoSection,
  WhyChooseUs,
  SatisfactionStrip,
  BlogSection,
  TestimonialsSection,
} from '@/components';

export default function Home() {
  return (
    <>
      {/* Header with Top Bar */}
      <Header />

      <main>
        {/* Hero Section - UK Trained Technicians */}
        <HeroSection />

        {/* About - British Owned Automotive Experts */}
        <AboutSection />

        {/* Red Banner - Service and Satisfaction */}
        <ServiceBanner />

        {/* Our Team */}
        <TeamSection />

        {/* Video Section - Since 2020 */}
        <VideoSection />

        {/* Why Choose Us / What Else */}
        <WhyChooseUs />

        {/* 100% Satisfaction Guarantee Strip */}
        <SatisfactionStrip />

        {/* Blog Section */}
        <BlogSection />

        {/* Customer Testimonials */}
        <TestimonialsSection />
      </main>

      {/* Footer with Brand Logos and Red CTA */}
      <Footer />
    </>
  );
}
