# NPX Package Design for FHEVM NextJS Starter

## 🎯 **Package Concept**
Create `npx create-fhevm-nextjs` that generates a complete NextJS project with FHEVM SDK integration.

## 📦 **Package Structure**

```
create-fhevm-nextjs/
├── package.json                    # NPX package configuration
├── bin/
│   └── create-fhevm-nextjs.js     # Main CLI script
├── templates/
│   ├── nextjs-template/           # Complete NextJS project template
│   │   ├── app/
│   │   │   ├── layout.tsx         # With CDN script + FhevmProvider
│   │   │   ├── page.tsx           # Showcase component
│   │   │   └── providers/
│   │   │       └── FhevmProvider.tsx
│   │   ├── types/
│   │   │   ├── cdn.d.ts           # CDN type declarations
│   │   │   └── ethereum.d.ts      # Ethereum types
│   │   ├── next.config.js         # Transpile configuration
│   │   ├── package.json           # Dependencies
│   │   ├── tailwind.config.js     # Styling
│   │   └── tsconfig.json          # TypeScript config
│   └── fhevm-sdk/                 # Bundled FHEVM SDK
│       ├── dist/                  # Built SDK files
│       ├── package.json           # SDK package.json
│       └── src/                   # SDK source (optional)
└── README.md                      # Package documentation
```

## 🚀 **User Experience Flow**

### **1. Installation Command:**
```bash
npx create-fhevm-nextjs my-fhevm-app
cd my-fhevm-app
npm install
npm run dev
```

### **2. What Users Get:**
- ✅ **Complete NextJS project** with FHEVM integration
- ✅ **Pre-configured FHEVM SDK** (no workspace dependencies)
- ✅ **CDN relayer setup** with proper TypeScript types
- ✅ **Example components** showing FHEVM operations
- ✅ **Tailwind CSS** for styling
- ✅ **TypeScript support** out of the box
- ✅ **Ready to deploy** configuration

## 🏗️ **Technical Implementation**

### **1. NPX Package Configuration (`package.json`):**
```json
{
  "name": "create-fhevm-nextjs",
  "version": "1.0.0",
  "description": "Create a NextJS app with FHEVM SDK integration",
  "bin": {
    "create-fhevm-nextjs": "./bin/create-fhevm-nextjs.js"
  },
  "files": [
    "bin/",
    "templates/",
    "README.md"
  ],
  "dependencies": {
    "chalk": "^4.1.2",
    "inquirer": "^8.2.0",
    "fs-extra": "^10.1.0"
  }
}
```

### **2. CLI Script (`bin/create-fhevm-nextjs.js`):**
```javascript
#!/usr/bin/env node

const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');

async function createFhevmNextjs() {
  console.log(chalk.blue('🚀 Creating FHEVM NextJS app...'));
  
  // Get project name
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      default: 'my-fhevm-app'
    }
  ]);
  
  // Copy template
  const templatePath = path.join(__dirname, '../templates/nextjs-template');
  const targetPath = path.resolve(projectName);
  
  await fs.copy(templatePath, targetPath);
  
  // Update package.json with project name
  const packageJsonPath = path.join(targetPath, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  packageJson.name = projectName;
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  
  console.log(chalk.green('✅ FHEVM NextJS app created successfully!'));
  console.log(chalk.yellow('📝 Next steps:'));
  console.log(`   cd ${projectName}`);
  console.log('   npm install');
  console.log('   npm run dev');
}

createFhevmNextjs().catch(console.error);
```

### **3. Template Structure (`templates/nextjs-template/`):**

#### **Package.json:**
```json
{
  "name": "my-fhevm-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@fhevm-sdk": "file:./fhevm-sdk",
    "@zama-fhe/relayer-sdk": "^0.2.0",
    "ethers": "^6.13.7",
    "next": "15.0.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.21",
    "eslint": "^8",
    "eslint-config-next": "15.0.3",
    "postcss": "^8.5.6",
    "tailwindcss": "3.4.0",
    "typescript": "^5"
  }
}
```

#### **Next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@fhevm-sdk'],
  experimental: {
    esmExternals: 'loose'
  }
}

module.exports = nextConfig
```

#### **Layout.tsx:**
```tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import { FhevmProvider } from './providers/FhevmProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'FHEVM NextJS App',
  description: 'NextJS app with FHEVM SDK integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://cdn.zama.ai/relayer-sdk-js/0.2.0/relayer-sdk-js.umd.cjs"
          strategy="beforeInteractive"
        />
        <FhevmProvider>
          {children}
        </FhevmProvider>
      </body>
    </html>
  )
}
```

## 🎯 **Key Features of the NPX Package**

### **1. Self-Contained:**
- ✅ **Bundled FHEVM SDK** - No workspace dependencies
- ✅ **CDN relayer setup** - Automatic script injection
- ✅ **TypeScript types** - Full type safety
- ✅ **Example components** - Ready-to-use FHEVM operations

### **2. Developer Experience:**
- ✅ **One command setup** - `npx create-fhevm-nextjs`
- ✅ **No configuration needed** - Works out of the box
- ✅ **Clear documentation** - README with examples
- ✅ **Hot reloading** - Development-friendly

### **3. Production Ready:**
- ✅ **Build optimization** - NextJS best practices
- ✅ **Deployment ready** - Railway/Vercel compatible
- ✅ **Error handling** - Proper error boundaries
- ✅ **Responsive design** - Tailwind CSS included

## 🚀 **Implementation Plan**

### **Phase 1: Create NPX Package Structure**
1. Create `create-fhevm-nextjs` directory
2. Set up package.json with NPX configuration
3. Create CLI script for project generation
4. Build template structure

### **Phase 2: Bundle FHEVM SDK**
1. Copy current FHEVM SDK to template
2. Build SDK for distribution
3. Update package.json references
4. Test SDK integration

### **Phase 3: Create NextJS Template**
1. Copy current NextJS showcase
2. Remove workspace dependencies
3. Update imports to use bundled SDK
4. Add example components
5. Create comprehensive README

### **Phase 4: Testing & Publishing**
1. Test NPX package locally
2. Test generated project
3. Publish to npm
4. Create documentation

## 📝 **User Documentation**

### **Quick Start:**
```bash
# Create new FHEVM NextJS app
npx create-fhevm-nextjs my-app

# Navigate to project
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### **What You Get:**
- Complete NextJS project with FHEVM integration
- Pre-configured CDN relayer
- Example FHEVM operations
- TypeScript support
- Tailwind CSS styling
- Ready for deployment

This design ensures users get a complete, working FHEVM NextJS application with zero configuration needed!
