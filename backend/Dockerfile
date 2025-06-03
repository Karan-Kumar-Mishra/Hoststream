# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package files first for better layer caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy only necessary files for build
COPY src/ ./src/
COPY tsconfig.json ./
COPY .env ./


RUN npm run build

# Expose the port your app runs on
EXPOSE 88  16354

# Run the compiled app
CMD ["node", "dist/server.js"]