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
} catch (err) {
  console.warn('⚠️ Warning during opennext patch:', err.message);
}
