# Node.js Development Environment

A clean Node.js development environment integrated with GitHub repository `MarkMlynski/test-workspace-olena`, configured for Replit with pnpm package management and test runner setup.

## 🚀 Quick Start

This environment is designed to be ready-to-use for development assignments. The setup process will automatically:

1. Clone the GitHub repository
2. Install pnpm package manager
3. Install project dependencies
4. Configure the test runner

### First Time Setup

1. Click the "Run" button in Replit, or run:
   ```bash
   node setup.js
   ```

2. The setup script will:
   - Install pnpm if not available
   - Clone the repository (if not already present)
   - Install dependencies using `pnpm install`
   - Create a basic package.json if none exists

## 📋 Available Commands

### Test Runner
```bash
pnpm test
