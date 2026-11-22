const { execSync } = require('child_process');
const path = require('path');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\nisha\\.gemini\\antigravity-cli\\brain\\54aed56f-8cad-47a5-b191-2b7c6b1da110';

const pOut = path.join(outDir, 'screenshot_preloader.png');

try {
  // Capture screenshot of root on fresh load
  execSync(`"${edge}" --headless --disable-gpu --window-size=1440,900 "--screenshot=${pOut}" http://localhost:3001/`);
  console.log('Preloader screenshot captured successfully!');
} catch (err) {
  console.error('Error capturing preloader screenshot:', err);
}
