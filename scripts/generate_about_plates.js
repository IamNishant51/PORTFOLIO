// scripts/generate_about_plates.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSET_DIR = path.resolve('public/assets/about');

async function buildPlate1() {
  // Plate 1: Neoclassical Anatomical Engraving
  // Width: 800, Height: 1000
  const W = 800, H = 1000;
  
  // Prepare cutout_0: night profile
  // Cutout 0 is 640x640. Resize to fit nicely on the lower right
  const cutout0 = await sharp(path.join(ASSET_DIR, 'cutout_0.png'))
    .resize(620, 620, { fit: 'inside' })
    .toBuffer();
  
  const cutoutMeta = await sharp(cutout0).metadata();
  const cLeft = Math.round(W - cutoutMeta.width - 20);
  const cTop = Math.round(H - cutoutMeta.height - 40);

  // SVG background with copperplate etching, anatomical callout lines, coordinates, and terracotta wedge
  const bgSvg = `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="#F6F2E9"/>
    
    <!-- Paper border & hairline mat -->
    <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="#1A1815" stroke-width="1" stroke-opacity="0.35"/>
    <rect x="36" y="36" width="${W - 72}" height="${H - 72}" fill="none" stroke="#1A1815" stroke-width="0.5" stroke-opacity="0.18"/>
    
    <!-- Corner register marks -->
    <path d="M 24 28 L 32 28 M 28 24 L 28 32" stroke="#1A1815" stroke-width="1" stroke-opacity="0.6"/>
    <path d="M ${W-24} 28 L ${W-32} 28 M ${W-28} 24 L ${W-28} 32" stroke="#1A1815" stroke-width="1" stroke-opacity="0.6"/>
    <path d="M 24 ${H-28} L 32 ${H-28} M 28 ${H-32} L 28 ${H-24}" stroke="#1A1815" stroke-width="1" stroke-opacity="0.6"/>
    <path d="M ${W-24} ${H-28} L ${W-32} ${H-28} M ${W-28} ${H-32} L ${W-28} ${H-24}" stroke="#1A1815" stroke-width="1" stroke-opacity="0.6"/>
    
    <!-- Terracotta anatomical wedge callout (Ref 6 style) -->
    <path d="M 460 260 L 720 180 L 680 440 Z" fill="#C05B3C" fill-opacity="0.22"/>
    <path d="M 460 260 L 720 180 L 680 440 Z" fill="none" stroke="#C05B3C" stroke-width="1.2" stroke-opacity="0.7"/>

    <!-- Concentric copperplate quadrant arcs -->
    <circle cx="480" cy="380" r="160" fill="none" stroke="#1A1815" stroke-width="0.8" stroke-opacity="0.25" stroke-dasharray="4 4"/>
    <circle cx="480" cy="380" r="240" fill="none" stroke="#1A1815" stroke-width="0.6" stroke-opacity="0.2"/>
    <circle cx="480" cy="380" r="320" fill="none" stroke="#1A1815" stroke-width="0.5" stroke-opacity="0.15"/>

    <!-- Radial angle lines with degrees -->
    <line x1="480" y1="380" x2="200" y2="240" stroke="#1A1815" stroke-width="0.5" stroke-opacity="0.25"/>
    <line x1="480" y1="380" x2="160" y2="380" stroke="#1A1815" stroke-width="0.5" stroke-opacity="0.25"/>
    <line x1="480" y1="380" x2="220" y2="520" stroke="#1A1815" stroke-width="0.5" stroke-opacity="0.25"/>

    <!-- Technical Callout Lines & Annotation Labels -->
    <line x1="460" y1="260" x2="140" y2="220" stroke="#1A1815" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="140" cy="220" r="3" fill="#1A1815" fill-opacity="0.6"/>
    <text x="130" y="215" font-family="monospace" font-size="10" letter-spacing="1.5" fill="#1A1815" fill-opacity="0.75" text-anchor="end">SEC. α — FRONTAL RUNTIME ENGINE</text>

    <line x1="420" y1="330" x2="120" y2="330" stroke="#1A1815" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="120" cy="330" r="3" fill="#1A1815" fill-opacity="0.6"/>
    <text x="110" y="325" font-family="monospace" font-size="10" letter-spacing="1.5" fill="#1A1815" fill-opacity="0.75" text-anchor="end">SEC. β — PERSISTENT MEMORY GRAPH</text>

    <line x1="380" y1="420" x2="140" y2="440" stroke="#1A1815" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="140" cy="440" r="3" fill="#1A1815" fill-opacity="0.6"/>
    <text x="130" y="448" font-family="monospace" font-size="10" letter-spacing="1.5" fill="#1A1815" fill-opacity="0.75" text-anchor="end">SEC. γ — MCP PROTOCOL SYNAPSE</text>

    <!-- Crosshair coordinate block -->
    <g transform="translate(68, 120)">
      <text font-family="monospace" font-size="11" letter-spacing="2" fill="#C05B3C">N 18°31'12" · E 73°51'22"</text>
      <text y="20" font-family="serif" font-size="14" font-style="italic" fill="#1A1815" fill-opacity="0.8">Tabula I. Organum Cognitivum</text>
      <line x1="0" y1="28" x2="180" y2="28" stroke="#C05B3C" stroke-width="1"/>
    </g>

    <!-- Top Plate Header -->
    <text x="${W/2}" y="62" font-family="monospace" font-size="10" letter-spacing="3" fill="#1A1815" fill-opacity="0.65" text-anchor="middle">
      FIG. 01 — THE COGNITIVE STRATUM · TABULA ANATOMICA
    </text>

    <!-- Bottom Plate Footer -->
    <text x="50" y="${H - 52}" font-family="monospace" font-size="10" letter-spacing="1.5" fill="#1A1815" fill-opacity="0.65">
      ARCHIVES · PUNE, IN · 03.01.2006
    </text>
    <text x="${W - 50}" y="${H - 52}" font-family="serif" font-size="13" font-style="italic" fill="#1A1815" fill-opacity="0.8" text-anchor="end">
      Nishant Unavane · Engraving Plate I
    </text>
  </svg>
  `;

  // Overlay layer: subtle warm tint, hairline caliper lines in front of cutout
  const fgSvg = `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <!-- Fine caliper vector on face -->
    <line x1="${cLeft + 160}" y1="${cTop + 140}" x2="${cLeft + 80}" y2="${cTop + 140}" stroke="#C05B3C" stroke-width="1.2" stroke-dasharray="2 3"/>
    <circle cx="${cLeft + 160}" cy="${cTop + 140}" r="3" fill="#C05B3C"/>
    <text x="${cLeft + 70}" y="${cTop + 138}" font-family="monospace" font-size="9" fill="#C05B3C" text-anchor="end">OCULAR AXIS 0.0°</text>
  </svg>
  `;

  await sharp(Buffer.from(bgSvg))
    .composite([
      { input: cutout0, left: cLeft, top: cTop },
      { input: Buffer.from(fgSvg), left: 0, top: 0 }
    ])
    .webp({ quality: 92 })
    .toFile(path.join(ASSET_DIR, 'plate-01-anatomical.webp'));

  console.log('Plate 01 generated!');
}

async function buildPlate2() {
  // Plate 2: Ukiyo-e Wave & Terracotta Block
  // Width: 800, Height: 1067
  const W = 800, H = 1067;
  
  // Cutout 1: Standing in front of bamboo shoots, arms crossed (640x853)
  const cutout1 = await sharp(path.join(ASSET_DIR, 'cutout_1.png'))
    .resize(600, 800, { fit: 'inside' })
    .toBuffer();
  
  const cutoutMeta = await sharp(cutout1).metadata();
  const cLeft = Math.round((W - cutoutMeta.width) / 2);
  const cTop = H - cutoutMeta.height - 40;

  // Background SVG with bold vertical Terracotta block, Japanese Great Wave linework, and red seal stamp
  const bgSvg = `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="#F6F2E9"/>
    
    <!-- Paper borders -->
    <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="#1A1815" stroke-width="1" stroke-opacity="0.3"/>
    <rect x="36" y="36" width="${W - 72}" height="${H - 72}" fill="none" stroke="#1A1815" stroke-width="0.5" stroke-opacity="0.15"/>
    
    <!-- Solid Terracotta Graphic Pillar (Ref 9 style) -->
    <rect x="220" y="80" width="360" height="${H - 160}" fill="#C05B3C"/>
    
    <!-- Delicate wave linework curling behind and around -->
    <g fill="none" stroke="#1A1815" stroke-width="1.4" stroke-opacity="0.45">
      <!-- Wave curl left -->
      <path d="M 40 850 C 90 700 160 620 280 640 C 350 650 380 720 320 780 C 270 820 180 840 100 950"/>
      <path d="M 60 880 C 110 740 180 670 290 690 C 340 700 360 750 310 800 C 260 840 190 870 120 980"/>
      <path d="M 20 920 C 70 800 140 730 250 750 C 300 760 320 810 270 860"/>
      <!-- Wave foam fingers -->
      <path d="M 280 640 C 290 610 320 600 340 620 C 330 635 310 645 295 645"/>
      <path d="M 260 655 C 275 630 300 625 315 640"/>
      <!-- Wave curl right -->
      <path d="M 760 880 C 700 730 620 660 500 680 C 440 690 410 750 460 810 C 510 850 600 870 680 980"/>
      <path d="M 740 910 C 680 770 600 710 490 730 C 450 740 430 780 470 830"/>
    </g>

    <!-- Seal Stamp "創" (to create) in a red square -->
    <rect x="620" y="100" width="48" height="48" fill="#C05B3C" stroke="#1A1815" stroke-width="1"/>
    <text x="644" y="133" font-family="serif" font-size="28" fill="#F6F2E9" text-anchor="middle">創</text>

    <!-- Top Plate Header -->
    <text x="${W/2}" y="62" font-family="monospace" font-size="10" letter-spacing="3" fill="#1A1815" fill-opacity="0.65" text-anchor="middle">
      FIG. 02 — THE INERTIAL WAVE · UKIYO-E COMPOSITION
    </text>

    <!-- Bottom Plate Footer -->
    <text x="50" y="${H - 52}" font-family="monospace" font-size="10" letter-spacing="1.5" fill="#1A1815" fill-opacity="0.65">
      PUNE, MH · EST. 2006
    </text>
    <text x="${W - 50}" y="${H - 52}" font-family="serif" font-size="13" font-style="italic" fill="#1A1815" fill-opacity="0.8" text-anchor="end">
      Nishant Unavane · Woodblock Plate II
    </text>
  </svg>
  `;

  await sharp(Buffer.from(bgSvg))
    .composite([
      { input: cutout1, left: cLeft, top: cTop }
    ])
    .webp({ quality: 92 })
    .toFile(path.join(ASSET_DIR, 'plate-02-wave.webp'));

  console.log('Plate 02 generated!');
}

async function buildPlate3() {
  // Plate 3: Contemporary Editorial Pass & Build Manifesto
  // Width: 800, Height: 1136 (Ref 10 style)
  const W = 800, H = 1136;
  
  // Cutout 2: Brown jacket thumbs up (738x1600)
  // Scale down so it fits prominently
  const cutout2 = await sharp(path.join(ASSET_DIR, 'cutout_2.png'))
    .resize(680, 960, { fit: 'inside' })
    .toBuffer();
  
  const cutoutMeta = await sharp(cutout2).metadata();
  const cLeft = Math.round((W - cutoutMeta.width) / 2);
  const cTop = H - cutoutMeta.height - 30;

  // Background SVG with bold typography ("BUILD", "2027", "START"), dashed coupon line, offset terracotta shadow
  const bgSvg = `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="#F6F2E9"/>
    
    <!-- Dashed Ticket Perimeter Border (Ref 10 style) -->
    <rect x="32" y="32" width="${W - 64}" height="${H - 64}" rx="16" fill="#EDE8DC" stroke="#1A1815" stroke-width="2" stroke-dasharray="8 6"/>

    <!-- Large Distressed Editorial Serif Title: "BUILD" -->
    <text x="70" y="240" font-family="serif" font-size="140" font-weight="bold" fill="#1A1815" letter-spacing="-2">
      BUIL<tspan fill="#C05B3C">D</tspan>
    </text>

    <!-- Offset Terracotta Silhouette Backdrop Block -->
    <path d="M 180 340 L 640 280 L 680 880 L 160 880 Z" fill="#C05B3C" fill-opacity="0.85"/>

    <!-- Pass Metadata Badges -->
    <g transform="translate(70, 280)">
      <text font-family="monospace" font-size="13" font-weight="bold" letter-spacing="2" fill="#1A1815">ACT. 03 / 05</text>
      <text y="22" font-family="monospace" font-size="11" letter-spacing="1" fill="#1A1815" fill-opacity="0.7">PASS NO. 008-2027</text>
    </g>

    <g transform="translate(620, 180)" text-anchor="end">
      <text font-family="monospace" font-size="13" font-weight="bold" letter-spacing="2" fill="#1A1815">10,340+ DL</text>
      <text y="20" font-family="monospace" font-size="11" letter-spacing="1" fill="#C05B3C">VS CODE EXTENSIONS</text>
      <text y="40" font-family="monospace" font-size="11" letter-spacing="1" fill="#1A1815" fill-opacity="0.7">15+ SHIPPED APPS</text>
    </g>

    <!-- Top Plate Header -->
    <text x="${W/2}" y="68" font-family="monospace" font-size="10" letter-spacing="3" fill="#1A1815" fill-opacity="0.65" text-anchor="middle">
      FIG. 03 — THE BUILD MANIFESTO · EDITORIAL PASS
    </text>

    <!-- Barcode graphic at bottom left -->
    <g transform="translate(70, ${H - 110})">
      <rect x="0" y="0" width="3" height="36" fill="#1A1815"/>
      <rect x="6" y="0" width="1" height="36" fill="#1A1815"/>
      <rect x="10" y="0" width="4" height="36" fill="#1A1815"/>
      <rect x="18" y="0" width="2" height="36" fill="#1A1815"/>
      <rect x="24" y="0" width="5" height="36" fill="#1A1815"/>
      <rect x="33" y="0" width="2" height="36" fill="#1A1815"/>
      <rect x="38" y="0" width="3" height="36" fill="#1A1815"/>
      <rect x="45" y="0" width="1" height="36" fill="#1A1815"/>
      <rect x="49" y="0" width="6" height="36" fill="#1A1815"/>
      <rect x="58" y="0" width="2" height="36" fill="#1A1815"/>
      <rect x="64" y="0" width="4" height="36" fill="#1A1815"/>
      <rect x="72" y="0" width="2" height="36" fill="#1A1815"/>
      <text y="50" font-family="monospace" font-size="9" letter-spacing="2" fill="#1A1815">03 01 2006 · PUNE</text>
    </g>

    <!-- Bottom Plate Footer -->
    <text x="${W - 70}" y="${H - 72}" font-family="serif" font-size="14" font-style="italic" fill="#1A1815" fill-opacity="0.85" text-anchor="end">
      Nishant Unavane · Manifesto Plate III
    </text>
  </svg>
  `;

  await sharp(Buffer.from(bgSvg))
    .composite([
      { input: cutout2, left: cLeft, top: cTop }
    ])
    .webp({ quality: 92 })
    .toFile(path.join(ASSET_DIR, 'plate-03-manifesto.webp'));

  console.log('Plate 03 generated!');
}

async function buildPlate4() {
  // Plate 4: The Geometric Spider-Silk Matrix & Comic Etching
  // Width: 800, Height: 1067
  const W = 800, H = 1067;
  
  // Cutout 3: Mirror selfie with leather jacket & spider tee (1500x2000)
  const cutout3 = await sharp(path.join(ASSET_DIR, 'cutout_3.png'))
    .resize(680, 907, { fit: 'inside' })
    .toBuffer();
  
  const cutoutMeta = await sharp(cutout3).metadata();
  const cLeft = Math.round((W - cutoutMeta.width) / 2);
  const cTop = H - cutoutMeta.height - 30;

  // Background SVG with intricate spider-web vector matrix, radial filaments, Ben-Day dot matrix
  const bgSvg = `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="#F6F2E9"/>
    
    <!-- Paper borders -->
    <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="#1A1815" stroke-width="1" stroke-opacity="0.3"/>
    <rect x="36" y="36" width="${W - 72}" height="${H - 72}" fill="none" stroke="#1A1815" stroke-width="0.5" stroke-opacity="0.15"/>

    <!-- Spider-web geometric linework center (cx=400, cy=460) -->
    <g fill="none" stroke="#1A1815" stroke-width="0.75" stroke-opacity="0.35">
      <!-- Radial web filaments -->
      <line x1="400" y1="460" x2="100" y2="80"/>
      <line x1="400" y1="460" x2="250" y2="50"/>
      <line x1="400" y1="460" x2="400" y2="40"/>
      <line x1="400" y1="460" x2="550" y2="50"/>
      <line x1="400" y1="460" x2="700" y2="80"/>
      <line x1="400" y1="460" x2="760" y2="250"/>
      <line x1="400" y1="460" x2="780" y2="460"/>
      <line x1="400" y1="460" x2="760" y2="670"/>
      <line x1="400" y1="460" x2="700" y2="840"/>
      <line x1="400" y1="460" x2="100" y2="840"/>
      <line x1="400" y1="460" x2="40" y2="670"/>
      <line x1="400" y1="460" x2="20" y2="460"/>
      <line x1="400" y1="460" x2="40" y2="250"/>

      <!-- Concentric web polygons -->
      <polygon points="400,380 460,400 480,460 460,520 400,540 340,520 320,460 340,400" stroke="#C05B3C" stroke-width="1.2" stroke-opacity="0.55"/>
      <polygon points="400,300 520,340 560,460 520,580 400,620 280,580 240,460 280,340"/>
      <polygon points="400,220 580,280 640,460 580,640 400,700 220,640 160,460 220,280" stroke="#C05B3C" stroke-width="0.8" stroke-opacity="0.4"/>
      <polygon points="400,140 640,220 720,460 640,700 400,780 160,700 80,460 160,220"/>
    </g>

    <!-- Ben-Day Halftone Dot Matrix Pattern Accent (Top Left) -->
    <pattern id="dot-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="8" cy="8" r="2.5" fill="#1A1815" fill-opacity="0.12"/>
    </pattern>
    <rect x="45" y="45" width="220" height="280" fill="url(#dot-pattern)"/>

    <!-- Spider Graphic Monogram / Embellishment -->
    <g transform="translate(630, 90)">
      <circle cx="30" cy="30" r="28" fill="none" stroke="#C05B3C" stroke-width="1.5"/>
      <path d="M 30 14 L 30 46 M 18 24 L 42 36 M 18 36 L 42 24" stroke="#C05B3C" stroke-width="1.5"/>
      <circle cx="30" cy="30" r="6" fill="#C05B3C"/>
    </g>

    <!-- Top Plate Header -->
    <text x="${W/2}" y="62" font-family="monospace" font-size="10" letter-spacing="3" fill="#1A1815" fill-opacity="0.65" text-anchor="middle">
      FIG. 04 — THE WEAVER'S MIRROR · GEOMETRIC MATRIX
    </text>

    <!-- Bottom Plate Footer -->
    <text x="50" y="${H - 52}" font-family="monospace" font-size="10" letter-spacing="1.5" fill="#1A1815" fill-opacity="0.65">
      TACTILE PROTOCOLS · PUNE EST. 2006
    </text>
    <text x="${W - 50}" y="${H - 52}" font-family="serif" font-size="13" font-style="italic" fill="#1A1815" fill-opacity="0.8" text-anchor="end">
      Nishant Unavane · Mirror Plate IV
    </text>
  </svg>
  `;

  await sharp(Buffer.from(bgSvg))
    .composite([
      { input: cutout3, left: cLeft, top: cTop }
    ])
    .webp({ quality: 92 })
    .toFile(path.join(ASSET_DIR, 'plate-04-spider.webp'));

  console.log('Plate 04 generated!');
}

async function buildPlate5() {
  // Plate 5: The Panoramic Visor & Horizon Projection
  // Width: 800, Height: 1000 (Ref 7 & Ref 8 style)
  const W = 800, H = 1000;
  
  // Cutout 4: Lakeside daytime profile (833x738)
  const cutout4 = await sharp(path.join(ASSET_DIR, 'cutout_4.png'))
    .resize(760, 674, { fit: 'inside' })
    .toBuffer();
  
  const cutoutMeta = await sharp(cutout4).metadata();
  const cLeft = Math.round((W - cutoutMeta.width) / 2);
  const cTop = H - cutoutMeta.height - 40;

  // Background SVG with panoramic visor band, elevation profile line, terracotta block, coordinate crosshairs
  const bgSvg = `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="#F6F2E9"/>
    
    <!-- Paper borders -->
    <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="#1A1815" stroke-width="1" stroke-opacity="0.3"/>
    <rect x="36" y="36" width="${W - 72}" height="${H - 72}" fill="none" stroke="#1A1815" stroke-width="0.5" stroke-opacity="0.15"/>

    <!-- Golden hour terracotta duo-tone graphic pillar behind (Ref 8/9 style) -->
    <rect x="80" y="140" width="240" height="420" fill="#C05B3C" fill-opacity="0.25"/>
    <rect x="80" y="140" width="240" height="420" fill="none" stroke="#C05B3C" stroke-width="1"/>

    <!-- Mountain elevation topological contour lines (Western Ghats) -->
    <g fill="none" stroke="#1A1815" stroke-width="0.75" stroke-opacity="0.3">
      <path d="M 40 380 Q 200 320 380 360 T 760 300"/>
      <path d="M 40 410 Q 220 350 400 390 T 760 330"/>
      <path d="M 40 440 Q 240 380 420 420 T 760 360"/>
      <path d="M 40 470 Q 260 410 440 450 T 760 390"/>
    </g>

    <!-- Panoramic Architectural Visor Band across the gaze line (Ref 7 style) -->
    <rect x="36" y="320" width="${W - 72}" height="90" fill="#1A1815" fill-opacity="0.08"/>
    <line x1="36" y1="320" x2="${W - 36}" y2="320" stroke="#C05B3C" stroke-width="1.2"/>
    <line x1="36" y1="410" x2="${W - 36}" y2="410" stroke="#C05B3C" stroke-width="1.2"/>
    
    <!-- Visor internal grid coordinates -->
    <line x1="200" y1="320" x2="200" y2="410" stroke="#1A1815" stroke-width="0.5" stroke-opacity="0.2"/>
    <line x1="360" y1="320" x2="360" y2="410" stroke="#1A1815" stroke-width="0.5" stroke-opacity="0.2"/>
    <line x1="520" y1="320" x2="520" y2="410" stroke="#1A1815" stroke-width="0.5" stroke-opacity="0.2"/>
    <line x1="680" y1="320" x2="680" y2="410" stroke="#1A1815" stroke-width="0.5" stroke-opacity="0.2"/>
    <text x="50" y="340" font-family="monospace" font-size="9" letter-spacing="1.5" fill="#C05B3C">HORIZON REF. PAWNA EL. +650m</text>
    <text x="50" y="398" font-family="monospace" font-size="9" letter-spacing="1.5" fill="#1A1815" fill-opacity="0.7">COORD: 18°42'30" N · 73°29'08" E</text>

    <!-- Top Plate Header -->
    <text x="${W/2}" y="62" font-family="monospace" font-size="10" letter-spacing="3" fill="#1A1815" fill-opacity="0.65" text-anchor="middle">
      FIG. 05 — THE HORIZON PROJECTION · PERSPECTIVE ANALYSIS
    </text>

    <!-- Bottom Plate Footer -->
    <text x="50" y="${H - 52}" font-family="monospace" font-size="10" letter-spacing="1.5" fill="#1A1815" fill-opacity="0.65">
      WESTERN GHATS · PUNE, IN
    </text>
    <text x="${W - 50}" y="${H - 52}" font-family="serif" font-size="13" font-style="italic" fill="#1A1815" fill-opacity="0.8" text-anchor="end">
      Nishant Unavane · Horizon Plate V
    </text>
  </svg>
  `;

  await sharp(Buffer.from(bgSvg))
    .composite([
      { input: cutout4, left: cLeft, top: cTop }
    ])
    .webp({ quality: 92 })
    .toFile(path.join(ASSET_DIR, 'plate-05-horizon.webp'));

  console.log('Plate 05 generated!');
}

async function run() {
  await buildPlate1();
  await buildPlate2();
  await buildPlate3();
  await buildPlate4();
  await buildPlate5();
  console.log('ALL 5 PLATES SUCCESSFULLY CREATED!');
}

run().catch(console.error);
