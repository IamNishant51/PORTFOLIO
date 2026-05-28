import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Nishant Unavane — Full-Stack Developer",
  description:
    "Learn more about Nishant Unavane, a Full-Stack Developer specializing in React, Next.js, TypeScript, GSAP, and VS Code extension development.",
  alternates: {
    canonical: "https://nishantunavane.qzz.io/about",
  },
  openGraph: {
    title: "About | Nishant Unavane — Full-Stack Developer",
    description:
      "Learn more about Nishant Unavane, a Full-Stack Developer specializing in React, Next.js, TypeScript, and immersive web experiences.",
    url: "https://nishantunavane.qzz.io/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
