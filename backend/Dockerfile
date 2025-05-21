# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY . .

# Install dependencies
RUN npm install

# Copy only specific directories/files needed for build


# Add any other files/directories your build needs

# Build TypeScript to JavaScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 88

# Run the compiled app
CMD ["node", "dist/server.js"]