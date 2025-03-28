# Use official Node.js LTS image as base
FROM node:22-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies INCLUDING devDependencies (needed for tsc)
RUN npm install --include=dev

# Copy all source files
COPY . .

# Build TypeScript to JavaScript
RUN npm install typescript --save-dev && npm run build


# Use a smaller image for production
FROM node:22-alpine

WORKDIR /app

# Copy package files again
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built JavaScript files from builder
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE ${PORT:-88}

# Command to run the application
CMD ["node", "dist/server.js"]