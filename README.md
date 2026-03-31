# Rentro - PG Accommodation Platform

A robust web application for connecting individuals seeking Paying Guest accommodations with property owners.

## Project Structure

```
rentro/
├── apps/
│   ├── frontend/        # Next.js frontend
│   └── backend/         # NestJS backend
├── docs/                # Documentation
├── docker/              # Docker configurations
├── k8s/                 # Kubernetes manifests
└── scripts/             # Utility scripts
```

## Technology Stack

### Frontend
- Next.js 14+ with TypeScript
- Tailwind CSS for styling
- Zustand for state management
- React Query for data fetching

### Backend
- NestJS framework
- PostgreSQL database
- Redis for caching
- TypeORM for ORM

### DevOps
- Docker & Docker Compose
- GitHub Actions for CI/CD
- PostgreSQL 14+
- Redis 7+

## Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+
- Redis 7+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rentro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp apps/frontend/.env.example apps/frontend/.env.local
   cp apps/backend/.env.example apps/backend/.env
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

### Development

Frontend runs on: `http://localhost:3000`
Backend runs on: `http://localhost:3001`

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Development Guide](./docs/DEVELOPMENT.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## Project Status

Phase 1: Project Setup & Infrastructure (In Progress)

## License

ISC
