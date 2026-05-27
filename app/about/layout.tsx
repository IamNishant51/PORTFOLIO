import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Nishant Unavane",
  description: "Learn more about Nishant Unavane, a Full-Stack Developer specializing in React, Next.js, TypeScript, and immersive web experiences.",
  openGraph: {
    title: "About | Nishant Unavane",
    description: "Learn more about Nishant Unavane, a Full-Stack Developer specializing in React, Next.js, TypeScript, and immersive web experiences.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
