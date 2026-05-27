import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Nishant Unavane",
  description: "Get in touch with Nishant Unavane. Open for freelance opportunities, full-time roles, or exciting collaborative projects.",
  openGraph: {
    title: "Contact | Nishant Unavane",
    description: "Get in touch with Nishant Unavane. Open for freelance opportunities, full-time roles, or exciting collaborative projects.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
