FROM node:18-alpine as builder

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY apps/frontend/package*.json ./apps/frontend/

# Install dependencies
RUN npm install

# Copy frontend source
COPY apps/frontend ./apps/frontend

# Build
WORKDIR /app/apps/frontend
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/apps/frontend/.next ./.next
COPY --from=builder /app/apps/frontend/public ./public
COPY --from=builder /app/apps/frontend/package*.json ./
COPY --from=builder /app/apps/frontend/next.config.js ./

RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]
