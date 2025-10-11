const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

async function testPackage() {
  try {
    console.log('🧪 Testing NPX package...');
    
    // Test 1: Check if all required files exist
    const requiredFiles = [
      'package.json',
      'bin/create-fhevm-nextjs.js',
      'templates/nextjs-template/package.json',
      'templates/nextjs-template/app/layout.tsx',
      'templates/nextjs-template/app/page.tsx',
      'templates/nextjs-template/fhevm-sdk/package.json'
    ];
    
    for (const file of requiredFiles) {
      const filePath = path.join(__dirname, file);
      if (!await fs.pathExists(filePath)) {
        throw new Error(`Missing required file: ${file}`);
      }
    }
    
    console.log('✅ All required files exist');
    
    // Test 2: Check if FHEVM SDK dist files exist
    const sdkDistPath = path.join(__dirname, 'templates/nextjs-template/fhevm-sdk/dist');
    if (!await fs.pathExists(sdkDistPath)) {
      throw new Error('FHEVM SDK dist files not found');
    }
    
    console.log('✅ FHEVM SDK dist files exist');
    
    // Test 3: Validate package.json structure
    const packageJson = await fs.readJson(path.join(__dirname, 'package.json'));
    if (!packageJson.bin || !packageJson.bin['create-fhevm-nextjs']) {
      throw new Error('Invalid package.json bin configuration');
    }
    
    console.log('✅ Package.json configuration valid');
    
    // Test 4: Validate template package.json
    const templatePackageJson = await fs.readJson(path.join(__dirname, 'templates/nextjs-template/package.json'));
    if (!templatePackageJson.dependencies['@fhevm-sdk'] || 
        templatePackageJson.dependencies['@fhevm-sdk'] !== 'file:./fhevm-sdk') {
      throw new Error('Invalid template package.json configuration');
    }
    
    console.log('✅ Template package.json configuration valid');
    
    console.log('🎉 NPX package test passed!');
    console.log('');
    console.log('📦 Package is ready for publishing!');
    console.log('');
    console.log('🚀 To test locally:');
    console.log('   cd create-fhevm-nextjs');
    console.log('   npm link');
    console.log('   npx create-fhevm-nextjs test-app');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testPackage();
