const fs = require('fs');
const path = require('path');

try {
  // 1. Patch opennextjs-cloudflare build.js to enable dangerouslyUseUnsupportedNextVersion by default
  const buildCmdPath = path.join(__dirname, '..', 'node_modules', '@opennextjs', 'cloudflare', 'dist', 'cli', 'commands', 'build.js');
  if (fs.existsSync(buildCmdPath)) {
    let content = fs.readFileSync(buildCmdPath, 'utf8');
    if (content.includes('dangerouslyUseUnsupportedNextVersion')) {
      content = content.replace(
        /\.option\("dangerouslyUseUnsupportedNextVersion",\s*\{\s*type:\s*"boolean",\s*default:\s*false/g,
        '.option("dangerouslyUseUnsupportedNextVersion", { type: "boolean", default: true'
      );
      fs.writeFileSync(buildCmdPath, content, 'utf8');
      console.log('✅ Patched @opennextjs/cloudflare build.js (dangerouslyUseUnsupportedNextVersion=true)');
    }
  }

  // 2. Patch @opennextjs/aws helper.js so Next 14 is always considered supported
  const awsHelperPath = path.join(__dirname, '..', 'node_modules', '@opennextjs', 'aws', 'dist', 'build', 'helper.js');
  if (fs.existsSync(awsHelperPath)) {
    let content = fs.readFileSync(awsHelperPath, 'utf8');
    if (content.includes('checkNextVersionSupport')) {
      content = content.replace(
        /if \(!isSupported\) \{/g,
        'if (false && !isSupported) {'
      );
      fs.writeFileSync(awsHelperPath, content, 'utf8');
      console.log('✅ Patched @opennextjs/aws helper.js (checkNextVersionSupport bypassed)');
    }
  }

  // 3. Patch wrangler bin so it never fails on Cloudflare CI environments running Node 20
  const wranglerBinPath = path.join(__dirname, '..', 'node_modules', 'wrangler', 'bin', 'wrangler.js');
  if (fs.existsSync(wranglerBinPath)) {
    let content = fs.readFileSync(wranglerBinPath, 'utf8');
    if (content.includes('MIN_NODE_VERSION = "22.12.0"')) {
      content = content.replace('MIN_NODE_VERSION = "22.12.0"', 'MIN_NODE_VERSION = "18.0.0"');
      fs.writeFileSync(wranglerBinPath, content, 'utf8');
      console.log('✅ Patched wrangler bin (MIN_NODE_VERSION lowered to 18.0.0 for Cloudflare CI compatibility)');
    }
  }
} catch (err) {
  console.warn('⚠️ Warning during opennext patch:', err.message);
}
