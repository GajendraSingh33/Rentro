#!/bin/bash
# Rentro - Start Development Servers
# This script starts both backend and frontend in parallel

set -e

echo "🚀 Starting Rentro Development Servers"
echo "======================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if dependencies are installed
if [ ! -d "apps/backend/node_modules" ]; then
    echo -e "${RED}✗${NC} Backend dependencies not installed"
    echo "Run: cd apps/backend && npm install --legacy-peer-deps"
    exit 1
fi

if [ ! -d "apps/frontend/node_modules" ]; then
    echo -e "${RED}✗${NC} Frontend dependencies not installed"
    echo "Run: cd apps/frontend && npm install --legacy-peer-deps"
    exit 1
fi

echo -e "${GREEN}✓${NC} Dependencies verified"

# Check if database is accessible
echo ""
echo "Checking database connection..."
if command -v psql &> /dev/null; then
    if psql -U rentro_user -d rentro_dev -h localhost -c "SELECT 1" &> /dev/null; then
        echo -e "${GREEN}✓${NC} Database connected"
    else
        echo -e "${YELLOW}⚠${NC} Database not accessible. Run ./setup-database.sh first"
    fi
else
    echo -e "${YELLOW}⚠${NC} PostgreSQL client not found. Assuming Docker setup."
fi

echo ""
echo "Starting servers..."
echo ""
echo -e "${YELLOW}Note:${NC} Servers will run in background. Check logs below."
echo "Press Ctrl+C to stop all servers"
echo ""

# Create a trap to kill all background processes on exit
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $(jobs -p) 2>/dev/null
    echo "Servers stopped"
    exit 0
}
trap cleanup SIGINT SIGTERM

# Start backend
echo "🔧 Starting Backend (http://localhost:3001)..."
cd apps/backend
npm run start:dev > ../../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ../..

sleep 3

# Start frontend
echo "🎨 Starting Frontend (http://localhost:3000)..."
cd apps/frontend
npm run dev > ../../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ../..

echo ""
echo -e "${GREEN}=================================="
echo "✅ Servers Started!"
echo "==================================${NC}"
echo ""
echo "🔧 Backend:  http://localhost:3001"
echo "🎨 Frontend: http://localhost:3000"
echo ""
echo "📋 View logs:"
echo "  Backend:  tail -f logs/backend.log"
echo "  Frontend: tail -f logs/frontend.log"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for both processes
wait
