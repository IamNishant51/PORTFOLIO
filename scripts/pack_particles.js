const fs = require('fs');

function packBinary() {
  const particles = JSON.parse(fs.readFileSync('public/assets/02-act1-arrival/hero-particles-data.json', 'utf8'));
  const count = particles.length;
  console.log('Packing', count, 'particles...');

  // 16 bytes per particle:
  // float32 x (4)
  // float32 y (4)
  // float32 z (4)
  // uint8 r (1)
  // uint8 g (1)
  // uint8 b (1)
  // uint8 size (1) (stored as size * 10)
  // uint8 alpha (1) (stored as alpha * 100)
  // uint8 padding (3) for 4-byte alignment => 20 bytes total
  const buffer = new ArrayBuffer(count * 20);
  const dataView = new DataView(buffer);

  for (let i = 0; i < count; i++) {
    const p = particles[i];
    const offset = i * 20;
    dataView.setFloat32(offset, p.x, true);
    dataView.setFloat32(offset + 4, p.y, true);
    dataView.setFloat32(offset + 8, p.z, true);
    dataView.setUint8(offset + 12, p.r);
    dataView.setUint8(offset + 13, p.g);
    dataView.setUint8(offset + 14, p.b);
    dataView.setUint8(offset + 15, Math.round(p.size * 10));
    dataView.setUint8(offset + 16, Math.round(p.alpha * 100));
  }

  fs.writeFileSync('public/assets/02-act1-arrival/hero-particles.bin', Buffer.from(buffer));
  console.log('Wrote public/assets/02-act1-arrival/hero-particles.bin:', buffer.byteLength, 'bytes (', (buffer.byteLength / 1024).toFixed(1), 'KB )');
}

packBinary();
