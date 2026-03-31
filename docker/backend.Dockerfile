# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

RUN npm ci --workspace apps/backend

COPY apps/backend ./apps/backend

RUN npm run build --prefix apps/backend

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

RUN npm ci --omit=dev --workspace apps/backend

COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

EXPOSE 3001

CMD ["node", "apps/backend/dist/main.js"]
