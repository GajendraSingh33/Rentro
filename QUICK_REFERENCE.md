# Quick Reference Guide - Development Commands

## Installation & Setup

```bash
# Initial setup
./setup.sh

# Or manually:
npm install
cp apps/frontend/.env.example apps/frontend/.env.local
cp apps/backend/.env.example apps/backend/.env
```

## Starting Development

```bash
# Start everything (frontend + backend)
npm run dev

# Start only frontend
npm run dev:frontend

# Start only backend
npm run dev:backend

# Using Docker Compose (includes PostgreSQL and Redis)
docker-compose up

# Docker Compose in detached mode
docker-compose up -d

# Stop Docker services
docker-compose down
```

## Code Quality

```bash
# Lint code
npm run lint

# Format code with Prettier
npm run format

# Type checking (TypeScript)
npm run type-check
```

## Building

```bash
# Build both frontend and backend
npm run build

# Production start
npm run start
```

## Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:cov

# E2E tests
npm run test:e2e
```

## Database (Backend)

```bash
# Switch to backend directory
cd apps/backend

# Run migrations
npm run migration:run

# Generate new migration
npm run migration:generate -- src/database/migrations/MigrationName

# Revert migration
npm run migration:revert

# Seed database
npm run seed
```

## Docker Management

```bash
# Build custom Docker images
docker-compose build

# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend

# Stop specific service
docker-compose stop postgres
docker-compose stop redis
docker-compose stop backend

# Start specific service
docker-compose start postgres
docker-compose start redis
docker-compose start backend
```

## Environment Variables

### Frontend (.env.local)
Key variables:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key

### Backend (.env)
Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - JWT secret for authentication
- `CORS_ORIGIN` - Frontend URL for CORS

## Project URLs

During development:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Backend Health**: http://localhost:3001/api/health
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## Database Credentials (Default)

From `docker-compose.yml`:
- **PostgreSQL**
  - Username: `rentro_user`
  - Password: `rentro_password`
  - Database: `rentro_dev`
  - Port: `5432`

- **Redis**
  - Port: `6379`
  - No authentication

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Find process using port 3001
lsof -i :3001

# Kill process
kill -9 <PID>
```

### Database Connection Error

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View database logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

### Redis Connection Error

```bash
# Check if Redis is running
docker-compose ps redis

# View Redis logs
docker-compose logs redis

# Restart Redis
docker-compose restart redis
```

### Node Modules Issues

```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Compilation Error

```bash
# Type check
npm run type-check

# Clear build cache
npm run prebuild
npm run build
```

## File Structure Quick Reference

- **Frontend Code**: `apps/frontend/src/`
- **Backend Code**: `apps/backend/src/`
- **Docker Config**: `docker/`, `docker-compose.yml`
- **Documentation**: `docs/`
- **CI/CD Config**: `.github/workflows/`
- **Root Config**: `.eslintrc.json`, `.prettierrc.json`

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: description"

# Push to remote
git push origin feature/feature-name

# Create pull request via GitHub
```

## Useful VS Code Plugins

- Prettier - Code formatter
- ESLint - Code linter
- Thunder Client - API testing
- REST Client - API testing
- Docker - Docker management
- Tailwind CSS - Tailwind IntelliSense

## Performance Tips

```bash
# Frontend optimization
npm run build  # Creates optimized production build

# Check bundle size
npm run analyze  # (if configured)

# Backend optimization
npm run build  # Creates optimized compiled output
```

## Production Deployment

```bash
# Build Docker images
docker-compose build

# Push to registry (if using cloud deployment)
docker image tag rentro-backend <registry>/rentro-backend:latest
docker push <registry>/rentro-backend:latest

# Deploy to cloud
# Follow deployment guide in docs/DEPLOYMENT.md
```

---

**Need help?** Check `docs/DEVELOPMENT.md` for detailed guides or `README.md` for overview.
