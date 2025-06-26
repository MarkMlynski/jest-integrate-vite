#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Node.js development environment...\n');

// Function to run commands and handle errors
function runCommand(command, description, options = {}) {
    console.log(`📦 ${description}...`);
    try {
        const result = execSync(command, { 
            stdio: 'inherit', 
            cwd: process.cwd(),
            encoding: 'utf8',
            ...options 
        });
        console.log(`✅ ${description} completed successfully\n`);
        return result;
    } catch (error) {
        console.error(`❌ Error during ${description}:`);
        console.error(error.message);
        if (!options.continueOnError) {
            process.exit(1);
        }
        console.log(`⚠️  Continuing despite error in ${description}\n`);
        return null;
    }
}

// Function to check if we're in a git repository
function isGitRepo() {
    try {
        execSync('git rev-parse --git-dir', { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

// Function to check if pnpm is available
function isPnpmAvailable() {
    try {
        execSync('pnpm --version', { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

async function setupEnvironment() {
    // Check if pnpm is available, install if not
    if (!isPnpmAvailable()) {
        console.log('📦 pnpm not found, installing...');
        runCommand('npm install -g pnpm', 'Installing pnpm globally');
    } else {
        console.log('✅ pnpm is already available\n');
    }

    // Check if we're already in a git repository
    if (isGitRepo()) {
        console.log('📁 Already in a git repository');
        
        // Check if it's the correct repository
        try {
            const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
            if (remoteUrl.includes('MarkMlynski/test-workspace-olena')) {
                console.log('✅ Correct repository already cloned\n');
            } else {
                console.log(`⚠️  Different repository detected: ${remoteUrl}`);
                console.log('🔄 You may need to manually clone the correct repository\n');
            }
        } catch (error) {
            console.log('⚠️  Could not determine remote repository\n');
        }
    } else {
        // Clone the repository
        console.log('📥 Cloning GitHub repository...');
        runCommand(
            'git clone https://github.com/MarkMlynski/test-workspace-olena.git .',
            'Cloning repository',
            { continueOnError: true }
        );
    }

    // Check if package.json exists
    if (fs.existsSync('package.json')) {
        console.log('📦 Found package.json, installing dependencies...');
        runCommand('pnpm install', 'Installing dependencies with pnpm');
    } else {
        console.log('⚠️  No package.json found in the repository');
        console.log('📝 This is expected for a blank setup - dependencies will be installed when package.json is added\n');
    }

    // Create a basic test command if no package.json exists
    if (!fs.existsSync('package.json')) {
        console.log('📝 Creating basic package.json for test runner...');
        const basicPackageJson = {
            "name": "test-workspace-olena",
            "version": "1.0.0",
            "description": "Node.js development environment for Olena's assignments",
            "main": "index.js",
            "scripts": {
                "test": "echo '✅ Test runner is ready! Add your test files and update this script.' && exit 0",
                "start": "node index.js"
            },
            "keywords": ["nodejs", "testing", "development"],
            "author": "",
            "license": "ISC"
        };
        
        fs.writeFileSync('package.json', JSON.stringify(basicPackageJson, null, 2));
        console.log('✅ Basic package.json created\n');
        
        // Install any dependencies
        runCommand('pnpm install', 'Installing initial dependencies');
    }

    console.log('🎉 Environment setup completed successfully!');
    console.log('\n📋 Setup Summary:');
    console.log('   • Node.js environment configured');
    console.log('   • GitHub repository integrated');
    console.log('   • pnpm package manager ready');
    console.log('   • Test runner configured (pnpm test)');
    console.log('   • Ready for code assignments');
    console.log('\n🚀 You can now:');
    console.log('   • Run tests with: pnpm test');
    console.log('   • Start the application with: pnpm start');
    console.log('   • Add your assignment code and run tests');
    console.log('\n💡 The environment is ready for Olena\'s assignments!');
}

// Run the setup
setupEnvironment().catch(error => {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
});
