# Rentro Frontend

A modern, responsive Next.js frontend for the Rentro PG Accommodation Platform.

## Features

- **User Authentication**: Separate flows for PG Seekers and Owners
- **Search & Discovery**: Advanced search and filtering capabilities
- **Listing Management**: Create and manage PG listings (owners)
- **Inquiry System**: Communication between seekers and owners
- **Real-time Notifications**: WebSocket-based notifications
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- React Query (Data Fetching)
- Socket.io (WebSocket)

## Getting Started

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

Frontend runs at `http://localhost:3000`

### Build
```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable React components
├── pages/           # Page routes
├── layouts/         # Layout components
├── hooks/           # Custom React hooks
├── store/           # Zustand state management
├── services/        # API service layer
├── utils/           # Utility functions
├── types/           # TypeScript types
└── styles/          # Global styles
```

## API Integration

The frontend communicates with the backend API at `http://localhost:3001/api`.

Configuration is done via environment variables:
- `NEXT_PUBLIC_API_URL`: Backend API URL

See `.env.example` for all available options.

## Testing

```bash
npm run test
npm run test:cov
```

## Deployment

Built frontend is production-ready and can be deployed to any static hosting provider or Node.js server.

```bash
npm run build
npm run start
```
