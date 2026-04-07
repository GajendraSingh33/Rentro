#!/bin/bash
# Rentro - Automated Setup Script
# This script automates database setup and migrations

set -e  # Exit on error

echo "🚀 Rentro - Automated Setup Script"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is available
check_docker() {
    if command -v docker &> /dev/null; then
        echo -e "${GREEN}✓${NC} Docker found"
        return 0
    else
        echo -e "${YELLOW}⚠${NC} Docker not found"
        return 1
    fi
}

# Check if PostgreSQL is available via Homebrew
check_postgres() {
    if command -v psql &> /dev/null; then
        echo -e "${GREEN}✓${NC} PostgreSQL found"
        return 0
    else
        echo -e "${YELLOW}⚠${NC} PostgreSQL not found"
        return 1
    fi
}

# Start Docker services
start_docker_services() {
    echo ""
    echo "📦 Starting Docker services..."
    if docker compose up -d postgres redis; then
        echo -e "${GREEN}✓${NC} Docker services started"
        sleep 5  # Wait for services to be ready
        return 0
    else
        echo -e "${RED}✗${NC} Failed to start Docker services"
        return 1
    fi
}

# Start Homebrew services
start_homebrew_services() {
    echo ""
    echo "📦 Starting Homebrew services..."
    brew services start postgresql@16 2>/dev/null || brew services start postgresql
    brew services start redis
    echo -e "${GREEN}✓${NC} Homebrew services started"
    sleep 3
}

# Create database if it doesn't exist
create_database() {
    echo ""
    echo "🗄️  Creating database..."
    if psql -lqt | cut -d \| -f 1 | grep -qw rentro_dev; then
        echo -e "${YELLOW}⚠${NC} Database 'rentro_dev' already exists"
    else
        createdb rentro_dev 2>/dev/null || echo -e "${YELLOW}⚠${NC} Could not create database (may already exist)"
    fi
}

# Run migrations
run_migrations() {
    echo ""
    echo "🔄 Running database migrations..."
    cd apps/backend
    
    # Create migrations directory if it doesn't exist
    mkdir -p src/database/migrations
    
    # Generate migration
    echo "Generating migration from entities..."
    npm run typeorm migration:generate -- -n InitialSchema 2>/dev/null || echo "Migration already exists or entities unchanged"
    
    # Run migrations
    echo "Running migrations..."
    npm run typeorm migration:run
    
    echo -e "${GREEN}✓${NC} Migrations completed"
    cd ../..
}

# Main execution
main() {
    echo "Step 1: Checking for database services..."
    
    if check_docker; then
        start_docker_services
    elif check_postgres; then
        start_homebrew_services
    else
        echo ""
        echo -e "${RED}✗${NC} Neither Docker nor PostgreSQL found!"
        echo ""
        echo "Please install one of the following:"
        echo "  1. Docker Desktop: https://www.docker.com/products/docker-desktop"
        echo "  2. Or run: brew install postgresql@16 redis"
        echo ""
        exit 1
    fi
    
    echo ""
    echo "Step 2: Setting up database..."
    create_database
    
    echo ""
    echo "Step 3: Running migrations..."
    run_migrations
    
    echo ""
    echo -e "${GREEN}=================================="
    echo -e "✅ Setup Complete!"
    echo -e "==================================${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Terminal 1: cd apps/backend && npm run start:dev"
    echo "  2. Terminal 2: cd apps/frontend && npm run dev"
    echo "  3. Open http://localhost:3000"
    echo ""
    echo "Happy coding! 🎉"
}

# Run main function
main
