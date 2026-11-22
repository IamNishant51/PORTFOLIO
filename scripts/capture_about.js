const { execSync } = require('child_process');
const path = require('path');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\nisha\\.gemini\\antigravity-cli\\brain\\54aed56f-8cad-47a5-b191-2b7c6b1da110';

const dOut = path.join(outDir, 'screenshot_about_desktop.png');
const mOut = path.join(outDir, 'screenshot_about_mobile.png');

try {
  execSync(`"${edge}" --headless --disable-gpu --window-size=1440,1200 "--screenshot=${dOut}" http://localhost:3001/about`);
  execSync(`"${edge}" --headless --disable-gpu --window-size=375,900 "--screenshot=${mOut}" http://localhost:3001/about`);
  console.log('Screenshots saved to brain directory successfully!');
} catch (err) {
  console.error('Error taking screenshot:', err);
}
