# Use Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies for TypeScript)
RUN npm install

# Install TypeScript globally (or as a dev dependency)
# Either:
RUN npm install -g typescript
# Or (better, as it matches your project's package.json):
RUN npm install --save-dev typescript

# Copy source files and config
COPY src ./src
COPY tsconfig.json ./

# Build TypeScript to JavaScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["node", "dist/server.js"]  # or wherever your compiled JS is