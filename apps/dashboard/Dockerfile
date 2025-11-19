FROM node:18-alpine as builder

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY apps/dashboard/package*.json ./apps/dashboard/

# Install dependencies
RUN npm install

# Copy dashboard source
COPY apps/dashboard ./apps/dashboard

# Build
WORKDIR /app/apps/dashboard
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/apps/dashboard/dist /usr/share/nginx/html
COPY apps/dashboard/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
