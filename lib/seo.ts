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
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    },
  };
}

export function generatePersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Nishant Unavane · Portfolio 2027",
        description: profile.subPositioning,
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: `${profile.name} — ${profile.rolePrimary}`,
        mainEntity: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        alternateName: [profile.handle, "Nishant"],
        jobTitle: profile.rolePrimary,
        description: profile.positioning,
        url: siteUrl,
        image:
          "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/09-brand/og-image.webp",
        sameAs: [
          profile.github,
          profile.linkedin,
          "https://marketplace.visualstudio.com/publishers/nishantunavane",
          "https://www.npmjs.com/~iamnishant51",
        ],
        knowsAbout: [
          "TypeScript",
          "Next.js",
          "React 19",
          "Node.js",
          "Python",
          "Model Context Protocol (MCP)",
          "Autonomous Coding Agents",
          "VS Code Extensions",
          "Cognitive Memory Graphs",
          "GSAP",
          "Three.js",
          "WebGL",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
      },
      {
        "@type": "ItemList",
        name: "Flagship Autonomous Systems & Engineering Works",
        itemListElement: projects.map((p, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "SoftwareApplication",
            name: p.title,
            description: p.description,
            applicationCategory: p.category,
            url: `${siteUrl}/work/${p.slug}`,
            operatingSystem: "Cross-platform",
            author: {
              "@id": `${siteUrl}/#person`,
            },
          },
        })),
      },
    ],
  };
}

export function generateProjectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.description,
        codeRepository: project.links.repo || siteUrl,
        programmingLanguage: project.stack,
        author: {
          "@type": "Person",
          name: profile.name,
          url: siteUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${siteUrl}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${siteUrl}/work/${project.slug}`,
          },
        ],
      },
    ],
  };
}
