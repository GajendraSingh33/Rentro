# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/frontend/package*.json ./apps/frontend/

RUN npm ci --workspace apps/frontend

COPY apps/frontend ./apps/frontend

RUN npm run build --prefix apps/frontend

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

RUN npm install -g next

COPY package*.json ./
COPY apps/frontend/package*.json ./apps/frontend/

RUN npm ci --omit=dev --workspace apps/frontend

COPY --from=builder /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public
COPY apps/frontend/next.config.js ./apps/frontend/

EXPOSE 3000

CMD ["next", "start", "--prefix", "apps/frontend"]
