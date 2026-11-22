const fs = require('fs');
const path = require('path');

const srcDirs = ['app', 'components', 'content', 'lib'];
const baseDir = 'C:/Users/nisha/Desktop/PORTFOLIO';

const usedAssets = new Set();
const assetReferences = {};

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        scanDir(fullPath);
      }
    } else if (/\.(tsx?|jsx?|css|json)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.matchAll(/\/assets\/[a-zA-Z0-9_\-\.\/]+/g);
      for (const m of matches) {
        let clean = m[0].split(/['"`;)\]]/)[0];
        // Only keep if it looks like a file with an extension
        if (/\.[a-zA-Z0-9]+$/.test(clean)) {
          usedAssets.add(clean);
          if (!assetReferences[clean]) assetReferences[clean] = [];
          assetReferences[clean].push(path.relative(baseDir, fullPath).replace(/\\/g, '/'));
        }
      }
    }
  }
}

for (const d of srcDirs) {
  scanDir(path.join(baseDir, d));
}

// User-provided URLs
const userUrls = [
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/carto.png",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/frame-js.png",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/25_18.png",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/24_15.png",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/audio/song-01-ghalib-hona-hai.mp3",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/audio/song-04-unakkul-naane.mp3",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/audio/song-02-finding-her.mp3",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/audio/song-06-madira.mp3",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/audio/song-03-highway-to-hell.mp3",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/audio/song-05-tandavam.mp3",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/00-references/style-plate.png",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-01-be-humble.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-03-developer.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/06-act5-studio/a5-portrait-halftone.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/synapse.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/custom-pi.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/ollama-agent.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/atlas-mcp.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-07-new-arrivals.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/05-act4-sea/a4-sea-plate.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/carto.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-05-visual-study.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/photo-04-specular-mirror.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/hero-slit-portrait.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/06-act5-studio/a5-desk-plate.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/07-act6-horizon/a6-horizon-plate.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/hero-spiderman.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-03-the-developer.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/03-act2-colonnade/a2-colonnade-plate.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/04-act3-temple/a3-temple-plate.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-02-alternate.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/all-projects.jpg",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/01-textures/halftone-45.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-06-monochrome-glare.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/projects-section-poster.jpg",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/04-act3-temple/a3-custom-pi-plate.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-02-bamboo-grove.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/frame-js.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/photo-02-bamboo-grove.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/three-js-book.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/07-act6-horizon/a6-sun.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/three-js.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-04-be-nice.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/paper-mosaic-portrait.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/03-act2-colonnade/a2-engraving-detail.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-03-jacket-smile.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/06-act5-studio/a5-instruments.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/hero-portrait.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-04-specular-mirror.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-03-studio-jacket.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/photo-03-studio-jacket.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/04-act3-temple/a3-marble-bust.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/covers/cover-06-unakkul-naane.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/all-projects.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/covers/cover-05-tandavam.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-05-mountain-vista.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/photo-05-mountain-vista.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/05-act4-sea/a4-cypress.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/08-project-shots/projects-section-poster.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/covers/cover-01-ghalib-hona-hai.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/03-act2-colonnade/a2-column-left.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/photo-01-night-lake.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/plate-01-night-colonnade.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/03-act2-colonnade/a2-column-right.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/hero-editorial-pass.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/covers/cover-04-madira.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/00-references/NISHANT-BAMBOO.jpg",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/hero-silhouette-terracotta.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/covers/cover-02-highway-to-hell.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/04-act3-temple/a3-arch-frame.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/a1-clouds-near.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/09-brand/og-image.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/00-references/NISHANT-NIGHT.jpg",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/about/covers/cover-03-finding-her.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/05-act4-sea/a4-sail.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/01-textures/plate-edge.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/a1-sky-plate.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/a1-heron.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/07-act6-horizon/a6-birds.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/09-brand/monogram.svg",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/a1-clouds-far.webp",
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/01-textures/paper-grain.webp"
];

const uploadedPaths = new Set(
  userUrls.map(u => u.replace('https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit', ''))
);

console.log('Total Uploaded to ImageKit:', uploadedPaths.size);
console.log('Total Unique Assets in Code:', usedAssets.size);

const usedInCodeAndUploaded = [];
const usedInCodeButNotUploaded = [];
const uploadedButNotUsed = [];

for (const a of usedAssets) {
  if (uploadedPaths.has(a)) {
    usedInCodeAndUploaded.push(a);
  } else {
    usedInCodeButNotUploaded.push(a);
  }
}

for (const u of uploadedPaths) {
  if (!usedAssets.has(u)) {
    uploadedButNotUsed.push(u);
  }
}

console.log('\n=== 1. ACTIVELY USED IN CODE & AVAILABLE ON IMAGEKIT (' + usedInCodeAndUploaded.length + ') ===');
usedInCodeAndUploaded.sort().forEach(a => {
  console.log('USED:', a, '-->', [...new Set(assetReferences[a])].join(', '));
});

console.log('\n=== 2. USED IN CODE BUT MISSING FROM UPLOADED LIST (' + usedInCodeButNotUploaded.length + ') ===');
usedInCodeButNotUploaded.sort().forEach(a => {
  console.log('MISSING:', a, '-->', [...new Set(assetReferences[a])].join(', '));
});

console.log('\n=== 3. UPLOADED TO IMAGEKIT BUT NOT USED IN CODE (SAFE TO DELETE) (' + uploadedButNotUsed.length + ') ===');
uploadedButNotUsed.sort().forEach(a => {
  console.log('DELETE:', a);
});
