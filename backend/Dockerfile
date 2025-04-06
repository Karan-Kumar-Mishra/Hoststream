# Builder stage
FROM node:22-bullseye as builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install --include=dev
COPY . .
RUN npm run build

# Production stage
FROM node:22-bullseye

# Create app directory and set proper permissions
RUN mkdir -p /app/dist/uploads && \
    chown -R node:node /app

WORKDIR /app

# Copy package files and install production deps
COPY --chown=node:node package*.json ./
RUN npm install --only=production

# Copy built files from builder
COPY --from=builder --chown=node:node /app/dist ./dist

# Ensure uploads directory exists and is writable
RUN mkdir -p /app/dist/uploads && \
    chown node:node /app/dist/uploads && \
    chmod 755 /app/dist/uploads

USER node

EXPOSE 88

CMD ["node", "dist/server.js"]