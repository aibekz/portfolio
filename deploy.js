#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting automated deployment...\n');

// Helper function to run commands
function runCommand(command, description) {
  console.log(`📋 ${description}...`);
  try {
    const output = execSync(command, { encoding: 'utf8', stdio: 'inherit' });
    console.log(`✅ ${description} completed\n`);
    return output;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    process.exit(1);
  }
}

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Please run this script from the project root directory');
  process.exit(1);
}

// Step 1: Build the frontend
runCommand('npm run build', 'Building frontend');

// Step 2: Deploy to Netlify using drag & drop
console.log('📋 Preparing Netlify deployment...');
console.log('🔗 Please follow these steps to complete deployment:');
console.log('');
console.log('1. Go to https://app.netlify.com/drop');
console.log('2. Drag and drop the "dist" folder to deploy');
console.log('3. Once deployed, note your site URL');
console.log('4. Set environment variables in Netlify dashboard:');
console.log('   - VITE_API_BASE_URL=https://your-backend-url.onrender.com/api');
console.log('   - VITE_ADMIN_PASSWORD=your_admin_password');
console.log('   - VITE_APP_NAME=aibekz');
console.log('   - VITE_APP_VERSION=1.0.0');
console.log('');

// Step 3: Instructions for backend deployment
console.log('📋 Backend deployment instructions:');
console.log('');
console.log('1. Go to https://dashboard.render.com/');
console.log('2. Click "New +" → "Web Service"');
console.log('3. Connect your GitHub repository');
console.log('4. Configure:');
console.log('   - Name: aibekz-backend');
console.log('   - Environment: Node');
console.log('   - Root Directory: backend');
console.log('   - Build Command: npm install');
console.log('   - Start Command: npm start');
console.log('5. Set environment variables:');
console.log('   - NODE_ENV=production');
console.log('   - MONGODB_URI=your_mongodb_connection_string');
console.log('   - JWT_SECRET=your_32_character_secret');
console.log('   - ADMIN_PASSWORD=your_admin_password');
console.log('');

// Step 4: MongoDB setup
console.log('📋 MongoDB Atlas setup:');
console.log('');
console.log('1. Go to https://www.mongodb.com/atlas');
console.log('2. Create a free cluster');
console.log('3. Create a database user');
console.log('4. Whitelist all IP addresses (0.0.0.0/0)');
console.log('5. Get your connection string');
console.log('');

console.log('✅ Build completed! Your dist folder is ready for deployment.');
console.log('📁 You can find the built files in the "dist" directory.');
console.log('');
console.log('🎉 Follow the instructions above to complete your deployment!');
