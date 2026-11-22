const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const tempDir = os.tmpdir();
const deskPath = path.join(tempDir, 'screenshot_desktop.png');
const mobPath = path.join(tempDir, 'screenshot_mobile.png');
const userData = path.join(tempDir, 'edge_headless_user');

try {
  console.log('Capturing desktop...');
  execSync(`"${edgePath}" --headless --disable-gpu --user-data-dir="${userData}" --window-size=1440,900 --virtual-time-budget=2500 --screenshot="${deskPath}" http://localhost:3001`);
  fs.copyFileSync(deskPath, 'screenshot_desktop.png');
  fs.copyFileSync(deskPath, 'C:/Users/nisha/.gemini/antigravity-cli/brain/54aed56f-8cad-47a5-b191-2b7c6b1da110/screenshot_desktop.png');
  console.log('Desktop copied successfully');

  console.log('Capturing mobile...');
  execSync(`"${edgePath}" --headless --disable-gpu --user-data-dir="${userData}" --window-size=375,812 --virtual-time-budget=2500 --screenshot="${mobPath}" http://localhost:3001`);
  fs.copyFileSync(mobPath, 'screenshot_mobile.png');
  fs.copyFileSync(mobPath, 'C:/Users/nisha/.gemini/antigravity-cli/brain/54aed56f-8cad-47a5-b191-2b7c6b1da110/screenshot_mobile.png');
  console.log('Mobile copied successfully');
} catch (e) {
  console.error(e.message);
}
