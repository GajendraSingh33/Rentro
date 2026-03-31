---
description: |
  Workspace conventions for Rentro (PG Accommodation Platform).
  Use when: working on frontend (Next.js), backend (NestJS), database (TypeORM), or DevOps.
---

# Rentro Workspace Instructions

**Project**: Rentro - PG Accommodation Platform  
**Tech Stack**: Next.js 14 (frontend) | NestJS (backend) | PostgreSQL + Redis | TypeORM  
**Phase**: 2 (Core Auth & User Management - 85% complete)

## Quick Start

```bash
# Full setup & development
./setup.sh
npm run dev              # Starts frontend (3000) + backend (3001)

# Individual services
npm run dev:frontend
npm run dev:backend

# With containers (PostgreSQL 14 + Redis 7)
docker-compose up

# Code quality
npm run lint
npm run format
npm run type-check
```

## Project Structure & Navigation

**Root-level monorepo** with workspaces:
- `apps/frontend/` – Next.js 14, TypeScript, Tailwind, Zustand, React Query
- `apps/backend/` – NestJS, TypeORM, JWT auth, WebSockets
- `docs/` – Architecture, database schema, API specs, deployment guides
- `docker/` – Dockerfile configurations for containerization
- `plan/` – Implementation roadmaps and phase planning

Key docs to read first:
- [Architecture Overview](../docs/ARCHITECTURE.md) – System design, database schema, service layers
- [Development Guide](../docs/DEVELOPMENT.md) – Setup, troubleshooting, environment config
- [Contributing](../CONTRIBUTING.md) – Commit conventions, code standards, PR workflow

## Backend (NestJS) Patterns

### Module Organization
**One feature = one module**. Each module has:
- `*.module.ts` – Module definition with @Module decorator
- `*.service.ts` – Business logic, dependency injection
- `*.controller.ts` – HTTP endpoints, request routing
- `dtos/` – Data Transfer Objects (validation schemas)
- `guards/` – Auth guards (RolesGuard, JwtGuard)
- `strategies/` – Passport strategies (JwtStrategy)
- `decorators/` – Custom decorators (@Roles, @Auth)

**Example**: `src/auth/` module
- `auth.module.ts` – Imports Services, Controllers, Strategies
- `auth.service.ts` – register(), login(), refreshToken(), resetPassword()
- `auth.controller.ts` – POST /auth/register, /auth/login routes
- `dtos/auth.dto.ts` – RegisterDto, LoginDto with class-validator
- `strategies/jwt.strategy.ts` – Passport JWT validation
- `guards/roles.guard.ts` – @Roles('OWNER') enforcement

### Key Services
- **AuthService** – JWT tokens, password hashing (bcrypt, 10 rounds), role validation
- **UserService** – CRUD operations, profile updates
- **ListingService** – Property listings, search/filter
- **MessagingService** – In-app messaging, WebSocket events
- **PaymentService** – Transaction processing
- **EmailService** – Password reset, notifications (Nodemailer)

### Database & TypeORM
**Entity file**: `typeorm/entities/*.entity.ts`
- Use TypeORM decorators: `@Entity`, `@Column`, `@PrimaryGeneratedColumn`, `@OneToMany`, `@ManyToOne`
- Soft deletes via `DeleteDateColumn`
- Add indices on frequently queried fields (email, role, created_at)
- Virtual fields with `@VirtualColumn` or custom getters

**Migrations**: `typeorm migration:generate → migration:run`  
**Seeding**: `npm run seed` (database initialization)  
**Connection**: Configured in `ormconfig.ts` with environment variables (.env)

### DTOs & Validation
- Use `class-validator` decorators: `@IsEmail()`, `@MinLength()`, `@Matches()`
- Request DTOs for input validation
- Response DTOs (exclude sensitive fields like password_hash)
- Example: Password regex `@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])` for strength

### Authentication & Authorization
- **JWT Strategy** in `strategies/jwt.strategy.ts` – validates tokens, extracts user from payload
- **Roles Guard** in `guards/roles.guard.ts` – checks `@Roles('OWNER', 'ADMIN')` on handlers
- **Auth Decorator** in `decorators/` – attaches user to request
- Tokens stored in httpOnly cookies (best practice)
- Password reset flow: forgotPassword() → email link → resetPassword()

## Frontend (Next.js) Patterns

### App Router Structure
- Uses Next.js 14 **App Router** (`src/app/` directory)
- Layout-based structure: `layout.tsx` for shared UI, nested layouts for routes
- Pages: `page.tsx` files (product routes, not layouts)
- Hooks: `useProtectedRoute()` for authenticated pages (redirects if token missing)

**File structure**:
```
src/app/
├── layout.tsx              # Root layout, navigation
├── page.tsx                # Homepage
├── login/page.tsx          # Login page
├── register/page.tsx       # Registration
├── profile/page.tsx        # User profile (protected)
├── forgot-password/        # Password reset flow
└── reset-password/
src/hooks/
├── useProtectedRoute.ts    # Auth redirect hook
src/services/
├── api.ts                  # Axios instance, API calls
src/store/
├── authStore.ts            # Zustand auth store
```

### State Management (Zustand)
```typescript
// src/store/authStore.ts
interface AuthStore {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  login: (email, password) => Promise<void>;
  logout: () => void;
}
```
- **No Redux class complexity** – simple, direct state updates
- Slices per feature (auth, listings, messages)
- Persists via localStorage middleware when needed

### API Calls & Data Fetching
- **React Query**: `@tanstack/react-query` for server state (caching, refetching)
- **Axios**: Configured in `src/services/api.ts` with auth headers, error handling
- **Example**: `useQuery()` for GET, `useMutation()` for POST/PUT/DELETE
- Base URL from env: `NEXT_PUBLIC_API_URL` (e.g., `http://localhost:3001`)

### Styling & Components
- **Tailwind CSS** – utility-first, no custom CSS
- **React Icons** – SVG icons, no image files
- **clsx**: Conditional class names `clsx('text-red-500', isError && 'opacity-50')`
- Toast notifications: `react-hot-toast` (async feedback, no modals)

### Protected Routes
```typescript
// src/app/profile/page.tsx
'use client';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function ProfilePage() {
  useProtectedRoute();  // Redirects to login if no token
  return <div>User profile</div>;
}
```

## Database Schema & TypeORM

### Core Entities (in phase 2)
- **users** – SEEKER, OWNER, ADMIN roles; soft delete
- **pg_listings** – Property details, photos, amenities
- **inquiries** – Seeker → Owner messages
- **messages** – In-app messaging (future WebSocket integration)
- **bookings** – Reservations with status tracking
- **payments** – Transaction records, refunds
- **reviews** – Ratings, testimonials

### Performance Best Practices
- **Indices** on: email, role, created_at, listing_id (foreign keys)
- **Select columns explicitly** in queries (avoid SELECT *)
- **Pagination** for large result sets (limit 20 per page default)
- **Redis caching** for hot reads (user profiles, popular listings)
- Use TypeORM relations: `@ManyToOne`, `@OneToMany` with eager loading when needed

## Code Style & Quality Standards

### TypeScript Configuration
- Strict mode enabled: `strict: true` in `tsconfig.json`
- No `any` types (use generics or `unknown` if necessary)
- All functions typed with params and return types

### Formatting & Linting
- **Prettier**: `npm run format` (auto-format on save recommended)
- **ESLint**: `npm run lint` (checks code patterns, imports)
- **Config files**: `.eslintrc.json`, `.prettierrc.json` at root

### Commit Message Conventions
```
<type>(<scope>): <subject>

<body>

<footer>
```
**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`  
**Scope**: Feature area (e.g., `auth`, `listing`, `messaging`)  
**Subject**: 50 chars or less, imperative mood  
**Example**: `feat(auth): add email verification for registration`

### Code Standards
- **JSDoc comments** on all public functions/exports
- **Minimum test coverage**: 70% (unit tests required for new features)
- **Function size**: Keep under 30 lines (extract helpers if longer)
- **No hardcoded values**: Use environment variables or constants file

## Testing

### Backend (Jest + Supertest)
```bash
npm run test              # Run all tests
npm run test:watch       # Watch mode
npm run test:cov        # Coverage report
npm run test:e2e        # End-to-end tests
```
- Test directory: `test/` at app root
- Test files: `*.spec.ts` (unit), Jest config in `package.json`
- Mock modules with `jest.mock()`
- Use fixtures/factories for test data

### Frontend (Jest + React Testing Library)
```bash
npm test                 # Run tests
npm test -- --watch    # Watch mode
```
- Jest config in `jest.config.js`
- React Testing Library for component tests (prefer user interactions over DOM queries)
- Mock API calls with `jest.mock('../services/api')`

## Common Development Tasks

### Adding a New Backend Feature
1. **Create module** → `src/[feature]/[feature].module.ts`
2. **Create entity** → `src/typeorm/entities/[feature].entity.ts`
3. **Create DTO** → `src/[feature]/dtos/` (request/response)
4. **Create service** → `src/[feature]/[feature].service.ts` (business logic)
5. **Create controller** → `src/[feature]/[feature].controller.ts` (routes)
6. **Import module** in `app.module.ts`
7. **Write tests** → `test/[feature].spec.ts`
8. **Generate migration** → `npm run migration:generate -- -n Add[Feature]`
9. **Run migration** → `npm run migration:run`

### Adding a New Frontend Page
1. Create directory → `src/app/[feature]/`
2. Add layout or page → `layout.tsx` (shared UI) or `page.tsx` (route content)
3. Add custom hook if needed → `src/hooks/use[Feature].ts`
4. Use `useQuery`/`useMutation` from React Query
5. Add to Zustand store if state is shared → `src/store/[feature]Store.ts`
6. Style with Tailwind classes
7. Add tests → `__tests__/[feature].test.tsx`

### Database Migration Workflow
```bash
# Make schema changes in entity files
# Generate migration automatically
npm run migration:generate -- -n DescriptiveNameHere

# Review generated migration in src/database/migrations/
# Run to apply to local DB
npm run migration:run

# Revert if needed
npm run migration:revert
```

### Environment Variables
- **Frontend**: `apps/frontend/.env.local` (NEXT_PUBLIC_* for browser access)
  - `NEXT_PUBLIC_API_URL` – backend base URL
- **Backend**: `apps/backend/.env`
  - `DATABASE_URL` – PostgreSQL connection string
  - `JWT_SECRET` – Token signing key
  - `REDIS_URL` – Redis connection
  - `EMAIL_* ` – Nodemailer SMTP settings

## Architecture & Design Decisions

**Why NestJS + TypeORM?**
- Modular, enterprise-grade framework with built-in patterns
- Strong typing with Django-like ORM
- Automatic dependency injection, testing-friendly

**Why Next.js + Zustand?**
- Server-side rendering for SEO, static generation for performance
- Simple global state (vs Redux boilerplate)
- React Query handles server state, Zustand handles UI state

**Why monorepo (npm workspaces)?**
- Shared code between frontend/backend (types, validation schemas)
- Single dependency tree, version consistency
- Easy to run both services locally

**PostgreSQL 14 + Redis 7?**
- PostgreSQL: ACID compliance, JSON columns, full-text search
- Redis: Session caching, real-time messaging, rate limiting

See [ARCHITECTURE.md](../docs/ARCHITECTURE.md) for system design, database schema details, and service boundaries.

## Troubleshooting & Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000/3001 in use | Kill process: `lsof -ti:3000 \| xargs kill -9` |
| Database connection error | Ensure PostgreSQL running: `docker-compose up -d`, check DATABASE_URL |
| JWT token invalid | Verify JWT_SECRET matches frontend/backend, check token expiration |
| Hot reload not working | Restart dev server, check `npm run dev` process |
| TypeORM migration fails | Check entity syntax, run `npm run migration:generate` to auto-fix |
| Module not found error | Verify import paths, run `npm install --workspaces` |

## Phase 2 Status & Next Steps

**Completed (Phase 2)**: Auth system, user entity, login/register, DTOs, JWT strategy, password reset flow  
**In Progress**: Email service for notifications, profile updates  
**Next (Phase 3)**: Listing management, search/filter, image upload, messaging system

See [PHASE_2_SUMMARY.md](../PHASE_2_SUMMARY.md) for detailed implementation status.

## Additional Resources

- [Development Guide](../docs/DEVELOPMENT.md) – Detailed setup, ENV config, debugging
- [Database Schema](../docs/DATABASE.md) – Entity relationships, indices, constraints
- [Contributing Guide](../CONTRIBUTING.md) – Git workflow, code review, PR standards
- [Quick Reference](../QUICK_REFERENCE.md) – Common commands, quick lookups
