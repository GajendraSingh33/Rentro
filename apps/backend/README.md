# Rentro Backend API

A robust NestJS backend for the Rentro PG Accommodation Platform.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Listing Management**: CRUD operations for PG listings
- **Search & Filtering**: Advanced search capabilities with database and Elasticsearch
- **Inquiry System**: Manage inquiries between seekers and owners
- **Real-time Chat**: WebSocket-based messaging system
- **Payments**: Integration with payment gateways
- **Reviews & Ratings**: User review system
- **Admin Panel**: Administrative tools and moderation

## Tech Stack

- NestJS (Node.js framework)
- TypeScript
- PostgreSQL (Database)
- Redis (Caching & Sessions)
- TypeORM (ORM)
- Passport.js (Authentication)
- Socket.io (WebSockets)

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 7+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Run database migrations:
```bash
npm run migration:run
```

### Development

```bash
npm run dev
```

API runs at `http://localhost:3001`

### Building

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── main.ts              # Application entry point
├── app.module.ts        # Root module
├── config/              # Configuration
├── auth/                # Authentication module
├── users/               # User management
├── listings/            # PG listing management
├── inquiries/           # Inquiry management
├── messages/            # Messaging module
├── payments/            # Payment integration
├── reviews/             # Review system
├── admin/               # Admin features
├── common/              # Common utilities
├── database/            # Database config
└── typeorm/             # TypeORM entities
```

## Database

### Migrations

Generate migration:
```bash
npm run migration:generate -- src/database/migrations/MigrationName
```

Run migrations:
```bash
npm run migration:run
```

Revert migration:
```bash
npm run migration:revert
```

### Seeding

```bash
npm run seed
```

## API Documentation

API endpoints are documented in `docs/API.md`.

## Testing

```bash
npm run test
npm run test:cov
npm run test:e2e
```

## Environment Variables

See `.env.example` for all configuration options.

Key variables:
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `CORS_ORIGIN`: Frontend URL for CORS

## Deployment

### Docker

Build image:
```bash
docker build -t rentro-backend .
```

Run container:
```bash
docker run -p 3001:3001 rentro-backend
```

## Contributing

Follow the git workflow and commit message standards defined in CONTRIBUTING.md.

## Support

For issues and questions, create an issue in the repository.
