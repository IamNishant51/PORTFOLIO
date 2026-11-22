const sharp = require('sharp');
const fs = require('fs');

async function processBoth() {
  // 1. Process hero-portrait.webp
  // Resize to 360x480 for precise sampling
  const w = 360;
  const h = 480;
  const { data: pData } = await sharp('public/assets/02-act1-arrival/hero-portrait.webp')
    .resize(w, h, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const nishantParticles = [];
  // Calculate luminance and edges
  const step = 2.2;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const fx = Math.floor(x);
      const fy = Math.floor(y);
      const idx = (fy * w + fx) * 4;
      const alpha = pData[idx + 3] / 255;
      if (alpha < 0.25) continue;

      const r = pData[idx];
      const g = pData[idx + 1];
      const b = pData[idx + 2];
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      // Probability of point: keep silhouette crisp and features detailed
      // Check if near edge of alpha
      const isEdge = (
        fx <= 2 || fx >= w - 3 || fy <= 2 || fy >= h - 3 ||
        pData[idx - 8 + 3] < 50 || pData[idx + 8 + 3] < 50 ||
        pData[((fy - 2) * w + fx) * 4 + 3] < 50 || pData[((fy + 2) * w + fx) * 4 + 3] < 50
      );

      let keep = false;
      if (isEdge) {
        keep = Math.random() < 0.9;
      } else if (lum > 0.4) {
        // bright face/collar
        keep = Math.random() < 0.75;
      } else if (lum > 0.15) {
        // midtones
        keep = Math.random() < 0.55;
      } else {
        // dark suit/hair
        keep = Math.random() < 0.4;
      }

      if (keep) {
        // 3D depth estimation based on facial luminance and radial distance
        const cx = (x - w / 2) / (w / 2);
        const cy = (y - h / 2) / (h / 2);
        // Center of face pushes forward, edges curve back in a cylinder/sphere profile
        const zCurvature = Math.sqrt(Math.max(0, 1 - cx * cx * 0.7 - cy * cy * 0.5));
        const z = (zCurvature * 30 + lum * 15 - 20);

        nishantParticles.push({
          x: Number((x - w / 2).toFixed(1)),
          y: Number((h / 2 - y).toFixed(1)), // invert Y for Three.js
          z: Number(z.toFixed(1)),
          lum: Number(lum.toFixed(2)),
          r: r,
          g: g,
          b: b,
          isEdge: isEdge ? 1 : 0
        });
      }
    }
  }

  console.log('Nishant portrait particles count:', nishantParticles.length);
  fs.writeFileSync('public/assets/02-act1-arrival/portrait-particles.json', JSON.stringify(nishantParticles));

  // 2. Process uploaded_media_1795328053062.jpg
  const { data: uData, info: uInfo } = await sharp('C:/Users/nisha/.gemini/antigravity-cli/brain/54aed56f-8cad-47a5-b191-2b7c6b1da110/.user_uploaded/uploaded_media_1795328053062.jpg')
    .resize(360, 374)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const uploadedParticles = [];
  const uw = uInfo.width;
  const uh = uInfo.height;
  for (let y = 0; y < uh; y += 1.8) {
    for (let x = 0; x < uw; x += 1.8) {
      const fx = Math.floor(x);
      const fy = Math.floor(y);
      const idx = (fy * uw + fx) * 3;
      const r = uData[idx];
      const g = uData[idx + 1];
      const b = uData[idx + 2];
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      if (lum > 0.22) {
        const cx = (x - uw / 2) / (uw / 2);
        const cy = (y - uh / 2) / (uh / 2);
        const zCurvature = Math.sqrt(Math.max(0, 1 - cx * cx * 0.8 - cy * cy * 0.6));
        const z = (zCurvature * 25 + lum * 10 - 15);
        uploadedParticles.push({
          x: Number((x - uw / 2).toFixed(1)),
          y: Number((uh / 2 - y).toFixed(1)),
          z: Number(z.toFixed(1)),
          lum: Number(lum.toFixed(2)),
          r: 246, // warm cream/paper
          g: 242,
          b: 233,
        });
      }
    }
  }
  console.log('Uploaded screenshot particles count:', uploadedParticles.length);
  fs.writeFileSync('public/assets/02-act1-arrival/uploaded-particles.json', JSON.stringify(uploadedParticles));
}

processBoth().catch(console.error);
