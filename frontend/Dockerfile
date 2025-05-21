# Use a specific Node.js version with alpine base
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY . .

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Environment variables
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Install serve globally to serve the static files
RUN npm install -g serve

# Expose the port (serve defaults to 3000)
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "dist"]