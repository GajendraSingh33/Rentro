#!/bin/bash

# Rentro Project Setup Script
# This script initializes the Rentro development environment

set -e

echo "🚀 Setting up Rentro - PG Accommodation Platform"
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check prerequisites
echo -e "\n${BLUE}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi
echo "✓ Node.js version: $(node -v)"

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi
echo "✓ npm version: $(npm -v)"

if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. You can still develop without Docker."
else
    echo "✓ Docker is installed"
fi

# Step 2: Install root dependencies
echo -e "\n${BLUE}Installing root dependencies...${NC}"
npm install

# Step 3: Create environment files
echo -e "\n${BLUE}Creating environment files...${NC}"

if [ ! -f "apps/frontend/.env.local" ]; then
    cp apps/frontend/.env.example apps/frontend/.env.local
    echo "✓ Created apps/frontend/.env.local"
else
    echo "ℹ️  apps/frontend/.env.local already exists"
fi

if [ ! -f "apps/backend/.env" ]; then
    cp apps/backend/.env.example apps/backend/.env
    echo "✓ Created apps/backend/.env"
else
    echo "ℹ️  apps/backend/.env already exists"
fi

# Step 4: Print next steps
echo -e "\n${GREEN}✅ Setup complete!${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Update environment variables if needed:"
echo "   - apps/frontend/.env.local"
echo "   - apps/backend/.env"
echo ""
echo "2. Start services with Docker Compose:"
echo "   ${BLUE}docker-compose up${NC}"
echo ""
echo "3. In another terminal, start development servers:"
echo "   ${BLUE}npm run dev${NC}"
echo ""
echo "4. Access the application:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:3001/api"
echo "   - Backend Health: http://localhost:3001/api/health"
echo ""
echo "5. View available commands:"
echo "   ${BLUE}npm run${NC}"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
