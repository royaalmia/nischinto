const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const baseDir = path.resolve(__dirname, '..', 'public', 'fb-assets', 'albums');
console.log('Generating ZIP archives for each album in:', baseDir);

// 1. Generate individual album ZIP files
for (let a = 1; a <= 7; a++) {
  const albumDir = path.join(baseDir, `album-${a}`);
  const zipFile = path.join(albumDir, `album-${a}.zip`);
  if (fs.existsSync(zipFile)) {
    fs.unlinkSync(zipFile);
  }

  const psCmd = `powershell -Command "Compress-Archive -Path '${albumDir}\\*' -DestinationPath '${zipFile}' -Force"`;
  try {
    execSync(psCmd, { stdio: 'inherit' });
    console.log(`✅ Album ${a} ZIP created: ${zipFile} (${(fs.statSync(zipFile).size / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`❌ Album ${a} ZIP failed:`, err.message);
  }
}

// 2. Generate Master All-Albums ZIP
const allZip = path.join(baseDir, 'nishchinto-all-albums.zip');
if (fs.existsSync(allZip)) {
  fs.unlinkSync(allZip);
}

const masterCmd = `powershell -Command "Compress-Archive -Path '${baseDir}\\album-*' -DestinationPath '${allZip}' -Force"`;
try {
  execSync(masterCmd, { stdio: 'inherit' });
  console.log(`✅ Master All-Albums ZIP created: ${allZip} (${(fs.statSync(allZip).size / 1024).toFixed(1)} KB)`);
} catch (err) {
  console.error(`❌ Master ZIP failed:`, err.message);
}
