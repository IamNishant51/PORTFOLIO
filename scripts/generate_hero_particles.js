const sharp = require('sharp');
const fs = require('fs');

async function generateFinalParticles() {
  const w = 480;
  const h = 640;
  
  // Resize hero-portrait to 480x640
  const { data, info } = await sharp('public/assets/02-act1-arrival/hero-portrait.webp')
    .resize(w, h, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const alpha = new Float32Array(w * h);
  const gray = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    alpha[i] = data[i * 4 + 3] / 255;
    // Standard perceptual luminance
    gray[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  // Edge detection with Sobel operator
  const edges = new Float32Array(w * h);
  const isBoundary = new Uint8Array(w * h);

  for (let y = 2; y < h - 2; y++) {
    for (let x = 2; x < w - 2; x++) {
      const idx = y * w + x;
      const a = alpha[idx];
      if (a < 0.2) continue;

      // Check boundary of alpha
      if (
        alpha[idx - 2] < 0.1 || alpha[idx + 2] < 0.1 ||
        alpha[idx - w * 2] < 0.1 || alpha[idx + w * 2] < 0.1
      ) {
        isBoundary[idx] = 1;
      }

      const gx =
        -gray[idx - w - 1] - 2 * gray[idx - 1] - gray[idx + w - 1] +
         gray[idx - w + 1] + 2 * gray[idx + 1] + gray[idx + w + 1];
      const gy =
        -gray[idx - w - 1] - 2 * gray[idx - w] - gray[idx - w + 1] +
         gray[idx + w - 1] + 2 * gray[idx + w] + gray[idx + w + 1];
      edges[idx] = Math.sqrt(gx * gx + gy * gy);
    }
  }

  // We want ~14,000 particles
  const particles = [];
  const targetCount = 14200;
  let attempts = 0;
  const maxAttempts = 2000000;

  // Track density to prevent over-clustering on flat bright areas
  const gridCellSize = 6;
  const gridW = Math.ceil(w / gridCellSize);
  const gridH = Math.ceil(h / gridCellSize);
  const densityGrid = new Uint16Array(gridW * gridH);

  while (particles.length < targetCount && attempts < maxAttempts) {
    attempts++;
    const x = Math.random() * (w - 6) + 3;
    const y = Math.random() * (h - 6) + 3;
    const fx = Math.floor(x);
    const fy = Math.floor(y);
    const idx = fy * w + fx;

    const a = alpha[idx];
    if (a < 0.25) continue;

    const bnd = isBoundary[idx];
    const edge = edges[idx];
    const lum = gray[idx];

    const gx = Math.floor(x / gridCellSize);
    const gy = Math.floor(y / gridCellSize);
    const cellIdx = gy * gridW + gx;
    const currentDensity = densityGrid[cellIdx];

    // Cap density per cell so bright cheeks don't become solid blobs
    const maxDensityForCell = bnd ? 18 : (edge > 0.25 ? 16 : 9);
    if (currentDensity >= maxDensityForCell) continue;

    let prob = 0.12; // base interior stipple
    if (bnd) {
      prob = 0.92;
    } else if (edge > 0.2) {
      // Facial features: eyes, nose, lips, beard, hair curls
      prob = 0.5 + edge * 0.45;
    } else if (lum > 0.6) {
      // White shirt collar
      prob = 0.4;
    } else if (lum > 0.3) {
      // Skin tone
      prob = 0.3;
    } else {
      // Dark suit / hair body
      prob = 0.18;
    }

    if (Math.random() < prob) {
      densityGrid[cellIdx]++;

      // 3D cylindrical & anatomical depth approximation
      // Center of face pushes forward in +Z, ears and hair wrap around in -Z
      const cx = (x - w / 2) / (w * 0.42);
      const cy = (y - (h * 0.38)) / (h * 0.45); // facial center
      const radial = Math.max(0, 1 - cx * cx * 0.7 - cy * cy * 0.35);
      
      // Nose bridge / face protrusion
      let z = Math.sqrt(radial) * 38;
      // High edge in facial region (eyes, nose, mouth) gets subtle relief
      if (edge > 0.2 && y < h * 0.6) {
        z += (edge * 6);
      }
      // White collar pushes slightly forward
      if (lum > 0.65 && y > h * 0.6) {
        z += 10;
      }
      z -= 20;

      // Color computation:
      // Base: warm paper cream #F6F2E9 (r:246, g:242, b:233)
      // Highlight: pure warm ivory (r:255, g:252, b:248)
      // Feature accent / edge: subtle terracotta warmth for high-contrast edges!
      let pr = 246;
      let pg = 242;
      let pb = 233;

      if (lum > 0.75) {
        pr = 255; pg = 253; pb = 249;
      } else if (bnd || edge > 0.35) {
        // Subtle warm glow on sharp edges
        pr = 248; pg = 240; pb = 228;
      } else if (lum < 0.25) {
        // Deep tones slightly muted for rich depth
        pr = 210; pg = 205; pb = 196;
      }

      particles.push({
        x: Number((x - w / 2).toFixed(1)),
        y: Number((h / 2 - y).toFixed(1)),
        z: Number(z.toFixed(1)),
        lum: Number(lum.toFixed(2)),
        edge: Number(edge.toFixed(2)),
        bnd: bnd,
        r: pr,
        g: pg,
        b: pb,
        size: Number((bnd ? 1.6 : (0.9 + lum * 1.2 + (edge > 0.2 ? 0.3 : 0))).toFixed(1)),
        alpha: Number((bnd ? 0.95 : (0.4 + lum * 0.5 + (edge > 0.2 ? 0.25 : 0))).toFixed(2))
      });
    }
  }

  console.log(`Generated final ${particles.length} organic particles in ${attempts} attempts`);
  fs.writeFileSync('public/assets/02-act1-arrival/hero-particles-data.json', JSON.stringify(particles));

  // Render high-res SVG check
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-240 -320 480 640" width="960" height="1280" style="background:#1A1815">`;
  for (const p of particles) {
    svg += `<circle cx="${p.x}" cy="${-p.y}" r="${p.size}" fill="rgb(${p.r},${p.g},${p.b})" opacity="${p.alpha}"/>`;
  }
  svg += '</svg>';
  await sharp(Buffer.from(svg)).png().toFile('test_final_particles.png');
  console.log('Saved test_final_particles.png');
}

generateFinalParticles().catch(console.error);
