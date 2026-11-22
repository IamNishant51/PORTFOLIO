const fs = require('fs');
const path = require('path');

const IK_BASE = 'https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit';

const dirs = [
  'C:/Users/nisha/Desktop/PORTFOLIO',
  'C:/Users/nisha/Desktop/Nishant_portfolio_2027'
];

const files = [
  'app/about/page.tsx',
  'app/globals.css',
  'app/projects/page.tsx',
  'app/work/[slug]/page.tsx',
  'components/about/LandingAboutSection.tsx',
  'components/about/PaperMosaicSection.tsx',
  'components/acts/Act01Arrival.tsx',
  'components/acts/Act02Colonnade.tsx',
  'components/acts/Act03Temple.tsx',
  'components/acts/Act06Horizon.tsx',
  'components/chrome/Nav.tsx',
  'components/chrome/PageTransitionCurtain.tsx',
  'components/hero/HeroEditorialCard.tsx',
  'components/landing/LandingProjectsSection.tsx',
  'components/primitives/ProjectRow.tsx',
  'content/about.ts',
  'content/experiments.ts',
  'content/projects.ts',
  'lib/seo.ts'
];

dirs.forEach(baseDir => {
  console.log('Processing:', baseDir);
  files.forEach(f => {
    const full = path.join(baseDir, f);
    if (!fs.existsSync(full)) return;
    let content = fs.readFileSync(full, 'utf8');
    
    // Replace /assets/... except all-projects-mobile.webp
    // Be careful not to double-prefix if already replaced
    const updated = content.replace(/(?<!https:\/\/ik\.imagekit\.io\/9pfz6g8ri\/portfolio-images-for-imagekit)\/assets\/(?!08-project-shots\/all-projects-mobile\.webp)([a-zA-Z0-9_\-\.\/]+)/g, `${IK_BASE}/assets/$1`);
    
    fs.writeFileSync(full, updated, 'utf8');
    console.log('  Updated', f);
  });

  // Update next.config.ts in baseDir
  const nextConfigPath = path.join(baseDir, 'next.config.ts');
  if (fs.existsSync(nextConfigPath)) {
    let nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
    if (!nextConfig.includes('ik.imagekit.io')) {
      const configReplacement = `const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    viewTransition: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
    ],
  },
};`;
      nextConfig = nextConfig.replace(/const nextConfig: NextConfig = \{[\s\S]*?\};/, configReplacement);
      fs.writeFileSync(nextConfigPath, nextConfig, 'utf8');
      console.log('  Updated next.config.ts with remotePatterns');
    }
  }
});

console.log('All files updated successfully!');
