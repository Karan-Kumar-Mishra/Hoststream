
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY src/ ./src/
COPY tsconfig.json ./
COPY .env ./

RUN npm run build

EXPOSE 88

CMD ["node", "dist/server.js"]