const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
if (!fs.existsSync(edgePath)) {
  console.error('Edge executable not found at:', edgePath);
  process.exit(1);
}

const baseDir = path.resolve(__dirname, '..', 'public', 'fb-assets', 'albums');
console.log('Converting album SVGs to 1080x1080 PNGs in:', baseDir);

for (let a = 1; a <= 7; a++) {
  const albumDir = path.join(baseDir, `album-${a}`);
  if (!fs.existsSync(albumDir)) continue;

  for (let p = 1; p <= 5; p++) {
    const svgFile = path.join(albumDir, `photo-${p}.svg`);
    const pngFile = path.join(albumDir, `photo-${p}.png`);
    const htmlFile = path.join(albumDir, `temp-${p}.html`);

    if (!fs.existsSync(svgFile)) continue;

    // Create a standalone HTML wrapper that renders the SVG full bleed at 1080x1080
    const svgContent = fs.readFileSync(svgFile, 'utf8');
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 1080px; height: 1080px; overflow: hidden; background: #ffffff; }
    svg { width: 1080px; height: 1080px; display: block; }
  </style>
</head>
<body>
${svgContent}
</body>
</html>`;

    fs.writeFileSync(htmlFile, htmlContent, 'utf8');

    const fileUri = 'file:///' + htmlFile.replace(/\\/g, '/');
    const args = [
      '--headless',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1080,1080',
      `--screenshot=${pngFile}`,
      fileUri
    ];

    const result = spawnSync(edgePath, args, { stdio: 'ignore' });
    
    // Clean up temporary HTML file
    if (fs.existsSync(htmlFile)) {
      fs.unlinkSync(htmlFile);
    }

    if (fs.existsSync(pngFile) && fs.statSync(pngFile).size > 0) {
      console.log(`✅ Album ${a} Photo ${p} -> PNG generated (${(fs.statSync(pngFile).size / 1024).toFixed(1)} KB)`);
    } else {
      console.error(`❌ Album ${a} Photo ${p} -> Failed`);
    }
  }
}

console.log('Conversion complete!');
