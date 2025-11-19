FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

# Install dependencies
RUN npm install

# Copy backend source
COPY apps/backend ./apps/backend

# Build TypeScript
WORKDIR /app/apps/backend
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
