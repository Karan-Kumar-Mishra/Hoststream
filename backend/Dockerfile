# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy only specific directories/files needed for build
COPY src ./src
COPY tsconfig.json ./tsconfig.json

# Add any other files/directories your build needs

# Build TypeScript to JavaScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Run the compiled app
CMD ["node", "dist/server.js"]