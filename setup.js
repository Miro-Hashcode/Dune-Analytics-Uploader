#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Directories to create
const directories = [
  'data',
  'logs'
];

// Create directories if they don't exist
directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
});

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('\n.env file not found. Let\'s create one.');
  
  rl.question('Enter your Dune Analytics API key: ', (apiKey) => {
    const envContent = `# Dune Analytics API Key\nDUNE_API_KEY=${apiKey}\n`;
    fs.writeFileSync(envPath, envContent);
    console.log('.env file created successfully.');
    
    console.log('\nSetup complete! You can now run the application:');
    console.log('- To run once: npm start -- --run-now --no-schedule');
    console.log('- To run as scheduled service: npm start');
    
    rl.close();
  });
} else {
  console.log('\n.env file already exists.');
  
  // Check if DUNE_API_KEY is set in .env
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (!envContent.includes('DUNE_API_KEY=') || envContent.includes('DUNE_API_KEY=your_dune_api_key_here')) {
    console.log('DUNE_API_KEY not properly set in .env file.');
    
    rl.question('Enter your Dune Analytics API key: ', (apiKey) => {
      const newEnvContent = envContent.replace(/DUNE_API_KEY=.*/, `DUNE_API_KEY=${apiKey}`);
      fs.writeFileSync(envPath, newEnvContent);
      console.log('.env file updated successfully.');
      
      console.log('\nSetup complete! You can now run the application:');
      console.log('- To run once: npm start -- --run-now --no-schedule');
      console.log('- To run as scheduled service: npm start');
      
      rl.close();
    });
  } else {
    console.log('DUNE_API_KEY is set in .env file.');
    
    console.log('\nSetup complete! You can now run the application:');
    console.log('- To run once: npm start -- --run-now --no-schedule');
    console.log('- To run as scheduled service: npm start');
    
    rl.close();
  }
}

// Handle SIGINT (Ctrl+C)
rl.on('SIGINT', () => {
  console.log('\nSetup cancelled.');
  rl.close();
  process.exit(0);
});
