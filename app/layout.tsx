import type { Metadata, Viewport } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "./components/SmoothScrolling";
import TransitionLayout from "./components/layout/TransitionLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-universalsans",
  display: "swap",
  preload: true,
  weight: ["400"],
  fallback: ["system-ui", "arial"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-geistmono",
  display: "swap",
  preload: false,
  weight: ["400"],
  fallback: ["monospace"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0c0b",
};

export const metadata: Metadata = {
  title: "Nishant Unavane — Full-Stack Developer",
  description:
    "Full-Stack Developer crafting high-performance web apps, VS Code extensions, and immersive digital experiences. React · Next.js · TypeScript · GSAP.",
  keywords: [
    "Nishant Unavane",
    "Full-Stack Developer",
    "VS Code Extension Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Portfolio",
    "GSAP",
    "Tailwind CSS",
    "Node.js",
    "MongoDB",
  ],
  authors: [{ name: "Nishant Unavane" }],
  creator: "Nishant Unavane",
  publisher: "Nishant Unavane",
  metadataBase: new URL("https://nishant-unavane.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nishant-unavane.vercel.app",
    title: "Nishant Unavane — Full-Stack Developer",
    description:
      "Full-Stack Developer crafting high-performance web apps, VS Code extensions, and immersive digital experiences.",
    siteName: "Nishant Unavane Portfolio",
    images: [
      {
        url: "https://ik.imagekit.io/9pfz6g8ri/avatars/dp.png",
        width: 1200,
        height: 630,
        alt: "Nishant Unavane — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nishant Unavane — Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    images: ["https://ik.imagekit.io/9pfz6g8ri/avatars/dp.png"],
    creator: "@nishant_unavane",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nishant Unavane",
    url: "https://nishant-unavane.vercel.app",
    image: "https://ik.imagekit.io/9pfz6g8ri/avatars/dp.png",
    jobTitle: "Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    sameAs: [
      "https://github.com/IamNishant51",
      "https://www.linkedin.com/in/nishant-unavane-008291275/",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "GSAP",
      "Tailwind CSS",
      "Node.js",
      "Full-Stack Development",
    ],
    email: "nishant.unavane@outlook.com",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" href="/ASSETS/HERO-BG.svg" as="image" />
        <meta name="theme-color" content="#0c0c0b" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="relative w-full max-w-[100vw] overflow-x-hidden">
          <SmoothScrolling>
            <TransitionLayout>{children}</TransitionLayout>
          </SmoothScrolling>
        </div>
      </body>
    </html>
  );
}
