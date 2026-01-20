import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as the variable font
import "./globals.css";
import SmoothScrolling from "./components/SmoothScrolling";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "Nishant Unavane - Full-Stack Developer Portfolio",
  description: "Full-Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Creating stunning digital experiences with code and creativity.",
  keywords: ["Nishant Unavane", "Full-Stack Developer", "React Developer", "Next.js", "TypeScript", "Web Developer", "Frontend Developer", "Backend Developer", "Portfolio", "GSAP", "Tailwind CSS"],
  authors: [{ name: "Nishant Unavane" }],
  creator: "Nishant Unavane",
  publisher: "Nishant Unavane",
  metadataBase: new URL('https://nishant-unavane.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nishant-unavane.vercel.app',
    title: "Nishant Unavane - Full-Stack Developer Portfolio",
    description: "Full-Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Creating stunning digital experiences with code and creativity.",
    siteName: "Nishant Unavane Portfolio",
    images: [
      {
        url: 'https://ik.imagekit.io/9pfz6g8ri/avatars/dp.png',
        width: 1200,
        height: 630,
        alt: 'Nishant Unavane - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nishant Unavane - Full-Stack Developer Portfolio",
    description: "Full-Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    images: ['https://ik.imagekit.io/9pfz6g8ri/avatars/dp.png'],
    creator: '@nishant_unavane',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome', url: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'android-chrome', url: '/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nishant Unavane',
    url: 'https://nishant-unavane.vercel.app',
    image: 'https://ik.imagekit.io/9pfz6g8ri/avatars/dp.png',
    jobTitle: 'Full-Stack Developer',
    description: 'Full-Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies.',
    sameAs: [
      'https://github.com/IamNishant51',
      'https://www.linkedin.com/in/nishant-unavane-008291275/',
    ],
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Node.js', 'Full-Stack Development'],
    email: 'nishant.unavane@outlook.com',
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#CCFF00" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0A0A0A" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#CCFF00" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="portfolio-theme">
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}
