# Rentro Project Memory

## Project Overview
- **Project**: Rentro - PG Accommodation Platform
- **Workspace**: `/Users/gajendra/Desktop/SEM 6/projects (sem 6)/Rentro`
- **Status**: Phase 1 COMPLETE, Phase 2 COMPLETE, Ready for Phase 3

## Technology Stack (Confirmed)
- **Frontend**: Next.js 14+, React 18, TypeScript, Tailwind CSS, Zustand
- **Backend**: NestJS 10.2+, Node.js 18+, TypeScript
- **Database**: PostgreSQL 16 (primary), Redis 7 (caching)
- **DevOps**: Docker, Docker Compose, GitHub Actions
- **Authentication**: JWT with Passport.js, bcrypt hashing
- **Email**: Nodemailer for email service
- **File Upload**: Sharp for image optimization
- **File Storage**: Local file system (can integrate S3)

## Project Structure
```
rentro/
├── apps/
│   ├── frontend/  (Next.js) - PHASE 2: Auth pages complete
│   └── backend/   (NestJS) - PHASE 2: Auth endpoints complete
├── docs/
├── docker/
├── .github/workflows/
└── scripts/
```

## Phase 1 & 2 Key Files Created

### Backend
- User entity with 15+ fields
- Auth service (register, login, forgot/reset password, profile)
- JWT strategy with Passport
- Roles guard and decorator for RBAC
- Email service (Nodemailer)
- File upload service with image optimization
- API endpoints: 8 total

### Frontend
- Login page with email/password validation
- 2-step registration (role selection + form)
- Forgot password page
- Reset password page (token-based)
- Profile management page with avatar upload
- Zustand auth store
- API service with token interceptors
- Protected route hook

## Default Ports
- Frontend: 3000
- Backend API: 3001
- PostgreSQL: 5432
- Redis: 6379

## Database Credentials (Docker)
- PostgreSQL: rentro_user / rentro_password
- Database: rentro_dev
- Redis: No auth (port 6379)

## Environment Files
- Frontend: `apps/frontend/.env.example` → `.env.local`
- Backend: `apps/backend/.env.example` → `.env`

## Phase Completion
✅ Phase 1: Project Setup & Infrastructure (100%)
✅ Phase 2: Core Authentication & User Management (100%)
⏳ Phase 3: PG Owner Features (Next)

## Next Phase (Phase 3: PG Owner Features)
1. PG Listing Management (CRUD)
2. Media Upload (Images & Videos)
3. Location Mapping (Google Maps)
4. Availability Management
5. Owner Dashboard

## Documentation Files
- `README.md` - Project overview
- `CONTRIBUTING.md` - Git workflow
- `docs/ARCHITECTURE.md` - System architecture
- `docs/DEVELOPMENT.md` - Development guide
- `docs/DATABASE.md` - Database schema
- `PHASE_1_SUMMARY.md` - Phase 1 completion
- `PHASE_2_SUMMARY.md` - Phase 2 initial summary
- `PHASE_2_COMPLETION.md` - Phase 2 final completion
- `QUICK_REFERENCE.md` - Common commands
- `TODO.md` - Task tracking (all Phase 1-2 marked complete)

## Security Features Implemented
- bcrypt password hashing (10 rounds)
- JWT tokens (24h access, 7d refresh)
- Automatic token refresh on 401
- Role-Based Access Control
- Password strength validation
- File type/size validation
- Image optimization (removes metadata)
- Error handling without sensitive data
- Input validation (server & client)

## Email Configuration
For development: Uses Ethereal (fake SMTP)
For production: Set EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD, FRONTEND_URL

## Recent Additions (Phase 2 Completion)
- Email service for password reset
- Profile picture upload with optimization
- Forgot password flow
- Reset password flow
- Profile management page
- File upload service with image optimization

