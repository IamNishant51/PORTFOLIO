import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as the variable font
import "./globals.css";
import SmoothScrolling from "./components/SmoothScrolling";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });

export const metadata: Metadata = {
  title: "Nishant's Portfolio",
  description: "Full-Stack Developer crafting digital experiences with code and creativity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased selection:bg-accent-color selection:text-black`} suppressHydrationWarning>
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
