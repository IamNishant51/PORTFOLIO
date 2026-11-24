import { Metadata } from "next";
import { profile } from "@/content/profile";
import { projects, Project } from "@/content/projects";

const siteUrl = "https://nishantunavane.qzz.io";

export function getSiteMetadata(title?: string, description?: string): Metadata {
  const pageTitle = title
    ? `${title} — ${profile.name}`
    : `${profile.name} — Full-Stack Developer & Agentic Systems Engineer`;
  const pageDescription =
    description ||
    "Full-stack web applications, VS Code extensions, and autonomous agent systems engineered with Next.js, React 19, TypeScript, and modern MCP tooling.";

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: siteUrl,
    },
    icons: {
      icon: [
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
    appleWebApp: {
      title: "Nishant",
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: siteUrl,
      siteName: profile.name,
      images: [
        {
          url: "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/09-brand/og-image.webp",
          width: 1200,
          height: 630,
          alt: "Nishant Unavane — Portfolio 2027",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: ["https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/09-brand/og-image.webp"],
    },
  };
}

export function generatePersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.rolePrimary,
    url: siteUrl,
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "Model Context Protocol",
      "Autonomous Agents",
      "VS Code Extensions",
      "GSAP",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressCountry: "India",
    },
  };
}

export function generateProjectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    codeRepository: project.links.repo || siteUrl,
    programmingLanguage: project.stack,
    author: {
      "@type": "Person",
      name: profile.name,
    },
  };
}
