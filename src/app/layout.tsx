import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Powerworks Garage Dubai | British-Owned Car Repair Specialists",
  description:
    "Dubai's trusted British-owned car repair & service specialists. Expert diagnostics, transparent pricing, and exceptional service for all makes and models. Call 052 121 7425.",
  keywords: [
    "car repair dubai",
    "car service dubai",
    "british garage dubai",
    "auto repair al quoz",
    "bmw service dubai",
    "audi service dubai",
    "mercedes service dubai",
    "land rover service dubai",
    "ac repair car dubai",
    "car diagnostics dubai",
    "fleet maintenance dubai",
  ],
  authors: [{ name: "Powerworks Garage" }],
  creator: "Powerworks Garage",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://powerworksgarage.com",
    siteName: "Powerworks Garage Dubai",
    title: "Powerworks Garage Dubai | British-Owned Car Repair Specialists",
    description:
      "Dubai's trusted British-owned car repair & service specialists. Expert diagnostics, transparent pricing, and exceptional service for all makes and models.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Powerworks Garage - British Car Specialists in Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Powerworks Garage Dubai | British-Owned Car Repair Specialists",
    description:
      "Dubai's trusted British-owned car repair & service specialists. Expert diagnostics, transparent pricing.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="font-sans antialiased bg-[var(--pw-white)] text-[var(--pw-navy)]">
        {children}
      </body>
    </html>
  );
}
