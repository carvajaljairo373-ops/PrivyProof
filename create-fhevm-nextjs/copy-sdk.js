const fs = require('fs-extra');
const path = require('path');

async function copySDK() {
  try {
    const sourceDir = path.join(__dirname, '../packages/fhevm-sdk/dist');
    const targetDir = path.join(__dirname, 'templates/nextjs-template/fhevm-sdk/dist');
    
    await fs.ensureDir(targetDir);
    await fs.copy(sourceDir, targetDir);
    
    console.log('✅ FHEVM SDK copied successfully!');
  } catch (error) {
    console.error('❌ Error copying SDK:', error);
  }
}

copySDK();
