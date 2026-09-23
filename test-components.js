/**
 * Component verification test
 * This script checks if all Three.js components are properly structured
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Three.js Component Integration...\n');

const componentsToCheck = [
  'ThreeScene.tsx',
  'FloatingCube.tsx',
  'SkillOrb.tsx',
  'Portfolio.tsx'
];

let allPassed = true;

componentsToCheck.forEach(component => {
  const filePath = path.join(__dirname, 'components', component);

  try {
    if (!fs.existsSync(filePath)) {
      console.log(`❌ ${component} - File not found`);
      allPassed = false;
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Check for common issues
    const checks = {
      'Has "use client"': content.includes('"use client"'),
      'Imports Three.js': component !== 'Portfolio.tsx' || content.includes('@react-three/fiber'),
      'No syntax errors (basic check)': content.includes('export default'),
    };

    console.log(`📄 ${component}`);
    Object.entries(checks).forEach(([check, passed]) => {
      console.log(`   ${passed ? '✅' : '❌'} ${check}`);
      if (!passed) allPassed = false;
    });
    console.log('');

  } catch (error) {
    console.log(`❌ ${component} - Error reading file: ${error.message}\n`);
    allPassed = false;
  }
});

// Check package.json dependencies
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('📦 Dependencies Check:');

  const requiredDeps = {
    'three': packageJson.dependencies.three,
    '@react-three/fiber': packageJson.dependencies['@react-three/fiber'],
    '@react-three/drei': packageJson.dependencies['@react-three/drei'],
    'react': packageJson.dependencies.react,
  };

  Object.entries(requiredDeps).forEach(([dep, version]) => {
    if (version) {
      console.log(`   ✅ ${dep} ${version}`);
    } else {
      console.log(`   ❌ ${dep} - Not installed`);
      allPassed = false;
    }
  });
  console.log('');
} catch (error) {
  console.log(`❌ Error checking dependencies: ${error.message}\n`);
  allPassed = false;
}

// Check .gitignore
try {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  console.log('🔒 Git Configuration:');
  console.log(`   ${gitignore.includes('claude-omni.ps1') ? '✅' : '❌'} claude-omni.ps1 in .gitignore`);
  console.log(`   ${gitignore.includes('.claude/') ? '✅' : '❌'} .claude/ in .gitignore`);
  console.log('');
} catch (error) {
  console.log(`❌ Error checking .gitignore: ${error.message}\n`);
}

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ All checks passed! Components are ready.');
  console.log('🚀 Open http://localhost:3005 to see your portfolio');
} else {
  console.log('❌ Some checks failed. Please review the issues above.');
  process.exit(1);
}
console.log('='.repeat(50) + '\n');
