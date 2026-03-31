# Rentro Development Guide

## Project Setup

### 1. Initial Installation

```bash
# Install root dependencies
npm install

# Install workspace dependencies
npm install --ws
```

### 2. Environment Configuration

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
```

#### Backend (.env)
```bash
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/rentro_dev
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=24h
```

### 3. Database Setup

```bash
# Using Docker Compose
docker-compose up -d

# Run migrations
npm run migrate --prefix apps/backend
```

## Development Workflow

### Starting Development Servers

```bash
# Start both frontend and backend
npm run dev

# Or individual services
npm run dev:frontend
npm run dev:backend
```

### Code Quality

```bash
# Run linting
npm run lint

# Format code
npm run format

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```
apps/
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js app directory
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page routes (if using pages router)
│   │   ├── layouts/         # Layout components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── store/           # Zustand stores
│   │   ├── services/        # API service layer
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript types
│   │   └── styles/          # Global styles
│   ├── public/              # Static assets
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── main.ts          # Application entry point
    │   ├── app.module.ts    # Root module
    │   ├── config/          # Configuration
    │   ├── auth/            # Authentication module
    │   ├── users/           # User management module
    │   ├── listings/        # Listing management module
    │   ├── inquiries/       # Inquiry management module
    │   ├── messages/        # Messaging module
    │   ├── payments/        # Payment module
    │   ├── reviews/         # Review module
    │   ├── admin/           # Admin module
    │   ├── common/          # Common utilities
    │   ├── database/        # Database configuration
    │   └── typeorm/         # TypeORM entities
    ├── test/                # Test files
    └── package.json
```

## Database

### Migrations

```bash
# Generate migration
npm run typeorm migration:generate --prefix apps/backend -- src/database/migrations/MigrationName

# Run migrations
npm run migrate --prefix apps/backend

# Revert migration
npm run typeorm migration:revert --prefix apps/backend
```

### Seeding

```bash
# Run seed script
npm run seed --prefix apps/backend
```

## Testing

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## Debugging

### Backend
```bash
# With Node debugger
node --inspect-brk ./dist/main.js

# In VS Code, use the debugger configuration in .vscode/launch.json
```

### Frontend
```bash
# React DevTools browser extension
# Next.js DevTools in terminal
```

## Git Workflow

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and test
3. Commit: `git commit -m "feat: description"`
4. Push: `git push origin feature/feature-name`
5. Create Pull Request

## Common Issues & Solutions

### Database Connection Error
- Ensure PostgreSQL is running: `docker-compose up`
- Check DATABASE_URL in .env
- Verify database credentials

### Port Already in Use
- Backend (3001): `lsof -i :3001 | grep LISTEN | awk '{print $2}' | xargs kill -9`
- Frontend (3000): `lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9`

### Module Not Found
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Rebuild: `npm run build`

## Performance Tips

- Use React DevTools Profiler for frontend
- Use database query logging for backend
- Monitor Redis cache hit rates
- Regular code reviews for optimization

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
